const express = require("express");

const cors = require("cors");

const jwt =
  require("jsonwebtoken");

const bcrypt =
  require("bcryptjs");

const {
  PrismaClient,
} = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(cors());

app.use(express.json());

/* GET ALL STUDENTS */
app.get("/students", async (req, res) => {
  const students =
    await prisma.student.findMany();

  res.json(students);
});

/* ADD STUDENT */
app.post("/students", async (req, res) => {
  const student =
    await prisma.student.create({
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
app.delete(
  "/students/:id",
  async (req, res) => {
    const id = parseInt(
      req.params.id
    );

    await prisma.student.delete({
      where: {
        id,
      },
    });

    res.json({
      message:
        "Student deleted",
    });
  }
);

/* GET LOGS */
app.get("/logs", async (req, res) => {
  const logs =
    await prisma.entryLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  res.json(logs);
});

/* ADD LOG */
app.post("/logs", async (req, res) => {
  const log =
    await prisma.entryLog.create({
      data: {
        student:
          req.body.student,
        action:
          req.body.action,
      },
    });

  res.json(log);
});

/* DASHBOARD STATS */
app.get(
  "/dashboard",
  async (req, res) => {
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
  }
);

/* SMART QR SCAN */
app.post("/scan", async (req, res) => {
  try {
    const studentId = Number(
      req.body.studentId
    );

    const student =
      await prisma.student.findUnique({
        where: {
          id: studentId,
        },
      });

    if (!student) {
      return res.status(404).json({
        message:
          "Student not found",
      });
    }

    const currentStatus =
      student.status;

    const newStatus =
      currentStatus === "Inside"
        ? "Outside"
        : "Inside";

    const action =
      newStatus === "Inside"
        ? "ENTRY"
        : "EXIT";

    const updatedStudent =
      await prisma.student.update({
        where: {
          id: studentId,
        },
        data: {
          status: newStatus,
        },
      });

    await prisma.entryLog.create({
      data: {
        student:
          updatedStudent.name,
        action,
      },
    });

    const currentHour =
      new Date().getHours();

    const lateNight =
      currentHour >= 22 ||
      currentHour <= 5;

    res.json({
      success: true,
      lateNight,
      student:
        updatedStudent.name,
      action,
      status:
        updatedStudent.status,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Scan failed",
    });
  }
});

/* LIVE NOTIFICATIONS */
app.get(
  "/notifications",
  async (req, res) => {
    const notifications =
      await prisma.entryLog.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });

    res.json(notifications);
  }
);

/* ADMIN LOGIN */
app.post("/login", async (req, res) => {
  try {
    const {
      username,
      password,
    } = req.body;

    const adminUsername =
      "admin";

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    const validUser =
      username ===
      adminUsername;

    const validPassword =
      await bcrypt.compare(
        password,
        hashedPassword
      );

    if (
      !validUser ||
      !validPassword
    ) {
      return res.status(401).json({
        message:
          "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        username,
      },
      "hostelos-secret-key",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Login failed",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});