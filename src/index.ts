// while using prisma after npm i prisma npx prisma init
import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
const app = express();
const client = new PrismaClient();

async function CreateUser() {
  await client.user.create({
    data: {
      username: "Lakshay",
      password: "123456",
      email: "123@gmail.com",
      city: "Delhi",
      age: 18,
    },
  });
}

// CreateUser();
async function FindUser() {
  const user = await client.user.findFirst({
    where: {
      id: 1,
    },
    select: {
      username: true,
      email: true,
      age: true,
    },
  });
  console.log(user);
}
// FindUser();

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await client.user.findMany();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error ",
    });
  }
});

app.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await client.user.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        username: true,
        city: true,
        age: true,
        email: true,
        todo: true,
      },
    });

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error ",
    });
  }
});

app.listen(8080, () => {
  console.log("App is listening on port 8080");
});
