import { useRequestData } from '../Hooks/useRequestData';
import { useProtectedPage } from "../Hooks/useProtectedPage";
import { useForm } from '../Hooks/useForm';
import { useNavigate } from "react-router-dom" 

export const FeedPage = () =>{ 
    const isVerified = useProtectedPage();
    const navigate = useNavigate();
    const {
        posts, 
        isLoadingFeed, 
        errorFeed, 
        sendPost, 
        isPosting
    } = useRequestData(); 

    const [form, onChange, clearForm] = useForm({titulo: "" , conteudo: ""})

    const goToPostDetails = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(!form.titulo || !form.conteudo){
            alert("Preencha o Título e o Conteúdo")
            return;
        }
        const sucesso = await sendPost(form.titulo, form.conteudo);
        if(sucesso){
            clearForm(); 
        }
    }

    if (!isVerified) {
        return <p style={{ padding: '20px' }}>Verificando autenticação...</p>;
    }


return(
    <div style={{ padding: '20px' }}>
            <h1>Bem-vindo à Página de Feed!</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px' }}>
                <h2>Criar Novo Post</h2>
                <input
                    name="titulo"
                    type="text"
                    placeholder="Título"
                    value={form.titulo} 
                    onChange={onChange} 
                    required
                    disabled={isPosting} 
                    style={{ width: '98%', padding: '8px', marginBottom: '10px' }}
                />
                <textarea
                    name="conteudo"
                    placeholder="Conteúdo"
                    value={form.conteudo} 
                    onChange={onChange} 
                    rows="4"
                    required
                    disabled={isPosting}
                    style={{ width: '98%', padding: '8px', marginBottom: '10px' }}
                />
                <button type="submit" disabled={isLoadingFeed || isPosting} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {isPosting ? 'Publicando...' : 'Publicar'}
                </button>
            </form>
            
{isLoadingFeed && <p>Carregando posts...</p>}
            {!isLoadingFeed && errorFeed && <p>Ocorreu um erro: {errorFeed}</p>}
            
            {!isLoadingFeed && posts && posts.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {posts.map((post) => (
                        <li 
                            key={post.id} 
                            onClick={() => goToPostDetails(post.id)} 
                            style={{ border: '1px solid #eee', margin: '10px 0', padding: '15px', cursor: 'pointer' }}
                        >
                            <h3>{post.titulo}</h3>
                            <strong>Autor: {post.autor}</strong>
                            <p>{post.conteudo}</p>
                            <strong>Likes: {post.likes}</strong>
                            <strong>Deslikes: {post.deslikes}</strong>
                        </li>
                    ))}
                </ul>
            ) : (
                !isLoadingFeed && !errorFeed && <p>Nenhum post no feed. Crie um!</p>
            )}
        </div>
    );
}