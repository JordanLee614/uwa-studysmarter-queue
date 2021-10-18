//defines the student model
//The model is highly important, it is an integral part of the database.
//However, the add and remove methods are not necessary for it, the Student info is
//managed by the Appointment Model.

const StudentModel = (sequelize, type) => {
	return sequelize.define('student',  {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: type.STRING,
		student_num: type.INTEGER,
	})
};


// kinda unsure if its should be function or const
const getAllStudents = (model) => {
    return model.findAll();
}

//Total no. of students for the day
const totalNoStudents = (model) => {
	return model.count();
}

const getStudent = (model, name) => {
	return model.findOne({ where: { name: name } });
}

//add a student to db
//"The Model.create() method is a shorthand for building an unsaved instance
//with Model.build() and saving the instance with instance.save()."

//This model is needed only for testing the student table.
//The student will usually be added to the database via the addAppointment function
async function addStudent(model, student){
	const st = await model.create({ name: student.name, student_num: student.student_num });
	return st;
}

async function removeAll(model){
	return await model.destroy({
		where: {},
		truncate:true
	});
}

export {
	StudentModel,
	getAllStudents,
	totalNoStudents,
	getStudent,
	addStudent,
	removeAll
};
