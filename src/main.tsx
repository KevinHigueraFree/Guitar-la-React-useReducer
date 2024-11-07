import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
// forma no correcta  no le quita el null pero lo lee como html
// const div2=document.getElementById('root') as HTMLElement
//forma correcta: el ! hace que le diga a react que el valor no va a ser nulo pero sigue siendo html
// const div=document.getElementById('root')!
