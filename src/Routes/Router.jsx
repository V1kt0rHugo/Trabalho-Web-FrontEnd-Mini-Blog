import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { LoginPage } from '../Components/LoginPage'
import { FeedPage } from '../Components/FeedPage'
import { RegisterPage } from '../Components/Sing-In'

export const App = () => {
    return(
        <BrowserRouter>
        <Routes>
           
            <Route index element={<LoginPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/singin" element={<RegisterPage/>} />
            <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        
        </Routes>
        </BrowserRouter>
    )
}