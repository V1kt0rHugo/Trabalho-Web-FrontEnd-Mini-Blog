import { useForm } from "../Hooks/useForm"
import { cadastro } from "../Mocks/APIMockada"
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import { 
    Container, Card, Title, Form, Input, Button, 
    ErrorMessage 
} from '../Styles/StyledComponents';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, onChange] = useForm({email: "", senha: "" })
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(false);

    const goToFeedPage = () => {
        navigate("/feed")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErro(null);
        setLoading(true);

        console.log("BODY de Cadastro:", form)

        const resultado = await cadastro(form);

        if (resultado.sucesso) {
            localStorage.setItem("token", resultado.token);
            console.log("Cadastro OK! Token salvo. Redirecionando...");
            
            goToFeedPage();
        } else {
            setErro(resultado.mensagem);
        }
        setLoading(false);
    }

    return (
        <Container register>
            <Card>
                <Title register>Cadastre-se no Labeddit</Title>

                {erro && (
                    <ErrorMessage register role="alert">
                        <span>Erro:</span> {erro}
                    </ErrorMessage>
                )}
                
                <Form onSubmit={handleSubmit}>

                    <Input
                        name="email"
                        type="email"
                        placeholder='Email'
                        onChange={onChange}
                        value={form.email}
                        required
                        disabled={loading}
                        register
                    />
                    <Input
                        name="senha"
                        type="password"
                        placeholder='Senha'
                        onChange={onChange}
                        value={form.senha}
                        required
                        disabled={loading}
                        register
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        register
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cadastrando...
                            </>
                        ) : 'Cadastrar'}
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}