import { useState, useEffect } from 'react';
import { getPosts, createPost, getPostDetails } from '../Mocks/APIMockada'; 

export const useRequestData = (postId = null) => { 
    const [posts, setPosts] = useState([]);
    const [isLoadingFeed, setIsLoadingFeed] = useState(true); 
    const [errorFeed, setErrorFeed] = useState(null); 
    const [isPosting, setIsPosting] = useState(false); 
    const [postDetails, setPostDetails] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [errorDetails, setErrorDetails] = useState(null);
    
    useEffect(() => {
        if (!postId) {
            const fetchPosts = async () => {
                setIsLoadingFeed(true);
                setErrorFeed(null);
                try {
                    const response = await getPosts(); 
                    setPosts(response.data);
                } catch (err) {
                    setErrorFeed("Não foi possível carregar o feed. Tente novamente.");
                    setPosts([]);
                } finally {
                    setIsLoadingFeed(false);
                }
            };
            fetchPosts();
        
        } else {
             const fetchDetails = async () => {
                setIsLoadingDetails(true);
                setErrorDetails(null);
                setPostDetails(null);
                setComments([]);

                try {
                    const response = await getPostDetails(postId);
                    setPostDetails(response.post);
                    setComments(response.comments);
                } catch (err) {
                    setErrorDetails(err.mensagem || "Não foi possível carregar os detalhes do post.");
                } finally {
                    setIsLoadingDetails(false);
                }
            };
            fetchDetails();
        }

        return () => {
             setPostDetails(null);
             setComments([]);
             setErrorDetails(null);
        };
        
    }, [postId]); 

    const sendPost = async (titulo, conteudo) => {
        setIsPosting(true);
        const novoPost = {
            id : Date.now(), 
            userId: 999,
            autor: "Por Você (Postado Agora)",
            titulo: titulo,
            conteudo : conteudo,
            likes : 0,
            deslikes : 0
        };

        try {
            await createPost(novoPost);
            setPosts((prevPosts) => [novoPost, ...prevPosts]); 
            alert(`Sucesso: Post "${novoPost.titulo}" criado.`);
            return true;
        } catch (err) {
            alert("Erro ao publicar o post.");
            return false;
        } finally {
            setIsPosting(false);
        }
    };
    
    return { 
        posts, isLoadingFeed, errorFeed, sendPost, isPosting,
        postDetails, comments, isLoadingDetails, errorDetails
    };
};