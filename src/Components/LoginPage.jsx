import { useForm } from "../Hooks/useForm"
import { login } from "../Mocks/APIMockada"
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import { 
    Container, Card, Title, Form, Input, Button, 
    ErrorMessage, SecondaryButton, Credentials 
} from '../Styles/StyledComponents';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [form, onChange] = useForm({nome: "", email: "", senha: "" })
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(false);

    const goToFeedPage = () => {
        navigate("/feed")
    }

    const goToRegisterPage = () => {
        navigate("/singin")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErro(null);
        setLoading(true);
        console.log("BODY de Login:", form)
        const resultado = await login(form);

        if (resultado.sucesso) {
            localStorage.setItem("token", resultado.token);
            console.log("Login OK! Token salvo. Redirecionando...");
            
            goToFeedPage();
        } else {
            setErro(resultado.mensagem);
        }
        setLoading(false);
    }

    return (
        <Container login>
            <Card>
                <Title>Labeddit Login</Title>

                {erro && (
                    <ErrorMessage role="alert">
                        <span>Erro:</span> {erro}
                    </ErrorMessage>
                )}
                
                <Form onSubmit={handleSubmit}>
                    <Input
                        name="email"
                        type="email"
                        placeholder='Email/Usuário'
                        onChange={onChange}
                        value={form.email}
                        disabled={loading}
                        required
                    />
                    <Input
                        name="senha"
                        type="password"
                        placeholder='Senha'
                        onChange={onChange}
                        value={form.senha}
                        disabled={loading}
                        required
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Entrando...
                            </>
                        ) : 'Entrar'}
                    </Button>
                </Form>

                <SecondaryButton
                    onClick={goToRegisterPage}
                    disabled={loading}
                >
                    Ainda não tem conta? <strong>Cadastre-se!</strong>
                </SecondaryButton>
                
                <Credentials>
                    <strong>Credenciais de Teste:</strong><br/>
                    Email: victorfodao667@gmoil.key | Senha: vitor3570
                </Credentials>
            </Card>
        </Container>
    )
}