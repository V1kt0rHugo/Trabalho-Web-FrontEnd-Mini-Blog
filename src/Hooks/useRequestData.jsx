import { useState, useCallback } from 'react';
import { getPosts, createPost, getPostDetails, votePost, voteComment } from '../Mocks/APIMockada';

export const useRequestData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isPosting, setIsPosting] = useState(false);

    const getPostsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getPosts();
            return { sucesso: true, data: response.data };
        } catch (err) {
            setError("Falha ao carregar posts.");
            return { sucesso: false, data: [] };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createPostData = useCallback(async (novoPost) => {
        setIsPosting(true);
        setError(null);
        try {
            const response = await createPost(novoPost);
            return response.sucesso;
        } catch (err) {
            setError("Falha ao criar post.");
            return false;
        } finally {
            setIsPosting(false);
        }
    }, []);

    const getPostDetailsData = useCallback(async (postId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getPostDetails(postId);
            return { sucesso: true, post: response.post, comments: response.comments };
        } catch (err) {
            setError(err.mensagem || "Post não encontrado.");
            return { sucesso: false, post: null, comments: [] };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const votePostData = useCallback(async (postId, like) => {
        try {
            const response = await votePost(postId, like);
            return response.sucesso;
        } catch (err) {
            console.error("Erro ao votar no post:", err);
            return false;
        }
    }, []);

    const voteCommentData = useCallback(async (commentId, like) => {
        try {
            const response = await voteComment(commentId, like);
            return response.sucesso;
        } catch (err) {
            console.error("Erro ao votar no comentário:", err);
            return false;
        }
    }, []);
    
    return {
        getPostsData, 
        createPostData,
        getPostDetailsData,
        votePostData,
        voteCommentData,
        isLoading, 
        error, 
        isPosting
    };
};