//GOOD QUERY GUIDE for linked tables.
//https://stackoverflow.com/questions/20460270/how-to-make-join-queries-using-sequelize-on-node-js/48132501

import { Sequelize, Op } from "sequelize";
import { Appointment } from "../api_service";

const AppointmentModel = (sequelize, type) => {
	return sequelize.define('appointment', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		unit_code: type.STRING,
		team: type.STRING,
		enquiry_type: type.STRING,
		notes: type.STRING,
		session_start: type.DATE,
		session_len: type.INTEGER,
		waittime: type.INTEGER,
	})
};


// Lists out the entire appt table
const getAllAppts = (apptModel, studentModel) => {
	return apptModel.findAll({
		include: [{
			model: studentModel,
		}]
	});
};

//Total no. of appointments for the day
const totalNoAppts = (model) => {
	return model.count();
};

//Get list of all appointments that receive consultations
const getAppts_Consul = (model) => {
	return model.findAll({
		where: {
			session_len: {
				[Op.not]: null
			}
		}
	});
};

// Get Average Session Length
const avgSessionLen = (model) => {
	return model.findAll({
		attributes: [Sequelize.fn('AVG', Sequelize.col("session_len"))],
		raw: true
	})
};


//very basic find method, finds based on .notes field
const findAppt = (model, notes) => {
	return model.findOne({ where: { notes: notes } });
};

//add an appointment to db
//adding the appointment is supposed to also add the student.
//this is part of the sequelize functionality for associated Tables
//https://sequelize.org/v3/docs/associations/
//appointment and student are json objects.

async function addAppointment(appointmentModel, studentModel, appointment) {
	//const student = await addStudent(studentModel, appointment.student);

	const appt = await appointmentModel.create({
		unit_code: appointment.unit_code,
		team: appointment.team,
		enquiry_type: appointment.enquiry_type,
		notes: appointment.notes,
		session_start: appointment.session_start,
		session_len: appointment.session_len,
		waittime: appointment.waittime,

		student: {
			name: appointment.student.name,
			student_num: appointment.student.student_num
		}
	}, {
		include: [studentModel]
	});
	return appt;
}

async function removeAll(model) {
	return await model.destroy({
		where: {},
		truncate: true
	});
}

async function deleteAppt(model,appointmentId){
	return await model.destroy({
		where:{
			id: appointmentId
			}
	});
}

//In the future, we will not need to pass the 'today' and 'yesterday' variables
//they are needed now, because test cases have concrete-set 'session start' times,
//so there is no point to limit the range to the today's day.
//the code to establish the proper range is below, but commented out.
const getApptsForHistoryView = async (apptModel, studentModel, earliest, latest) => {
	//this sets the time range
	//let today = new Date();
	//let yesterday = new Date();
	//today.setHours(0, 0, 0);
	//yesterday.setDate(today.getDate() - 1);

	console.log('earliest: ' + earliest);
	console.log('latest: ' + latest);

	return apptModel.findAll({
		where: {
			session_start: {
				[Op.between]: [earliest, latest]
			}
		},
		include: [{
			model: studentModel,
		}]
	});
};

export {
	AppointmentModel,
	getAllAppts,
	totalNoAppts,
	getAppts_Consul,
	avgSessionLen,
	findAppt,
	addAppointment,
	removeAll,
	getApptsForHistoryView,
	deleteAppt
};
