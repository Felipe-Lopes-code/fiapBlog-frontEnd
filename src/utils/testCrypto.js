import { hashPassword, generateSalt, verifyPassword } from './crypto';

async function testPasswordHash() {
  const password = "senha123";
  
  // Gera salt e hash
  const salt = await generateSalt();
  const hash = await hashPassword(password, salt);
  
  console.log('Teste de senha:');
  console.log(`Senha: ${password}`);
  console.log(`Salt: ${salt}`);
  console.log(`Hash: ${hash}`);
  
  // Testa verificação
  const isValid = await verifyPassword(password, hash, salt);
  console.log(`\nVerificação da senha:`);
  console.log(`A senha está correta? ${isValid ? 'Sim' : 'Não'}`);

  // Testa verificação com senha errada
  const wrongPassword = "senha456";
  const isInvalid = await verifyPassword(wrongPassword, hash, salt);
  console.log(`\nTeste com senha errada (${wrongPassword}):`);
  console.log(`A senha está correta? ${isInvalid ? 'Sim' : 'Não'}`);
}

testPasswordHash();