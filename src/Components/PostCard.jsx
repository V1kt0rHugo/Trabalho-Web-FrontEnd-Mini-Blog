import React, { useContext } from 'react';
import GlobalStateContext from '../Global/GlobalStateContext';
import { 
    PostItem, PostTitle, PostInfo, PostContent, VoteContainer, VoteButton
} from '../Styles/StyledComponents';

export const PostCard = ({ post, goToDetails }) => {
    const { handlePostVote, userPostVotes } = useContext(GlobalStateContext);
    const userVote = userPostVotes[post.id] || 0;

    const handleCardClick = () => {
        goToDetails(post.id);
    };

    const onVote = (e, voteValue) => {
        e.stopPropagation();
        handlePostVote(post.id, voteValue);
    };

    return (
        <PostItem>
            <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <PostTitle>{post.titulo}</PostTitle>
                <PostInfo>
                    Autor: <strong>{post.autor}</strong>
                </PostInfo>
                <PostContent>
                    {post.conteudo.substring(0, 100)}...
                </PostContent>
            </div>
            
            <VoteContainer>
                <VoteButton onClick={(e) => onVote(e, 1)} like isVoted={userVote === 1}>
                    👍 {post.likes}
                </VoteButton>
                <VoteButton onClick={(e) => onVote(e, -1)} deslike isVoted={userVote === -1}>
                    👎 {post.deslikes}
                </VoteButton>
            </VoteContainer>
        </PostItem>
    );
};