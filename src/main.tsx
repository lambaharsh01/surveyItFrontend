import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/style.css'
import Routing from './routing.tsx'


import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')!).render(
    <Routing />
)
