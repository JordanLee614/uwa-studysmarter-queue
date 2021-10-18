/*

	*NEED MOCKS AND STUBS FOR MORE SPECIALISED TESTING*

	This file tests the main functionality of the models and the associated methods.


	Covers:
		addAppointment() and findAppt() together
		totalNoAppts() and addAppointment() together
		getAvgSessLen() and addAppointment() together

	Doesn't Cover:
		getAllAppts()
		totalNoAppts() with mocks/stubs
		getAppts_Consul()
		findAppt() with mocks/stubs



*/

import 'regenerator-runtime/runtime'



import { Student, Appointment} from "../api_service";
import {
	totalNoAppts,
	avgSessionLen,
	findAppt,
	addAppointment,
	removeAll,
	getApptsForHistoryView
} from "./appointment_sequelized";


test('adds appointment to database', async () => {

	const remove1 = await removeAll(Appointment);

	const adding = await addAppointment(Appointment, Student, sampleAppointments.appointment1);
	const appt = await findAppt(Appointment, sampleAppointments.appointment1.notes);

	const remove11 = await removeAll(Appointment);

 	expect(appt.notes).toBe(sampleAppointments.appointment1.notes); //CHANGE THIS TO BE IN PROMISE FORMAT
});


test('shows total number of appointments in database', async () => {

	const remove1 = await removeAll(Appointment);

	const adding1 = await addAppointment(Appointment, Student, sampleAppointments.appointment1);
	const adding2 = await addAppointment(Appointment, Student, sampleAppointments.appointment2);

	const noAppts = await totalNoAppts(Appointment);

	const remove11 = await removeAll(Appointment);

 	expect(noAppts).toBe(2); //CHANGE THIS TO BE IN PROMISE FORMAT

});

test('shows average session time', async () => {

	const remove1 = await removeAll(Appointment);

	const adding1 = await addAppointment(Appointment, Student, sampleAppointments.appointment1);
	const adding2 = await addAppointment(Appointment, Student, sampleAppointments.appointment2);
	const avgSessionTime = await avgSessionLen(Appointment);

	const remove11 = await removeAll(Appointment);

 	expect(avgSessionTime[0]['AVG(`session_len`)']).toBe(9); //CHANGE THIS TO BE IN PROMISE FORMAT
});

test('returns all appointments added today for history view', async () => {

	const remove1 = await removeAll(Appointment);

	const adding1 = await addAppointment(Appointment, Student, sampleAppointments.appointment1);
	const adding2 = await addAppointment(Appointment, Student, sampleAppointments.appointment2);
	const adding3 = await addAppointment(Appointment, Student, sampleAppointments.appointment3);

	//temporary time range
	let earliest = new Date(Date.UTC(2021, 7, 30));
	let latest = new Date(Date.UTC(2021, 7, 31))
	earliest.setHours(0, 0, 0);
	latest.setHours(0, 0, 0);

	const allAppts = await getApptsForHistoryView(Appointment, Student, earliest, latest);

	console.log(`All Appointments between ${earliest}, and ${latest}:`);
	console.log(allAppts);
	const remove11 = await removeAll(Appointment);

 	expect(allAppts.length).toBe(2); //CHANGE THIS TO BE IN PROMISE FORMAT
});


//------------
//Sample appointments to be used for testing
const sampleAppointments = {
	appointment1 : {
		unit_code: 'CITS3200',
		team: 'Librarian',
		enquiry_type: 'Essay Writing',
		notes: 'First appointment in the database! #0001',
		session_start: new Date(Date.UTC(2021, 7, 30)).setHours(12,14,54),
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
		session_start: new Date(Date.UTC(2021, 7, 30)).setHours(15,34,40),
		session_len : 10,
		waittime : 9,

		student: {
			name: 'Nikolay Zhivago',
			student_num: 22721910
		}
	},
	appointment3 : {
		unit_code: 'CITS3003',
		team: 'Librarian',
		enquiry_type: 'Other',
		notes: 'Third appointment in the database! #0003',
		session_start: new Date(Date.UTC(2021, 9, 15)).setHours(17,43,21),
		session_len : 11,
		waittime : 4,

		student: {
			name: 'Lara Antipova',
			student_num: 22721915
		}
	},
};
