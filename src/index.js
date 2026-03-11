const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const app = new Koa();

function rewriteImports(content) {
  return content.replace(/from ['"]([^'"]+)['"]/g, (match, p1) => {
    if (!p1.startsWith(".") && !p1.startsWith("/") && !p1.startsWith("http")) {
      return `from '/@modules/${p1}'`;
    }
    return match;
  });
}

app.use(async (ctx) => {
  const { url } = ctx;

  if (url === "/") {
    ctx.type = "text/html";
    let content = fs.readFileSync(
      path.join(process.cwd(), "example/index.html"),
      "utf-8",
    );
    const injectProcess = `<script>window.process = { env: { NODE_ENV: 'development' } }</script>`;
    ctx.body = content.replace("<head>", `<head>${injectProcess}`);
  } else if (url.endsWith(".js") || url.endsWith(".jsx")) {
    const p = path.join(process.cwd(), "example", url);
    const content = fs.readFileSync(p, "utf-8");
    const { code } = babel.transformSync(content, {
      plugins: ["@babel/plugin-transform-react-jsx"],
    });
    ctx.type = "application/javascript";
    ctx.body = rewriteImports(code);
  } else if (url.startsWith("/@modules/")) {
    const moduleName = url.replace("/@modules/", "");
    const modulePath = path.join(process.cwd(), "node_modules", moduleName);
    const pkg = require(path.join(modulePath, "package.json"));
    const entry = pkg.module || pkg.main;
    const finalPath = path.join(modulePath, entry);
    let content = fs.readFileSync(finalPath, "utf-8");
    content = content.replace(/process\.env\.NODE_ENV/g, '"development"');
    ctx.type = "application/javascript";
    ctx.body = rewriteImports(content);
  }
});

app.listen(8000, () => {
  console.log(`Mini-Vite running at http://localhost:8000`);
});
