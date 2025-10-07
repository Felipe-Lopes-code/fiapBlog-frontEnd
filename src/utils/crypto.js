/**
 * Converte uma string para bytes (UTF-8)
 */
function stringToBytes(str) {
  return new TextEncoder().encode(str);
}

/**
 * Converte bytes para string hexadecimal
 */
function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converte string hexadecimal para bytes
 */
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

/**
 * Gera um salt aleatório
 */
export function generateSalt() {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return bytesToHex(salt);
}

/**
 * Cria um hash da senha usando PBKDF2
 * @param {string} password - A senha em texto puro
 * @param {string} salt - O salt em formato hexadecimal
 * @returns {Promise<string>} O hash resultante em formato hexadecimal
 */
export async function hashPassword(password, salt) {
  // Converte a senha para bytes
  const passwordBytes = stringToBytes(password);
  
  // Importa a senha como chave
  const key = await crypto.subtle.importKey(
    'raw',
    passwordBytes,
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  // Deriva os bits usando PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: hexToBytes(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    256
  );
  
  // Converte o resultado para hexadecimal
  return bytesToHex(new Uint8Array(derivedBits));
}

/**
 * Verifica se uma senha corresponde a um hash
 * @param {string} password - A senha em texto puro para verificar
 * @param {string} hash - O hash armazenado
 * @param {string} salt - O salt usado para criar o hash
 * @returns {Promise<boolean>} True se a senha corresponde ao hash
 */
export async function verifyPassword(password, hash, salt) {
  try {
    const calculatedHash = await hashPassword(password, salt);
    return calculatedHash === hash;
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    return false;
  }
}