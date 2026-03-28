const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@studymate.com';
  const password = 'admin123';
  const name = 'Admin User';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Seeding Admin: ${email}`);

    // Highly simplified raw SQL to avoid parameter issues
    const query = `
      INSERT INTO "User" (email, password, name, role)
      VALUES ('${email}', '${hashedPassword}', '${name}', 'admin')
      ON CONFLICT (email) DO UPDATE 
      SET role = 'admin', password = '${hashedPassword}';
    `;
    
    await prisma.$executeRawUnsafe(query);

    console.log('Admin user seeded successfully via SIMPLIFIED RAW SQL!');
  } catch (e) {
    console.error('Error seeding admin via SIMPLIFIED RAW SQL:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
