import express, { Router } from "express";
import demoController from "../controller/demo.controller";

const demoRouter = express.Router();

let studentList = [
  {
    fullname: "anhtuan1",
    age: 18,
    classStudent: "pta 06",
    id: 1,
  },
  {
    fullname: "anhtuan2",
    age: 138,
    classStudent: "pta 06",
    id: 2,
  },
  {
    fullname: "anhtua3",
    age: 100,
    classStudent: "pta 06",
    id: 3,
  },
  {
    fullname: "anhtuan4",
    age: 128,
    classStudent: "pta 06",
    id: 4,
  },
];

demoRouter.get("/check-server", (req, res, next) => {
  res.json("hello");
});

demoRouter.get("/students", demoController.students);

demoRouter.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const index = studentList.findIndex((student) => {
    return student.id == id;
  });
  if (index !== -1) {
    const student = studentList[index];
    res.status(200).send(student);
  } else {
    res.status(404).send("not found");
  }
});

//add students
demoRouter.post("/students", (req, res) => {
  let student = req.body;
  student = {
    id: Math.random(),
    ...student,
  };
  studentList = [...studentList, student];
  res.status(201).send(student);
});

//update student
demoRouter.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { fullname, age, classStudent } = req.body;
  const index = studentList.findIndex((studentList) => {
    return studentList.id == id;
  });
  const oldstudent = studentList[index];
  const updateStudent = { ...oldstudent, fullname, age, classStudent };
  studentList[index] = updateStudent;
  res.status(200).send(updateStudent);
});

demoRouter.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const index = studentList.findIndex((studentList) => studentList.id == id);
  if (index !== -1) {
    const student = studentList[index];
    studentList.splice(index, 1);
    res.status(200).send(student);
  } else {
    res.status(404).send("not found");
  }
  console.log(id);
  res.send("Delete student");
});

// Mysql2
demoRouter.get("/mysql2", async (req, res, next) => {
  const [rows, fields] = await pool.query("SELECT * FROM `user`");
  console.log(rows);
  console.log(fields);
  res.send("Ok");
});

demoRouter.get("/sequelize", async (req, res, next) => {
  // Sử dụng model do mình tạo ra (code first)
  const permissional = await permission.findAll({
    raw: true,
  });

  // dùng model do sequelize-auto tạo ra (database first)
  const users = await models.User.findAll({
    raw: true,
  });
  res.json({ permissional, users });
});

demoRouter.get("/prisma", demoController.prisma);
demoRouter.get("/middleware", (req, res, next) => {
  console.log("middleware")
  next();
}, demoController.middleware);

demoRouter.get("/send-email", demoController.sendEmail);

export default demoRouter;
