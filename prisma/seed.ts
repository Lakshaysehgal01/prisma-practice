import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
async function createDummyUsers() {
  let user = await client.user.create({
    data: {
      username: "Lipika",
      email: "1234@gmail.com",
      password: "123455",
      age: 20,
      city: "delhi",
      todo: {
        create: {
          description: "Eat healthy",
          title: "health",
          completed: false,
        },
      },
    },
  });
}
createDummyUsers();

// npx prisma db seed 