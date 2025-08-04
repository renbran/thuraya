import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './i18n/i18n.ts'
import './index.css'
import './styles/rtl.css'

createRoot(document.getElementById("root")!).render(<App />);
