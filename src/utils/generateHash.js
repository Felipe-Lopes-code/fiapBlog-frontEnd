import { hashPassword, generateSalt } from '../utils/crypto';

/**
 * Utilitário para gerar hashes de senha para desenvolvimento
 * Use apenas para gerar hashes de teste, nunca em produção
 */
async function _generatePasswordHash() {
  const password = "senha123"; // Senha padrão para testes
  const salt = await generateSalt();
  const hash = await hashPassword(password, salt);
  
  console.log(`Para a senha "${password}":`);
  console.log(`Salt: "${salt}"`);
  console.log(`Hash: "${hash}"`);
}

// Descomente a linha abaixo para gerar novos hashes
// generatePasswordHash();