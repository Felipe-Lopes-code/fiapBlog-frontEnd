// Mock de usuários para desenvolvimento
const mockUsers = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria.silva@fiap.com.br",
    role: "PROFESSOR",
    password: "senha123" // Em produção, NUNCA armazene senhas em texto puro
  },
  {
    id: 2,
    name: "Carlos Santos",
    email: "carlos.santos@fiap.com.br",
    role: "PROFESSOR",
    password: "senha123"
  },
  {
    id: 3,
    name: "João Aluno",
    email: "joao.aluno@fiap.com.br",
    role: "STUDENT",
    password: "senha123"
  }
];

export const mockAuthApi = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da rede
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    // Gera um token mock (em produção, use JWT adequado)
    const token = btoa(JSON.stringify({ 
      userId: user.id, 
      email: user.email, 
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // expira em 24h
    }));

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  },

  validateToken: async (token) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
      const decoded = JSON.parse(atob(token));
      if (decoded.exp < Date.now()) {
        throw new Error("Token expirado");
      }
      const user = mockUsers.find(u => u.id === decoded.userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error("Token inválido");
    }
  },

  // Função auxiliar para verificar se um usuário pode editar posts
  canEditPosts: (user) => {
    return user && user.role === "PROFESSOR";
  }
};