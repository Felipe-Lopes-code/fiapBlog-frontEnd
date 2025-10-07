const mockPosts = [
  {
    id: 1,
    title: "Introdução à Inteligência Artificial",
    author: "Profa. Maria Silva",
    content: "A Inteligência Artificial (IA) tem revolucionado diversos setores da sociedade. Este post explora os conceitos fundamentais da IA e suas aplicações práticas no mundo real.\n\nA IA pode ser definida como a capacidade de máquinas de simular comportamentos inteligentes, como aprendizado, reconhecimento de padrões e tomada de decisões. Com o avanço da tecnologia, suas aplicações têm se expandido rapidamente, desde assistentes virtuais até carros autônomos.\n\nPrincipais áreas da IA:\n1. Machine Learning\n2. Deep Learning\n3. Processamento de Linguagem Natural\n4. Visão Computacional\n\nO futuro da IA promete ainda mais inovações e descobertas emocionantes!",
    description: "Uma visão geral sobre os fundamentos da Inteligência Artificial e suas aplicações.",
    createdAt: "2025-10-01",
    comments: [
      {
        id: 1,
        author: "João Pedro",
        content: "Excelente artigo! Muito esclarecedor sobre os conceitos básicos de IA.",
        createdAt: "2025-10-02"
      }
    ]
  },
  {
    id: 2,
    title: "Desenvolvimento Web Moderno com React",
    author: "Prof. Carlos Santos",
    content: "O React tem se mantido como uma das principais bibliotecas para desenvolvimento web. Neste post, vamos explorar as melhores práticas e padrões modernos de desenvolvimento React.\n\nO React introduziu conceitos revolucionários como o Virtual DOM e componentes reutilizáveis, que mudaram a forma como desenvolvemos interfaces web. Hoje, com hooks e context API, o desenvolvimento se tornou ainda mais intuitivo e eficiente.\n\nTópicos principais:\n- Componentes Funcionais\n- Hooks (useState, useEffect, useContext)\n- Context API para gerenciamento de estado\n- Performance e otimização\n\nO ecossistema React continua evoluindo e trazendo novas funcionalidades interessantes.",
    description: "Aprenda sobre as últimas tendências e melhores práticas no desenvolvimento React.",
    createdAt: "2025-10-03",
    comments: []
  },
  {
    id: 3,
    title: "Segurança Cibernética: Protegendo Dados na Era Digital",
    author: "Prof. Ricardo Oliveira",
    content: "A segurança cibernética é uma preocupação crescente no mundo digital atual. Este post aborda as principais ameaças e métodos de proteção para sistemas e dados.\n\nCom o aumento dos ataques cibernéticos e vazamentos de dados, é essencial entender como proteger informações sensíveis e sistemas críticos. A segurança cibernética envolve uma combinação de tecnologias, processos e práticas.\n\nPrincipais aspectos da segurança cibernética:\n1. Criptografia de dados\n2. Autenticação de dois fatores\n3. Backup e recuperação de dados\n4. Monitoramento de ameaças\n\nA proteção adequada de dados é fundamental para empresas e indivíduos no mundo digital.",
    description: "Entenda os fundamentos da segurança cibernética e como proteger seus dados.",
    createdAt: "2025-10-05",
    comments: []
  }
];

export const mockApi = {
  getAllPosts: async (searchTerm = "") => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (searchTerm) {
      return mockPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return mockPosts;
  },

  deleteComment: async (postId, commentIndex) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const post = mockPosts.find(p => p.id === parseInt(postId));
    if (post && post.comments) {
      post.comments.splice(commentIndex, 1);
    }
    return post;
  },

  getPostById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const post = mockPosts.find(p => p.id === Number(id));
    if (!post) throw new Error("Post não encontrado");
    return post;
  },

  createPost: async (postData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newPost = {
      id: mockPosts.length + 1,
      ...postData,
      createdAt: new Date().toISOString().split("T")[0],
      comments: []
    };
    mockPosts.push(newPost);
    return newPost;
  },

  updatePost: async (id, postData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockPosts.findIndex(p => p.id === Number(id));
    if (index === -1) throw new Error("Post não encontrado");
    mockPosts[index] = { ...mockPosts[index], ...postData, id: Number(id) };
    return mockPosts[index];
  },

  deletePost: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockPosts.findIndex(p => p.id === Number(id));
    if (index === -1) throw new Error("Post não encontrado");
    mockPosts.splice(index, 1);
  },

  addComment: async (postId, comment) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const post = mockPosts.find(p => p.id === Number(postId));
    if (!post) throw new Error("Post não encontrado");
    const newComment = {
      id: (post.comments.length || 0) + 1,
      ...comment,
      createdAt: new Date().toISOString().split("T")[0]
    };
    post.comments.push(newComment);
    return newComment;
  }
};
