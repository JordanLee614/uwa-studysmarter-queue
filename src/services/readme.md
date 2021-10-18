api_service.ts - creates the database tables, and links them together so that 'student' is a foreign key in 'appointment'

the models directory contains:

	appointment_api.ts - defines a typescript interface for the appointment JSON Object

	appointment_sequelized.ts - defines the appointment table and relevant methods

	appointment.test.ts - defines the unit tests for the appointment table

	---------------

	student_api.ts - defines a typescript interface for the student JSON Object

	student_sequelized.ts - defines the student table and relevant methods

	student.test.ts - defines the unit tests for the student table

	---------------

	models.ts - 'compiles' all files listed above into one module and exports it.


The unit tests can be run with the 'npm run test' command.
Jest has been used to write the current tests. 
Coverage of the tests is detailed in the individual .test.ts files.
