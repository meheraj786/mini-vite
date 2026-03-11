import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';

function App() {
  return (
    <div>
      <h1>Hello from Mini-Vite + React!</h1>
      <p>It's Meheraj from Earth! 🌍</p>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);