import { useRequestData } from '../Hooks/useRequestData';
import { useProtectedPage } from "../Hooks/useProtectedPage";
import { useForm } from '../Hooks/useForm';
import { useEffect, useState } from 'react';

export const FeedPage = () =>{ 
    useProtectedPage();
    const  {posts: postsIniciais, isLoading, error} = useRequestData();
    const [form, onChange,clearForm] = useForm({titulo: "" , conteudo: ""})
    const [posts,setPosts] = useState([])
    useEffect(() => {
      if(postsIniciais && postsIniciais.length > 0){
        setPosts(postsIniciais);
      }
    
    }, [postsIniciais]);

    const handleSubmit = (event) =>{
        event.preventDefault();

        if(!form.titulo || !form.conteudo){
            alert("Preencha o Título e o Conteúdo")
            return;
        }
        const novoPost = {
            id : Date.now(),
            userId: 999,
            autor: "Por Você",
            titulo: form.titulo,
            conteudo : form.conteudo,
            likes : 0,
            deslikes : 0
        };
        
        setPosts([novoPost, ...posts]); 
        
        clearForm(); 
        alert(`Post "${novoPost.titulo}" publicado localmente.`);
    }

return(
    <div style={{ padding: '20px' }}>
            <h1>Bem-vindo à Página de Feed!</h1>

            {/* Formulário de Novo Post */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px' }}>
                <h2>Criar Novo Post</h2>
                <input
                    name="titulo"
                    type="text"
                    placeholder="Título"
                    value={form.titulo}
                    onChange={onChange}
                    required
                    style={{ width: '98%', padding: '8px', marginBottom: '10px' }}
                />
                <textarea // Usando textarea para o conteúdo, mais adequado
                    name="conteudo"
                    placeholder="Conteúdo"
                    value={form.conteudo}
                    onChange={onChange}
                    rows="4"
                    required
                    style={{ width: '98%', padding: '8px', marginBottom: '10px' }}
                />
                <button type="submit" disabled={isLoading} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Publicar
                </button>
            </form>

            {/* Exibição dos Posts */}
            {isLoading && <p>Carregando posts...</p>}
            {!isLoading && error && <p>Ocorreu um erro: {error}</p>}
            
            {!isLoading && posts.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {posts.map((post) => (
                        <li key={post.id} style={{ border: '1px solid #eee', margin: '10px 0', padding: '15px' }}>
                            <h3>{post.titulo}</h3>
                            <strong>Autor: {post.autor}</strong>
                            <p>{post.conteudo}</p>
                            <strong>Likes: {post.likes}</strong>
                            <strong>Deslikes: {post.deslikes}</strong>
                        </li>
                    ))}
                </ul>
            ) : (
                !isLoading && !error && <p>Nenhum post no feed. Crie um!</p>
            )}
        </div>
    );
}
