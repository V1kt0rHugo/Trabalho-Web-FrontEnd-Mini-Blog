import { useParams } from "react-router-dom";
import { useProtectedPage } from "../Hooks/useProtectedPage";
import { useRequestData } from "../Hooks/useRequestData"; 

export const PostDetails = () => {
    const isVerified = useProtectedPage(); 
    const { id } = useParams();
    const { 
        postDetails, 
        comments, 
        isLoadingDetails, 
        errorDetails
    } = useRequestData(id); 

    if (!isVerified) {
        return <p style={{ padding: '20px' }}>Verificando autenticação...</p>;
    }

    if (isLoadingDetails) {
        return <p style={{ padding: '20px' }}>Carregando detalhes do post (ID: {id})...</p>;
    }

    if (errorDetails) {
        return <p style={{ padding: '20px', color: 'red' }}>Erro: {errorDetails}</p>;
    }
    
    if (!postDetails) {
        return <p style={{ padding: '20px' }}>Nenhum post encontrado com o ID {id}.</p>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            
            <div style={{ border: '2px solid #007bff', padding: '20px', marginBottom: '30px' }}>
                <h2>Detalhes do Post (ID: {postDetails.id})</h2>
                
                <h1>{postDetails.titulo}</h1>
                <p>
                    **Autor:** {postDetails.autor} | **Likes:** {postDetails.likes} | **Dislikes:** {postDetails.deslikes}
                </p>
                <hr/>
                <p style={{ whiteSpace: 'pre-wrap' }}>{postDetails.conteudo}</p>
            </div>

            <h3>Comentários ({comments.length})</h3>
            {comments.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {comments.map((comment) => (
                        <li key={comment.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                            <strong>{comment.autor}:</strong> {comment.conteudo}
                            <div style={{ fontSize: '0.8em', marginTop: '5px' }}>
                                👍 {comment.likes} | 👎 {comment.deslikes}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Ainda não há comentários para este post.</p>
            )}
        </div>
    );
}