import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { LoginPage } from '../Components/LoginPage'
import { FeedPage } from '../Components/FeedPage'
import {PostDetails}  from '../Components/PostDetails'
import { RegisterPage } from '../Components/Sing-In'
import { NewPostPage } from '../Components/NewPostPage'
import { GlobalStateProvider } from '../Global/GlobalStateProvider'

export const App = () => {
    return(
        <BrowserRouter>
            <GlobalStateProvider>
                <Routes>
                    
                    <Route index element={<LoginPage />} />
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/singin" element={<RegisterPage/>} />
                    <Route path="/post/:id" element={<PostDetails/>} />
                    <Route path="/newpostpage" element={<NewPostPage/>} />
                    <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
                
                </Routes>
            </GlobalStateProvider>
        </BrowserRouter>
    )
}