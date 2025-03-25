const forge = require('node-forge');

const entitySecret = "67354e2d7f03a101eb2eb08cb84e4ae5f5d8905d8a88e6e2310d70c8d0942c9a";

const publicKeyPEM = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6AT5+hA5s99cn2cegn5i
0hzcz7NgqWyuEKhn6zA7rtvPYW3j1U1te+PpYTX6RvU4t1C88DQuSN5yiiqAFeQc
t8T5Orm+J2cvqLBgQvidNYC4M42JF0N43A8hP1vjpif5HKam+nNuAHzwHpTZTOLS
ie1X00NuLZ915Qb0D2aTzIJP/lp2H+vpnxFlXwNDsoZJEeKUVW1RjXEBsxBvaM+v
S/lKkxkw1ozH7a22TH2gFtciDeLgZipOpdzsDUgHoO5I7QXKdI5ztwd3vsJ8Aejg
q72mSR965raXgXrrX+79WN4Djj1ky5XW7p/cYHmjf9HEuQL8sNNWCiRiajnxR+1L
o3UOkgMd3wOo9TQFzQlzzbMwohqXX9ScCRZD2DqS3bFIJlW7mwJ2pxdQtgw9rV7A
6c4gtTcLow0vpzZXg2Le4Ebnjv8VppQFwdyLEMb2HPdChay57rO/eCFixQHAA3zN
dIuYR12tfoEukIQDBDdk+gT8zEkVyZpxXm8qyEEb2tPQP4MxkYLWH9ZYGMgs+3oi
ri4i557VybwCpt2OuV9QqTfCvdzSXFQW5P7IxqJV5HX379NHxPjMkUhMtM5a7ipQ
qdeyS61+w8DHPzwx2GIhEGzYq9J6FxkG/WkdD+ki8GYdKqfqdzrJqkQlWe8Nb5yk
nvAdBcVBTGKfjXJg3YXcZsECAwEAAQ==
-----END PUBLIC KEY-----`;

function hexToBytes(hex) {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return String.fromCharCode.apply(null, bytes);
}

function encryptEntitySecret(entitySecretHex, publicKeyPEM) {
  try {
    const entitySecretBytes = hexToBytes(entitySecretHex);
    
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPEM);
    
    const encrypted = publicKey.encrypt(entitySecretBytes, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create()
      }
    });
    
    const base64 = forge.util.encode64(encrypted);
    
    return base64;
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
}

const entitySecretCiphertext = encryptEntitySecret(entitySecret, publicKeyPEM);

if (entitySecretCiphertext.length < 600) {
  throw new Error(`Ciphertext length (${entitySecretCiphertext.length}) is too short, encryption may have failed`);
}

return {
  entitySecret: entitySecret,
  entitySecretCiphertext: entitySecretCiphertext
};
