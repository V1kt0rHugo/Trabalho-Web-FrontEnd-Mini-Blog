import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { LoginPage } from '../Components/LoginPage'
import { FeedPage } from '../Components/FeedPage'

export const App = () => {
    return(
        <BrowserRouter>
        <Routes>
           
            <Route index element={<LoginPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        
        </Routes>
        </BrowserRouter>
    )
}