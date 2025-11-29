import styled, { keyframes, css } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const StatusText = styled.p`
    text-align: center;
    padding: 20px;
    font-size: 1.1rem;
    font-weight: 500;
    color: ${props => props.error ? '#dc3545' : '#007bff'};
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    color: #007bff;
    margin-top: 25px;
    padding: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: color 0.3s;

    &:hover {
        color: #0056b3;
    }
`;

const BaseInput = css`
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
`;

export const Input = styled.input`
    ${BaseInput}
    ${props => props.register && css`
        &:focus {
            border-color: #28a745;
            box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.25);
        }
    `}
`;

export const TextArea = styled.textarea`
    ${BaseInput}
    resize: vertical;
`;

const BaseButton = css`
    width: 100%;
    padding: 14px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, box-shadow 0.3s;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: none;
    color: white;

    &:disabled {
        opacity: 0.6;
    }

    svg {
        animation: ${spin} 1s linear infinite;
    }
`;

export const Button = styled.button`
    ${BaseButton}
    background-color: ${props => props.disabled ? '#a0c4ff' : '#007bff'};

    &:hover:not(:disabled) {
        background-color: #0056b3;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    ${props => props.register && css`
        background-color: ${props.disabled ? '#90ee90' : '#28a745'};
        &:hover:not(:disabled) {
            background-color: #1e7e34;
        }
    `}
`;

export const ErrorMessage = styled.div`
    padding: 10px 15px;
    margin-bottom: 20px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 8px;
    font-size: 0.9rem;
`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: ${props => props.login ? '#f0f2f5' : '#e9f5e9'};
`;

export const Card = styled.div`
    background: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

export const Title = styled.h1`
    font-size: 2.2rem;
    font-weight: bold;
    text-align: center;
    color: ${props => props.register ? '#28a745' : '#007bff'};
    margin-bottom: 30px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const SecondaryButton = styled.button`
    background: none;
    border: none;
    color: #007bff;
    margin-top: 20px;
    text-align: center;
    width: 100%;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        text-decoration: underline;
    }
`;

export const Credentials = styled.p`
    margin-top: 30px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
    font-size: 0.9rem;
    line-height: 1.5;
`;

export const FeedContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 40px auto;
`;

export const Header = styled.h1`
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
`;

export const CreateButton = styled.button`
    ${BaseButton}
    background-color: #28a745;
    font-size: 1.1rem;
    margin-bottom: 40px;
    
    &:hover:not(:disabled) {
        background-color: #1e7e34;
    }
`;

export const PostList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const PostItem = styled.li`
    background-color: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    margin: 20px 0;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const PostTitle = styled.h3`
    color: #007bff;
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 8px;
    cursor: pointer;
`;

export const PostInfo = styled.p`
    font-size: 0.9rem;
    color: #333;
    margin: 0 0 5px 0;
`;

export const PostContent = styled.p`
    color: #495057;
    line-height: 1.5;
    margin-bottom: 15px;
    cursor: pointer;
`;

export const VoteContainer = styled.div`
    display: flex;
    gap: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;

    ${props => props.detail && css`
        justify-content: flex-end;
        padding-top: 20px;
    `}
    ${props => props.comment && css`
        padding-top: 5px;
        border-top: none;
        justify-content: flex-start;
        gap: 5px;
    `}
`;

export const VoteButton = styled.button`
    background: none;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #6c757d;

    &:hover {
        background-color: ${props => props.like ? '#e6f3ff' : '#ffe6e6'};
        color: ${props => props.like ? '#007bff' : '#dc3545'};
    }
    
    /* NOVO ESTILO: Estado de Votado */
    ${props => props.isVoted && css`
        background-color: ${props.like ? '#007bff' : '#dc3545'} !important;
        color: white !important;
        border-color: ${props.like ? '#007bff' : '#dc3545'};
    `}
`;

export const DetailsContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 40px auto;
`;

export const PostCardDetail = styled.div`
    border: 2px solid #007bff;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.1);
`;

export const PostMeta = styled.p`
    font-size: 0.95rem;
    color: #6c757d;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
`;

export const PostContentDetail = styled.p`
    white-space: pre-wrap;
    line-height: 1.7;
    color: #333;
`;

export const CommentsHeader = styled.h3`
    color: #333;
    margin-top: 30px;
    margin-bottom: 20px;
    border-left: 5px solid #ffc107;
    padding-left: 10px;
`;

export const CommentList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const CommentItem = styled.li`
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    background-color: #f8f9fa;
`;

export const CommentAuthor = styled.strong`
    color: #333;
    margin-right: 5px;
`;

export const CommentContent = styled.p`
    margin: 5px 0;
    line-height: 1.4;
`;

export const CommentVotes = styled.div`
    font-size: 0.8em;
    margin-top: 10px;
    color: #6c757d;
`;

export const CreatePostContainer = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PostForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 0 20px;
    box-sizing: border-box;
`;