import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from '../Hooks/useForm';
import { useProtectedPage } from "../Hooks/useProtectedPage";
import GlobalStateContext from '../Global/GlobalStateContext';
import { 
    CreatePostContainer, Title, PostForm, Input, TextArea, Button, BackButton, StatusText 
} from '../Styles/StyledComponents';

export const NewPostPage = () => {
    const isVerified = useProtectedPage();
    const navigate = useNavigate();
    
    const { sendPost, isPosting } = useContext(GlobalStateContext);
    const [form, onChange, clearForm] = useForm({titulo: "" , conteudo: ""});

    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        if(!form.titulo || !form.conteudo){
            console.log("AVISO: Preencha o Título e o Conteúdo");
            return;
        }

        const sucesso = await sendPost(form.titulo, form.conteudo);
        
        if(sucesso){
            clearForm();
            navigate("/feed"); 
        }
    }

    if (!isVerified) {
        return <StatusText>Verificando autenticação...</StatusText>;
    }

    return (
        <CreatePostContainer>
            <Title>Criar Novo Post</Title>
            
            <PostForm onSubmit={handleSubmit}>
                <Input
                    name="titulo"
                    type="text"
                    placeholder="Título do post"
                    value={form.titulo}
                    onChange={onChange}
                    required
                    disabled={isPosting}
                />
                <TextArea
                    name="conteudo"
                    placeholder="Conteúdo do post"
                    value={form.conteudo}
                    onChange={onChange}
                    rows="8"
                    required
                    disabled={isPosting}
                />
                <Button type="submit" disabled={isPosting}>
                    {isPosting ? 'Publicando...' : 'Publicar Post'}
                </Button>
            </PostForm>
            
            <BackButton onClick={() => navigate("/feed")}>
                &larr; Voltar para o Feed
            </BackButton>
        </CreatePostContainer>
    );
};