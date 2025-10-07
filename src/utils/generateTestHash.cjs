const crypto = require('crypto');

function stringToBuffer(str) {
  return Buffer.from(str, 'utf-8');
}

function bufferToHex(buffer) {
  return buffer.toString('hex');
}

async function generateSalt() {
  return bufferToHex(crypto.randomBytes(16));
}

async function hashPassword(password, salt) {
  const saltBuffer = Buffer.from(salt, 'hex');
  const passwordWithSalt = Buffer.concat([stringToBuffer(password), saltBuffer]);
  
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, 'sha256', (err, derivedKey) => {
      if (err) reject(err);
      resolve(bufferToHex(derivedKey));
    });
  });
}

async function testPasswordHash() {
  try {
    const password = "senha123";
    const salt = await generateSalt();
    const hash = await hashPassword(password, salt);
    
    console.log('Valores para mockUsers:');
    console.log(`salt: "${salt}",`);
    console.log(`passwordHash: "${hash}"`);
    
  } catch (error) {
    console.error('Erro:', error);
  }
}

testPasswordHash();