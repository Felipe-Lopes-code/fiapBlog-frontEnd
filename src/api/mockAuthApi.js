import { hashPassword, verifyPassword } from '../utils/crypto';

// Mock de usuários para desenvolvimento com senhas já hasheadas
const mockUsers = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria.silva@fiap.com.br",
    role: "PROFESSOR",
    // Hash da senha "senha123"
    passwordHash: "41a6b943eca1c33f0da51c192318ff90c15635898464b93dabce34cc5f3a71d2",
    salt: "4acdb43f5cb96b3eb1eb87160445c793"
  },
  {
    id: 2,
    name: "Carlos Santos",
    email: "carlos.santos@fiap.com.br",
    role: "PROFESSOR",
    passwordHash: "41a6b943eca1c33f0da51c192318ff90c15635898464b93dabce34cc5f3a71d2",
    salt: "4acdb43f5cb96b3eb1eb87160445c793"
  },
  {
    id: 3,
    name: "João Aluno",
    email: "joao.aluno@fiap.com.br",
    role: "STUDENT",
    passwordHash: "41a6b943eca1c33f0da51c192318ff90c15635898464b93dabce34cc5f3a71d2",
    salt: "4acdb43f5cb96b3eb1eb87160445c793"
  }
];

export const mockAuthApi = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da rede
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    try {
      // Verifica a senha usando a função de criptografia
      const isValid = await verifyPassword(password, user.passwordHash, user.salt);
      if (!isValid) {
        throw new Error("Senha incorreta");
      }
    } catch (error) {
      console.error('Erro ao verificar senha:', error);
      throw new Error("Erro ao verificar credenciais");
    }

    // Gera um token mock (em produção, use JWT adequado)
    const token = btoa(JSON.stringify({ 
      userId: user.id, 
      email: user.email, 
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // expira em 24h
    }));

    const { passwordHash: _, salt: __, ...userWithoutPassword } = user;
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
      const { passwordHash: _, salt: __, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error("Token inválido");
    }
  },

  // Funções auxiliares para verificar permissões
  canReadPosts: (user) => {
    // Todos os usuários autenticados podem ler posts
    return !!user;
  },

  canCreatePosts: (user) => {
    // Apenas professores podem criar posts
    return user && user.role === "PROFESSOR";
  },

  canEditPosts: (user) => {
    // Apenas professores podem editar posts
    return user && user.role === "PROFESSOR";
  },

  canDeletePosts: (user) => {
    // Apenas professores podem deletar posts
    return user && user.role === "PROFESSOR";
  },

  canAddComments: (user) => {
    // Todos os usuários autenticados podem comentar
    return !!user;
  },

  // Helper para verificar qualquer permissão
  hasPermission: (user, action) => {
    const permissions = {
      read: true, // Todos os usuários autenticados podem ler
      create: user?.role === "PROFESSOR",
      edit: user?.role === "PROFESSOR",
      delete: user?.role === "PROFESSOR",
      comment: true // Todos os usuários autenticados podem comentar
    };
    
    return user && permissions[action];
  }
};