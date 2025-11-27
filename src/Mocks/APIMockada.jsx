
const generateFakeToken = () => {
    // String mockada que simula um JWT
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJ1c2VybmFtZSI6InVzdWFyaW8tdGVzdGUifQ.S0meRAnd0mT0KenFals3T0k3nF0rReact";
};

// Dados de teste (deve ser o único email/senha válido para LOGIN)
export const usuario_teste = {
    nome: "Victor",
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

export const cadastro = (dados) => {
    return new Promise((resolve) => {
        // Simula o tempo de resposta da API (1 segundo de delay)
        setTimeout(() => {
            // Em um cenário real, fariamos validações aqui. 
            // Para simulação, consideramos o cadastro sempre bem-sucedido.
            const token = generateFakeToken();
            resolve({
                sucesso: true,
                mensagem: `Usuário ${dados.email} cadastrado com sucesso!`,
                token: token,
            });
        }, 1000);
    });
};

   const Posts = [
    {
        id: 100,
        userId: 1,
        autor: "Jorge Camargo",
        titulo: "CustomHooks no React",
        conteudo: "Veja como criar seus próprios Hooks personalizados no React para reutilizar lógica de estado entre diferentes componentes de forma eficiente e limpa.",
        likes: 100,
        deslikes: 20
    },

    {
        id: 200,
        userId: 2,
        autor: "Mariana Souza",
        titulo: "Otimização com Hooks",
        conteudo: "Otimizando a performance com useMemo e useCallback",
        likes: 250,
        deslikes: 5
    },

    {
        id: 300,
        userId: 3,
        autor: "Pedro Henrique",
        titulo: "Styled Components Guia",
        conteudo: "Guia completo sobre Styled Components",
        likes: 75,
        deslikes: 15
    }
];


export const getPosts = () =>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ data: Posts});
        }, 500);
    });
};
