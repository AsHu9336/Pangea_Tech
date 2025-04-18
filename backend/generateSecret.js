const crypto = require('crypto');

// Generate a random 64-byte string (512 bits)
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('Your JWT Secret:');
console.log(jwtSecret);
console.log('\nCopy this value and paste it into your .env file as JWT_SECRET='); 