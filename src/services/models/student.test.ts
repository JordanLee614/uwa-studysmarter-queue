/*
	Given the way Sequelize works, specifically the way it allows to manipulate
	all Student-related queries and management through the appointment model,
	these tests, and the majority of the Student model methods are not necessary.
	All functionality is implemented via the Appointment methods.

	Covers:
		very big process of addStudent() and getStudent() together
		totalNoStudents()
		getAllStudents()

	Doesn't Cover:
		---



*/

import 'regenerator-runtime/runtime'

import { Student } from "../api_service";
import {
	StudentModel,
	getAllStudents,
	totalNoStudents,
	addStudent,
	getStudent,
	removeAll
} from "./student_sequelized";


//Code quality is really sketchy, need to find a way to 'stack' the promises
test('Adds a student to database', async () => {

	const remove = await removeAll(Student);

	const adding = await addStudent(Student, sampleStudents.student1);

	const st = await getStudent(Student, sampleStudents.student1.name);

	const remove2 = await removeAll(Student);

 	expect(st.name).toBe(sampleStudents.student1.name);
});


test('shows total number of students in database', async () => {

	const remove1 = await removeAll(Student);

	const adding1 = await addStudent(Student, sampleStudents.student1);
	const adding2 = await addStudent(Student, sampleStudents.student2);

	const noStudents = await totalNoStudents(Student);

	const remove2 = await removeAll(Student);

 	expect(noStudents).toBe(2); //CHANGE THIS TO BE IN BETTER PROMISE FORMAT

});

test('gets all students in db', async () => {

	const remove1 = await removeAll(Student);


	const adding1 = await addStudent(Student, sampleStudents.student1);
	const adding2 = await addStudent(Student, sampleStudents.student2);

	const listOfStudents = await getAllStudents(Student);
	console.log('Student List: ', listOfStudents);

	const remove2 = await removeAll(Student);

 	expect(listOfStudents.length).toBe(2); //CHANGE THIS TO BE IN BETTER PROMISE FORMAT

});

//------------
//Sample students to be used for testing
const sampleStudents = {
	student1: {
		name: 'Yuri Zhivago',
		student_num: 22721905
	},
	student2: {
		name: 'Nikolai Zhivago',
		student_num: 22721910
	}
};
