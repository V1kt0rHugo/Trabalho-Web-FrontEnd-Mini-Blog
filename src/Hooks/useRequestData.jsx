import { useState, useEffect } from 'react';
import { getPosts } from '../Mocks/APIMockada'; 

export const useRequestData = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getPosts(); 

                setPosts(response.data);
                
            } catch (err) {
                console.error("Erro ao buscar posts:", err);
                setError("Não foi possível carregar o feed. Tente novamente.");
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []); 
    return { posts, isLoading, error };
};