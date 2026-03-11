const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const { buildSync } = require("esbuild");

const app = new Koa();
const root = process.cwd();
const cacheDir = path.join(root, "node_modules", ".mini-vite-cache");

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
    let content = fs.readFileSync(path.join(root, "example/index.html"), "utf-8");
    const injectProcess = `
      <script>
        window.process = { env: { NODE_ENV: 'development' } }
      </script>
    `;
    ctx.body = content.replace("<head>", `<head>${injectProcess}`);
  } 
  
  else if (url.endsWith(".js") || url.endsWith(".jsx")) {
    const p = path.join(root, "example", url);
    const content = fs.readFileSync(p, "utf-8");
    const { code } = babel.transformSync(content, {
      plugins: ["@babel/plugin-transform-react-jsx"],
    });
    ctx.type = "application/javascript";
    ctx.body = rewriteImports(code);
  } 
  
  else if (url.startsWith("/@modules/")) {
    try {
      const moduleName = url.replace("/@modules/", "");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

      const safeModuleName = moduleName.replace(/\//g, "_");
      const outFile = path.join(cacheDir, `${safeModuleName}.js`);

      if (!fs.existsSync(outFile)) {
        console.log(`Optimizing: ${moduleName}`);
        buildSync({
          entryPoints: [require.resolve(moduleName, { paths: [root] })],
          bundle: true,
          format: "esm",
          outfile: outFile,
        });
      }

      const content = fs.readFileSync(outFile, "utf-8");
      ctx.type = "application/javascript";
      ctx.body = rewriteImports(content);
    } catch (err) {
      console.error(" Module Error:", err.message);
      ctx.status = 500;
      ctx.body = err.message;
    }
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(` Mini-Vite: http://localhost:${PORT}`);
});