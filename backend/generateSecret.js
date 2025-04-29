const crypto = require('crypto');

// Generate a random 64-byte string (512 bits)
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('Your JWT Secret:');
console.log(jwtSecret);
