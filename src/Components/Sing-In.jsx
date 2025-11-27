import { useForm } from "../Hooks/useForm"
import { cadastro } from "../Mocks/APIMockada" 
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';

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

        // 1. Chama a função de cadastro em vez de login
        const resultado = await cadastro(form);

        if (resultado.sucesso) {
            // 2. ARMAZENAMENTO DO TOKEN
            localStorage.setItem("token", resultado.token); // Salva o token
            console.log("Cadastro OK! Token salvo. Redirecionando...");
            
            goToFeedPage();
        } else {
            // 4. Define o erro (apesar da simulação estar sempre em sucesso)
            setErro(resultado.mensagem);
        }
        setLoading(false);
    }

    return (
        <div>
            <div>
                <h1>Cadastre-se no Labeddit</h1>

                {erro && (
                    <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        <span className="font-medium">Erro:</span> {erro}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="email"
                        type="email"
                        placeholder='Email'
                        onChange={onChange}
                        value={form.email}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                        disabled={loading}
                    />
                    <input
                        name="senha"
                        type="password"
                        placeholder='Senha'
                        onChange={onChange}
                        value={form.senha}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                        disabled={loading}
                    />

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out 
                            ${loading 
                                ? 'bg-green-300 cursor-not-allowed flex items-center justify-center' 
                                : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'}`}
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
                    </button>
                </form>
            </div>
        </div>
    )
}