
const generateFakeToken = () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJ1c2VybmFtZSI6InVzdWFyaW8tdGVzdGUifQ.S0meRAnd0mT0KenFals3T0k3nF0rReact";
};

export const usuario_teste = {
    nome: "Victor",
    email: "victorfodao667@gmoil.key",
    senha: "vitor3570",
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

const Comments = [
    { id: 10, postId: 100, autor: "Filipe Dantas", conteudo: "Ótima explicação sobre Hooks! Salvou meu projeto.", likes: 5, deslikes: 0 },
    { id: 11, postId: 100, autor: "Ana Clara", conteudo: "Sempre tive dúvidas sobre useMemo, valeu!", likes: 12, deslikes: 1 },
    { id: 20, postId: 200, autor: "Ricardo Mendes", conteudo: "Uso de useCallback é crucial para performance em listas grandes.", likes: 20, deslikes: 0 },
    { id: 30, postId: 300, autor: "Lucas Ferreira", conteudo: "Gostei do guia, mas faltou um exemplo de ThemeProvider.", likes: 2, deslikes: 3 },
];

export const login = (dados) => {
    return new Promise((resolve) => {
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
        setTimeout(() => {
            const token = generateFakeToken();
            resolve({
                sucesso: true,
                mensagem: `Usuário ${dados.email} cadastrado com sucesso!`,
                token: token,
            });
        }, 1000);
    });
};

export const getPosts = () =>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ data: Posts});
        }, 500);
    });
};

export const createPost = (novoPost) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ 
                sucesso: true, 
                mensagem: `Post ${novoPost.titulo} criado com sucesso!`
            });
        }, 800); 
    });
};

export const getPostDetails = (postId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idNumerico = Number(postId);
            const post = Posts.find(p => p.id === idNumerico);
            if (post) {
                const postComments = Comments.filter(c => c.postId === idNumerico);
                resolve({ 
                    sucesso: true, 
                    post: post, 
                    comments: postComments
                });
            } else {
                reject({ 
                    sucesso: false, 
                    mensagem: "Post não encontrado." 
                });
            }
        }, 700);
    });
};
