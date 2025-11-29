import React, { useState, useEffect, useCallback } from 'react';
import GlobalStateContext from './GlobalStateContext';
import { useRequestData } from '../Hooks/useRequestData'; 

export const GlobalStateProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [postDetails, setPostDetails] = useState(null);
    const [comments, setComments] = useState([]);
    const [userPostVotes, setUserPostVotes] = useState({}); 
    const [userCommentVotes, setUserCommentVotes] = useState({}); 

    const { 
        getPostsData, createPostData, getPostDetailsData,
        votePostData, voteCommentData,
        isLoading: isRequestLoading,
        error: requestError,
        isPosting: isRequestPosting
    } = useRequestData(); 

    const [isLoadingFeed, setIsLoadingFeed] = useState(true);
    const [errorFeed, setErrorFeed] = useState(null);

    const fetchFeed = useCallback(async () => {
        setIsLoadingFeed(true);
        setErrorFeed(null);
        try {
            const response = await getPostsData();
            if (response.sucesso) {
                setPosts(response.data);
            }
        } catch (err) {
            console.error("Erro ao carregar o feed:", err);
            setErrorFeed("Não foi possível carregar o feed. Tente novamente.");
            setPosts([]);
        } finally {
            setIsLoadingFeed(false);
        }
    }, [getPostsData]);

    useEffect(() => {
        fetchFeed();
    }, [fetchFeed]);

    const fetchPostDetails = useCallback(async (postId) => {
        if (!postId) return;
        setPostDetails(null);
        setComments([]);

        try {
            const response = await getPostDetailsData(postId);
            if (response.sucesso) {
                setPostDetails(response.post);
                setComments(response.comments);
            }
        } catch (err) {
            console.error("Erro ao carregar detalhes:", err);
        }
    }, [getPostDetailsData]);

    const sendPost = async (titulo, conteudo) => {
        const novoPost = {
            id: Date.now(),
            userId: 999,
            autor: "Por Você (Postado Agora)",
            titulo: titulo,
            conteudo: conteudo,
            likes: 0,
            deslikes: 0
        };

        const sucesso = await createPostData(novoPost);
        
        if (sucesso) {
            setPosts((prevPosts) => [novoPost, ...prevPosts]);
            console.log(`Sucesso: Post "${novoPost.titulo}" criado.`); 
            return true;
        } else {
            console.log("Erro ao publicar o post.");
            return false;
        }
    };

    const handlePostVote = useCallback(async (postId, voteValue) => {
        const currentVote = userPostVotes[postId] || 0;
        let newVote = voteValue;

        if (currentVote === voteValue) {
            newVote = 0;
        }
        
        const sucesso = await votePostData(postId, newVote); 

        if (sucesso) {
            setUserPostVotes(prev => ({
                ...prev,
                [postId]: newVote,
            }));

            setPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === postId) {
                        let newLikes = post.likes;
                        let newDeslikes = post.deslikes;

                        if (currentVote === 1) newLikes -= 1;
                        if (currentVote === -1) newDeslikes -= 1;
                        if (newVote === 1) newLikes += 1;
                        if (newVote === -1) newDeslikes += 1;
                        
                        return { 
                            ...post, 
                            likes: newLikes,
                            deslikes: newDeslikes,
                        };
                    }
                    return post;
                })
            );
            
            if (postDetails && postDetails.id === postId) {
                setPostDetails((prevDetails) => {
                    if (!prevDetails) return null;

                    let newLikes = prevDetails.likes;
                    let newDeslikes = prevDetails.deslikes;

                    if (currentVote === 1) newLikes -= 1;
                    if (currentVote === -1) newDeslikes -= 1;

                    if (newVote === 1) newLikes += 1;
                    if (newVote === -1) newDeslikes += 1;

                    return {
                        ...prevDetails,
                        likes: newLikes,
                        deslikes: newDeslikes,
                    };
                });
            }
        }
    }, [votePostData, userPostVotes, postDetails]);

    const handleCommentVote = useCallback(async (commentId, voteValue) => {
        const currentVote = userCommentVotes[commentId] || 0;
        let newVote = voteValue;

        if (currentVote === voteValue) {
            newVote = 0;
        }

        const sucesso = await voteCommentData(commentId, newVote);

        if (sucesso) {
            setUserCommentVotes(prev => ({
                ...prev,
                [commentId]: newVote,
            }));

            setComments((prevComments) =>
                prevComments.map((comment) => {
                    if (comment.id === commentId) {
                        let newLikes = comment.likes;
                        let newDeslikes = comment.deslikes;

                        if (currentVote === 1) newLikes -= 1;
                        if (currentVote === -1) newDeslikes -= 1;
                        if (newVote === 1) newLikes += 1;
                        if (newVote === -1) newDeslikes += 1;

                        return { 
                            ...comment, 
                            likes: newLikes,
                            deslikes: newDeslikes,
                        };
                    }
                    return comment;
                })
            );
        }
    }, [voteCommentData, userCommentVotes]);

    const state = {
        posts,
        isLoadingFeed,
        errorFeed,
        postDetails,
        comments,
        sendPost,
        fetchPostDetails,
        handlePostVote,
        handleCommentVote,
        userPostVotes,
        userCommentVotes,
        isLoadingDetails: isRequestLoading, 
        errorDetails: requestError,
        isPosting: isRequestPosting
    };

    return (
        <GlobalStateContext.Provider value={state}>
            {props.children}
        </GlobalStateContext.Provider>
    );
};