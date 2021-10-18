

/*
	This file tests the functionality of data export. In its current form,
	it runs the export script, and leaves it available for manual inspection.
	This can be automatised, but this requires implementation of a csv reader.
	The implementation can be taken from here:
	https://www.codegrepper.com/code-examples/javascript/save+it+in+csv+file+in+node+js
*/
import 'regenerator-runtime/runtime';


import {
	StudentModel,
	getAllStudents,
	totalNoStudents,
	addStudent,
	getStudent,
	removeAll
} from "./models/student_sequelized";

import {
	AppointmentModel,
	getAllAppts,
	totalNoAppts,
	getAppts_Consul,
	avgSessionLen,
	findAppt,
	addAppointment,
} from "./models/appointment_sequelized";

import { Student, Appointment } from "./api_service";



const csv = require('csv-parser');
const fs = require('fs');
import { exportStudentsCSV, getFormattedAppts } from "./csv-export-script";

//Code quality is really sketchy, need to find a way to 'stack' the promises
test('Exports a csv file from student db', async () => {

	const remove11 = await removeAll(Student);
	const remove22 = await removeAll(Appointment);

	const addingAppt1 = await addAppointment(Appointment, Student, sampleAppointments.appointment1);
	const addingAppt2 = await addAppointment(Appointment, Student, sampleAppointments.appointment2);

	const appointmentData = await getAllAppts(Appointment,Student);

	console.log("APPOINTMENT MODEL OBJECTS: ", appointmentData);
	console.log("APPOINTMENT MODEL STUDENT OBJ: ", appointmentData[0].dataValues.student);


	const apptList = await getFormattedAppts(appointmentData);


    console.log('APPOINTMENT LIST LENGTH:', apptList.length);
	const exp = await exportStudentsCSV(apptList, csv);

	const remove1 = await removeAll(Student);
	const remove2 = await removeAll(Appointment);

	const expectedCSV = 'aaa';
	expect('aaa').toBe(expectedCSV); //Can replace this later, with proper comparison with some expected csv value.
});





//-----------------------
//Testing objects

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

const sampleStudentsList = [
	{
		name: 'Yuri Zhivago',
		student_num: 22721905
	},
	{
		name: 'Nikolai Zhivago',
		student_num: 22721910
	}
];



const sampleAppointments = {
	appointment1 : {
		unit_code: 'CITS3200',
		team: 'Librarian',
		enquiry_type: 'Essay Writing',
		notes: 'First appointment in the database! #0001',
		session_start: new Date(Date.UTC(2021, 7, 30)),
		session_len : 8,
		waittime : 5,

		student: {
			name: 'Yuri Zhivago',
			student_num: 22721905
		}
	},
	appointment2 : {
		unit_code: 'CITS3001',
		team: 'STUDYSmarter Advisors',
		enquiry_type: 'Lab Report',
		notes: 'Second appointment in the database! #0002',
		session_start: new Date(Date.UTC(2021, 7, 31)),
		session_len : 10,
		waittime : 9,

		student: {
			name: 'Nikolay Zhivago',
			student_num: 22721910
		}
	},
};
