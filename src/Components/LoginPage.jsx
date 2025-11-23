import { useForm } from "../Hooks/useForm"
import { login } from "../Utils/usuario" 
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [form, onChange] = useForm({ email: "", senha: "" })
    const [erro, setErro] = useState(null); 
    const [loading, setLoading] = useState(false);

    const goToFeedPage = () => {
        navigate("/feed")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErro(null); 
        setLoading(true);

        console.log("BODY de Login:", form)

        // 1. Simula a chamada de API e aguarda o resultado
        const resultado = await login(form);

        if (resultado.sucesso) {
            // 2. ARMAZENAMENTO DO TOKEN
            localStorage.setItem("token", resultado.token); // Salva o token
            console.log("Login OK! Token salvo. Redirecionando...");
            
            // 3. Redireciona
            goToFeedPage();
        } else {
            // 4. Define o erro e exibe na tela
            setErro(resultado.mensagem);
        }
        setLoading(false); // Finaliza o carregamento
    }

    // Estilização usando Tailwind CSS para um visual moderno
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border border-gray-100">
                <h1 className="text-3xl font-extrabold text-center text-gray-900">Labeddit Login</h1>

                {/* Feedback de erro */}
                {erro && (
                    <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        <span className="font-medium">Erro:</span> {erro}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder='Email/Usuário'
                        onChange={onChange}
                        value={form.email}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        disabled={loading}
                    />
                    <input
                        name="senha"
                        type="password"
                        placeholder='Senha'
                        onChange={onChange}
                        value={form.senha}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        disabled={loading}
                    />

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out 
                            ${loading 
                                ? 'bg-blue-300 cursor-not-allowed flex items-center justify-center' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'}`}
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
                    </button>
                </form>
                
                <p className="text-center text-xs text-gray-500 mt-4">
                    <strong className="font-bold">Credenciais de Teste:</strong><br/>
                    Email: victorfodao667@gmoil.key | Senha: vitor3570
                </p>
            </div>
        </div>
    )
}