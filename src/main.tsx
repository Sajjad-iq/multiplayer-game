import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GlobalContextProvider from './context/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
)
