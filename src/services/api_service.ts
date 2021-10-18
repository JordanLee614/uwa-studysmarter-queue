import sqlite from "sqlite3";
import { Sequelize } from "sequelize";

import { StudentModel } from "./models/student_sequelized";
import { AppointmentModel } from "./models/appointment_sequelized";

let db_path;
if (process.platform == "darwin") {
  const path = require("path");
  db_path = path.resolve(__dirname, "database.sqlite3");
} else {
  db_path = "database.sqlite3";
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModule: sqlite,
  storage: db_path,
});

const Student = StudentModel(sequelize, Sequelize);

const Appointment = AppointmentModel(sequelize, Sequelize);
Appointment.hasOne(Student, {
  onDelete: "cascade",
});
//Adds a 'studentID'(a foreign key) to the appointment table
//https://sequelize.org/master/manual/assocs.html

//creates the database and its tables
sequelize.sync().then(() => {
  console.log("Tables were created..");
});

export { Student, Appointment };
