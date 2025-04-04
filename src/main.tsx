/**
 * Ponto de entrada da aplicação React
 * 
 * Inicializa a aplicação React renderizando o componente App
 * dentro do elemento raiz do DOM, configurando o React Strict Mode
 * para auxiliar na detecção de problemas potenciais durante o desenvolvimento.
 * 
 * @module Main
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Importação do novo sistema de estilos
import './styles/main.css'
// Importações adicionais de estilos específicos
import './styles/auth.css'
import './styles/responsive.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
