import { PrismaClient } from '../src/generated/prisma/client.js'
import { getDatabaseUrl } from '../src/database-url.js'
import { hashPassword } from '#/lib/hash.js'

import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: getDatabaseUrl(),
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.review.deleteMany()
  await prisma.entry.deleteMany()
  await prisma.user.deleteMany()

  const adminPassword = await hashPassword('KorokNET')
  const userPassword = await hashPassword('testuser')

  const admin = await prisma.user.create({
    data: {
      login: 'Admin',
      fullname: 'Админ Админович',
      phone: '8(922)344-91-23',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    },
  })

  const testuser = await prisma.user.create({
    data: {
      login: 'testuser',
      fullname: 'Юзер Юзерович',
      phone: '8(922)344-91-24',
      email: 'testuser@example.com',
      password: userPassword,
    },
  })

  const student = await prisma.user.create({
    data: {
      login: 'student1',
      fullname: 'Иванов Иван Иванович',
      phone: '8(900)123-45-67',
      email: 'student1@example.com',
      password: userPassword,
    },
  })

  const entryOne = await prisma.entry.create({
    data: {
      course: 'Основы алгоритмизации и программирования',
      paymentType: 'Переводом по номеру телефона',
      startAt: new Date('2026-03-01T10:00:00.000Z'),
      status: 'Обучение завершено',
      userId: testuser.id,
    },
  })

  await prisma.entry.create({
    data: {
      course: 'Основы веб-дизайна',
      paymentType: 'Наличными',
      startAt: new Date('2026-04-15T10:00:00.000Z'),
      userId: student.id,
    },
  })

  await prisma.entry.create({
    data: {
      course: 'Основы проектирования баз данных',
      paymentType: 'Переводом по номеру телефона',
      startAt: new Date('2026-05-20T10:00:00.000Z'),
      userId: admin.id,
    },
  })

  await prisma.review.create({
    data: {
      text: 'Отличный курс, всё понятно и по делу!',
      rating: 5,
      userId: testuser.id,
      entryId: entryOne.id,
    },
  })

  console.log('✅ Created users: Admin, testuser, student1')
  console.log('✅ Created 3 entries and 1 review')
  console.log('🔐 Admin: Admin / KorokNET')
  console.log('🔐 User:  testuser / testuser')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
