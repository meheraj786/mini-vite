import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

function App() {
  return (
    <div style={{ 
      textAlign: 'center', 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: 'white', 
      backgroundColor: '#2c2834', 
      margin: 0,
      padding: 0 
    }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>⚡ Mini-Vite + React ⚡</h1>
      <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>Finally working! It's Meheraj from Earth! 🌍</p>
      <div style={{ marginTop: '20px', padding: '15px', border: '1px dashed #666', borderRadius: '10px' }}>
        <span style={{ color: '#61dafb', fontWeight: 'bold' }}>Native ESM</span> + 
        <span style={{ color: '#f7df1e', fontWeight: 'bold' }}> Node.js</span> + 
        <span style={{ color: '#ffcf00', fontWeight: 'bold' }}> esbuild</span>
      </div>
    </div>
  );
}


const client = ReactDOMClient.default || ReactDOMClient;
const createRoot = client.createRoot;

const container = document.getElementById('root');

if (container && createRoot) {
  const root = createRoot(container);
  root.render(React.createElement(App));
} else {
  console.error("Failed to find root or createRoot function");
}