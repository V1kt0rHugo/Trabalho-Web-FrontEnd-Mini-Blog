const generateFakeToken = () => {
    // String mockada que simula um JWT
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJ1c2VybmFtZSI6InVzdWFyaW8tdGVzdGUifQ.S0meRAnd0mT0KenFals3T0k3nF0rReact";
};

// Dados de teste (deve ser o único email/senha válido)
export const usuario_teste = {
    email: "victorfodao667@gmoil.key",
    senha: "vitor3570",
};

export const login = (dados) => {
    return new Promise((resolve) => {
        // Simula o tempo de resposta da API (1 segundo de delay)
        setTimeout(() => {
            if (dados.email === usuario_teste.email && dados.senha === usuario_teste.senha) {
                const token = generateFakeToken();
                resolve({
                    sucesso: true,
                    mensagem: "Login realizado com sucesso.",
                    token: token,
                });
            } else {
                resolve({
                    sucesso: false,
                    mensagem: "Credenciais inválidas. Tente novamente!",
                    token: null,
                });
            }
        }, 1000); 
    });
};