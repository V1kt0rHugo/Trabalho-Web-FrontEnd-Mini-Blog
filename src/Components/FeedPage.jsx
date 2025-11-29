import { useProtectedPage } from "../Hooks/useProtectedPage";
import { useNavigate } from "react-router-dom"
import React, { useContext } from 'react'; 
import GlobalStateContext from "../Global/GlobalStateContext";
import { PostCard } from './PostCard';
import { 
    FeedContainer, Header, CreateButton, PostList, StatusText 
} from '../Styles/StyledComponents';

export const FeedPage = () =>{
    const isVerified = useProtectedPage();
    const navigate = useNavigate();
    
    const {
        posts,
        isLoadingFeed,
        errorFeed,
    } = useContext(GlobalStateContext);

    const goToPostDetails = (postId) => {
        navigate(`/post/${postId}`);
    };
    
    const goToCreatePost = () => {
        navigate("/newpostpage");
    };

    if (!isVerified) {
        return <StatusText>Verificando autenticação...</StatusText>;
    }


return(
    <FeedContainer>
            <Header>Feed Principal do Labeddit</Header>
            
            <CreateButton onClick={goToCreatePost}>
                + Criar Novo Post
            </CreateButton>
            
            {isLoadingFeed && <StatusText>Carregando posts...</StatusText>}
            {!isLoadingFeed && errorFeed && <StatusText error>{`Ocorreu um erro: ${errorFeed}`}</StatusText>}
            
            {!isLoadingFeed && posts && posts.length > 0 ? (
                <PostList>
                    {posts.map((post) => (
                        <PostCard 
                            key={post.id} 
                            post={post} 
                            goToDetails={goToPostDetails} 
                        />
                    ))}
                </PostList>
            ) : (
                !isLoadingFeed && !errorFeed && <StatusText>Nenhum post no feed. Crie um!</StatusText>
            )}
        </FeedContainer>
    );
}