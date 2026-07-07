const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.log("استفاده: node scripts/hash-password.js YOUR_PASSWORD");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("این مقدار رو داخل .env.local برای ADMIN_PASSWORD_HASH بذار:");
console.log(hash);