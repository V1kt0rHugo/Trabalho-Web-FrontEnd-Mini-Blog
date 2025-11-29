import { useParams } from "react-router-dom";
import { useProtectedPage } from "../Hooks/useProtectedPage";
import React, { useContext, useEffect } from "react"; 
import GlobalStateContext from "../Global/GlobalStateContext";
import { 
    DetailsContainer, PostCardDetail, PostTitle, PostMeta, PostContentDetail, 
    CommentsHeader, CommentList, CommentItem, CommentAuthor, CommentContent, 
    StatusText, VoteContainer, VoteButton
} from '../Styles/StyledComponents'; 

export const PostDetails = () => {
    const isVerified = useProtectedPage();
    const { id } = useParams();
    
    const {
        postDetails,
        comments,
        isLoadingDetails, 
        errorDetails,     
        fetchPostDetails,
        handlePostVote,
        handleCommentVote,
        userPostVotes,
        userCommentVotes
    } = useContext(GlobalStateContext);

    useEffect(() => {
        fetchPostDetails(id);
    }, [id, fetchPostDetails]); 

    const onPostVote = (voteValue) => {
        if(postDetails) {
            handlePostVote(postDetails.id, voteValue);
        }
    };

    if (!isVerified) {
        return <StatusText>Verificando autenticação...</StatusText>;
    }

    if (isLoadingDetails) {
        return <StatusText>Carregando detalhes do post (ID: {id})...</StatusText>;
    }

    if (errorDetails) {
        return <StatusText error>{`Erro: ${errorDetails}`}</StatusText>;
    }
    
    if (!postDetails) {
        return <StatusText>Nenhum post encontrado com o ID {id}.</StatusText>;
    }
    
    const postVote = userPostVotes[postDetails.id] || 0;

    return (
        <DetailsContainer>
            
            <PostCardDetail>
                <h2>Detalhes do Post (ID: {postDetails.id})</h2>
                
                <PostTitle>{postDetails.titulo}</PostTitle>
                <PostMeta>
                    Autor: <strong>{postDetails.autor}</strong>
                </PostMeta>
                <PostContentDetail>{postDetails.conteudo}</PostContentDetail>
                
                <VoteContainer detail>
                    <VoteButton onClick={() => onPostVote(1)} like isVoted={postVote === 1}>
                        👍 {postDetails.likes}
                    </VoteButton>
                    <VoteButton onClick={() => onPostVote(-1)} deslike isVoted={postVote === -1}>
                        👎 {postDetails.deslikes}
                    </VoteButton>
                </VoteContainer>
            </PostCardDetail>

            <CommentsHeader>Comentários ({comments.length})</CommentsHeader>
            {comments.length > 0 ? (
                <CommentList>
                    {comments.map((comment) => {
                        const commentVote = userCommentVotes[comment.id] || 0;
                        return (
                        <CommentItem key={comment.id}>
                            <CommentAuthor>{comment.autor}:</CommentAuthor>
                            <CommentContent>{comment.conteudo}</CommentContent>
                            <VoteContainer comment>
                                <VoteButton onClick={() => handleCommentVote(comment.id, 1)} like isVoted={commentVote === 1}>
                                    👍 {comment.likes}
                                </VoteButton>
                                <VoteButton onClick={() => handleCommentVote(comment.id, -1)} deslike isVoted={commentVote === -1}>
                                    👎 {comment.deslikes}
                                </VoteButton>
                            </VoteContainer>
                        </CommentItem>
                        )
                    })}
                </CommentList>
            ) : (
                <p>Ainda não há comentários para este post.</p>
            )}
        </DetailsContainer>
    );
}