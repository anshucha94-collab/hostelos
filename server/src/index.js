const express = require("express");
const cors = require("cors");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

/* GET ALL STUDENTS */
app.get("/students", async (req, res) => {
  const students = await prisma.student.findMany();

  res.json(students);
});

/* ADD STUDENT */
app.post("/students", async (req, res) => {
  const student = await prisma.student.create({
    data: {
      name: req.body.name,
      branch: req.body.branch,
      room: req.body.room,
      status: req.body.status,
    },
  });

  res.json(student);
});

/* DELETE STUDENT */
app.delete("/students/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.student.delete({
    where: {
      id,
    },
  });

  res.json({
    message: "Student deleted",
  });
});
app.get("/logs", async (req, res) => {
  const logs = await prisma.entryLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(logs);
});

app.post("/logs", async (req, res) => {
  const log = await prisma.entryLog.create({
    data: {
      student: req.body.student,
      action: req.body.action,
    },
  });

  res.json(log);
});
app.get("/dashboard", async (req, res) => {
  const totalStudents =
    await prisma.student.count();

  const insideStudents =
    await prisma.student.count({
      where: {
        status: "Inside",
      },
    });

  const outsideStudents =
    await prisma.student.count({
      where: {
        status: "Outside",
      },
    });

  const totalLogs =
    await prisma.entryLog.count();

  res.json({
    totalStudents,
    insideStudents,
    outsideStudents,
    totalLogs,
  });
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});