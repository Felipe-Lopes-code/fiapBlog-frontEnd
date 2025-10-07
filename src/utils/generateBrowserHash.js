import { generateSalt, hashPassword } from './crypto.js';

// Função auxiliar para gerar hashes para desenvolvimento
async function generateHashesForDev() {
  try {
    const password = 'senha123';
    const salt = generateSalt();
    const hash = await hashPassword(password, salt);
    
    console.log('Novos valores para mockUsers:');
    console.log('salt:', `"${salt}",`);
    console.log('passwordHash:', `"${hash}"`);
    
    // Teste de consistência
    const salt2 = generateSalt();
    const hash2 = await hashPassword(password, salt2);
    console.log('\nTeste de consistência (deve ser diferente do anterior):');
    console.log('salt:', `"${salt2}",`);
    console.log('passwordHash:', `"${hash2}"`);
    
  } catch (error) {
    console.error('Erro ao gerar hashes:', error);
  }
}

// Executa o teste
generateHashesForDev();