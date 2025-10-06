const initialPosts = [
  { id: 1, title: 'Introdução ao React com Hooks', author: 'Prof. Silva', content: 'Neste post, vamos explorar os fundamentos do React e como os Hooks modernizaram o desenvolvimento de componentes. Abordaremos useState, useEffect e useContext com exemplos práticos.' },
  { id: 2, title: 'Gerenciamento de Estado Avançado', author: 'Prof. Santos', content: 'Uma análise profunda sobre gerenciamento de estado. Comparamos Redux, Context API e abordagens mais modernas, destacando os prós e contras de cada uma.' },
  { id: 3, title: 'Segurança no Front-end: Boas Práticas', author: 'Profa. Oliveira', content: 'A segurança é crucial. Este post detalha como manusear tokens (JWTs), proteger rotas e prevenir vulnerabilidades comuns como ataques XSS e CSRF.' }
];

let postsDB = [...initialPosts];
let nextPostId = 4;

export const mockApi = {
  // Simula GET /posts
  getPosts: async (searchTerm = '') => {
    console.log(`API: Buscando posts com termo: "${searchTerm}"`);
    return new Promise(resolve => setTimeout(() => {
      const filteredPosts = postsDB.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      resolve({ data: filteredPosts });
    }, 500));
  },
  // Simula GET /posts/:id
  getPost: async (id) => {
    console.log(`API: Buscando post com id: ${id}`);
    return new Promise(resolve => setTimeout(() => {
      const post = postsDB.find(p => p.id === parseInt(id));
      resolve({ data: post });
    }, 300));
  },
  // Simula POST /posts
  createPost: async (postData) => {
    console.log('API: Criando novo post', postData);
    return new Promise(resolve => setTimeout(() => {
      const newPost = { ...postData, id: nextPostId++ };
      postsDB.push(newPost);
      resolve({ data: newPost });
    }, 800));
  },
  // Simula PUT /posts/:id
  updatePost: async (id, postData) => {
    console.log(`API: Atualizando post ${id}`, postData);
    return new Promise(resolve => setTimeout(() => {
      postsDB = postsDB.map(p => p.id === parseInt(id) ? { ...p, ...postData } : p);
      const updatedPost = postsDB.find(p => p.id === parseInt(id));
      resolve({ data: updatedPost });
    }, 800));
  },
  // Simula DELETE /posts/:id
  deletePost: async (id) => {
    console.log(`API: Deletando post ${id}`);
    return new Promise(resolve => setTimeout(() => {
      postsDB = postsDB.filter(p => p.id !== parseInt(id));
      resolve({ data: { message: 'Post deletado com sucesso' } });
    }, 800));
  },
  // Simula POST /login
  login: async (credentials) => {
    console.log('API: Tentativa de login', credentials);
    return new Promise((resolve, reject) => setTimeout(() => {
      if (credentials.username === 'professor' && credentials.password === '1234') {
        resolve({
          data: {
            user: { name: 'Professor(a) Admin', role: 'teacher' },
            accessToken: 'fake-jwt-access-token-para-simulacao'
          }
        });
      } else {
        reject({ response: { data: { message: 'Credenciais inválidas.' } } });
      }
    }, 1000));
  }
};