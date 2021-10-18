//https://www.codegrepper.com/code-examples/javascript/save+it+in+csv+file+in+node+js

const createCsvWriter = require('csv-writer').createObjectCsvWriter;


//creates the writer, with specified path
async function exportDataWithPath(path, apptList) {
	console.log(path);
	const csvWriter = createCsvWriter({
		path: path,
		header: [
			{ id: 'name', title: 'Name' },
			{ id: 'student_num', title: 'Student Number' },

			{ id: 'unit_code', title: 'Unit Code' },
			{ id: 'team', title: 'Team' },
			{ id: 'enquiry_type', title: 'Enquiry Type' },
			{ id: 'notes', title: 'Notes' },
			{ id: 'session_start', title: 'Session Start' },
			{ id: 'session_len', title: 'Session Length (mins)' },
			{ id: 'waittime', title: 'Wait Time (mins)' },
		]
	});
	exportStudentsCSV(apptList, csvWriter);
}

//Formats an Appointment model object, returns a list of appointment objects
function getFormattedAppts(appointmentData) {
	const apptList = [];
	for (let i = 0; i < appointmentData.length; i++) {
		if (appointmentData[i].student == null) {
			break;
		}
		const appt = {
			unit_code: appointmentData[i].dataValues.unit_code,
			team: appointmentData[i].dataValues.team,

			enquiry_type: appointmentData[i].dataValues.enquiry_type,
			notes: appointmentData[i].dataValues.notes,
			session_start: appointmentData[i].dataValues.session_start,
			session_len: appointmentData[i].dataValues.session_len,
			waittime: appointmentData[i].dataValues.waittime,

			name: appointmentData[i].student.dataValues.name,
			student_num: appointmentData[i].student.dataValues.student_num,

			id: appointmentData[i].dataValues.id

		};
		apptList.push(appt);
	}
	return apptList;
}

//takes a list of formatted objects(format specified by the CSV-writer) and creates the csv file.
async function exportStudentsCSV(sampleStudents, csvWriter) {
	return await csvWriter
		.writeRecords(sampleStudents)
		.then(() => console.log('The CSV file was written successfully'));
}


//const exp = exportStudentsCSV(sampleForAllFields);

export {
	exportStudentsCSV,
	getFormattedAppts,
	exportDataWithPath
};



//Format of the list to be passed to the exportStudentsCSV

//old student list sample
// const sampleForStudents = [
// 	{
// 		name: 'Yuri Zhivago',
// 		student_num: 22721905
// 	},
// 	{
// 		name: 'Nikolai Zhivago',
// 		student_num: 22721910
// 	}
// ];

// //main list to fill all fields
// const sampleForAllFields = [
// 	{
// 		unit_code: 'CITS3200',
// 		team: 'Librarian',
// 		enquiry_type: 'Essay Writing',
// 		notes: 'First appointment in the database! #0001',
// 		session_start: new Date(Date.UTC(2021, 7, 30)),
// 		session_len: 8,
// 		waittime: 5,


// 		name: 'Yuri Zhivago',
// 		student_num: 22721905

// 	},
// 	{
// 		unit_code: 'CITS3001',
// 		team: 'STUDYSmarter Advisors',
// 		enquiry_type: 'Lab Report',
// 		notes: 'Second appointment in the database! #0002',
// 		session_start: new Date(Date.UTC(2021, 7, 31)),
// 		session_len: 10,
// 		waittime: 9,

// 		name: 'Nikolay Zhivago',
// 		student_num: 22721910

// 	}
// ];

/*
//CSV WRITER FOR ALL CSV FIELDS
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
	{id: 'name', title: 'Name'},
	{id: 'student_num', title: 'Student Number'},

	{id: 'unit_code', title: 'Unit Code'},
	{id: 'team', title: 'Team'},
	{id: 'enquiry_type', title: 'Enquiry Type'},
	{id: 'notes', title: 'Notes'},
	{id: 'session_start', title: 'Session Start'},
	{id: 'session_len', title: 'Session Length'},
	{id: 'waittime', title: 'Wait Time'},
  ]
});
*/
