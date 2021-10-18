import React from "react";
import "./help.scss";
import dashboard from "./images/dashboard-numbered.png";
import form from "./images/form.png";
import usage from "./images/usage-numbered.png";

const HelpContainer: React.FC = (): JSX.Element => {
  return (
    <div className="help-container">
      <nav className="nav-container">
        <p>Table of Contents</p>
        <hr />
        <li>
          <a href="#imp">Important Notes</a>
        </li>
        <li>
          <a href="#dashboard">Dashboard</a>
        </li>
        <li>
          <a href="#usage">Usage</a>
        </li>
      </nav>

      <div className="contents-container">
        <ImportantContent />
        <DashboardContent />
        <UsageContent />
      </div>
    </div>
  );
};

const ImportantContent: React.FC = (): JSX.Element => {
  return (
    <div>
      <h1 id="imp">Important Notes</h1>

      <h3>1. Appointments added into the Database</h3>
      <p>
        <b>※</b> Clicking <b>DELETE SELECTED ROWS</b> or <b>DELETE DB</b> in the
        usage page will <i>permanently</i> delete the selected rows or all data
        respectively. In the case of <b>DELETE DB</b> an extra popup will ask
        for confirmation. These operations are irreversible.
      </p>
      <p>
        <b>※</b> Appointments are only added in the database once they have gone
        from "In Queue" to "In Session" to "Complete". If a session has been
        marked as "Complete" when they were previously "In Queue", they will{" "}
        <strong>not</strong> be recorded in the database. The <b>Usage</b> tab
        will only show appointments in the database.
      </p>
      <p>
        <b>※</b> If there's any no show and would like this appointment added
        into the database, put the respective appointment in session, and then
        complete the appointment. Refer to the last point below to edit this
        appointment.
      </p>
      <p>
        <b>※</b> Appointment info cannot be edited once it has been added to the
        queue or database. If edits are required, either remove the appointment
        in the queue by completing it (don't put it <b>IN SESSION</b> so it
        won't be added in the database), then add the appointment again with the
        updated details. Or you can export the data and change the data recorded
        in the CSV.
      </p>
      <p>
        <b>※</b> Each appointments added in the queue are unique via the student
        number. If another appointment has the same student number in the same
        queue, then the new appointment made won't be added into that queue. Eg,
        if Bob has the student id as 12345678, and was in the{" "}
        <b>Learning Adviser</b> queue, then Phil who was accidentally given the
        same student id as Bob can't be added in the <b>Learning Adviser</b>{" "}
        queue. However, if Bob wants to be in both of the queues, the respective
        appointments can be added into the respective queues.
      </p>

      <h3>2. Form Inputs</h3>
      <p>
        <b>※</b> Name input can contain alphabetical, comma, apostrophe, period,
        space, and hyphen characters.
      </p>
      <p>
        <b>※</b> Student ID needs to have 8 digits of numerical values only. Eg,
        12345678.
      </p>
      <p>
        <b>※</b> Unit code must have 4 alphabetical characters at the start,
        followed by 4 numerical values. Eg, cits3200. Otherwise, it can be left
        blank if the students query isn't specific to a unit.
      </p>
      <p>
        <b>※</b> Notes input accepts alphabetical, (), /, hyphen, space, and
        comma characters. It has a maximum size of 150 characters.
      </p>

      <br />
    </div>
  );
};

const DashboardContent: React.FC = (): JSX.Element => {
  return (
    <div>
      <h1 id="dashboard">Dashboard</h1>
      <p>
        The Dashboard page is where the queueing system mechanism will be in
        active. This is where users will spend the most time on this
        application. The following sections below are provided in the hopes to
        aide in the functionalities and general view of the Dashboard page.
      </p>
      <p>
        <b>NOTE:</b> Please read the <b>Important Notes</b> section before using
        the application.
      </p>

      <h2>General view of the page:</h2>
      <img
        src={dashboard}
        alt="Diagram of dashboard with number annotations"
        className="image"
      />

      <ol className="num-li">
        <li>
          <span>Queues</span>
        </li>
        <li>
          <span>
            Appointment – If selected, the border will change colour to red.
          </span>
        </li>
        <li>
          <span>Appointment Status</span>
        </li>
        <li>
          <span>Buttons – Manipulates the queues.</span>
        </li>
      </ol>

      <h2>Functionalities:</h2>

      <h3>1. Queue</h3>
      <p>
        There are two queues displayed on the page. Both queues will contain a
        number of <b>Appointments</b> that holds information for the user to
        distinguish. Information displayed in the appointment are the name of
        the student, their student number, unit code, and its status.
      </p>
      <p>
        The <b>Appointment Status</b> has three states: IN QUEUE, TIME UP, and
        displaying the time remaining once it is in session.
      </p>

      <h3>2. Buttons</h3>
      <p>
        <b>NOTE:</b> Majority of these buttons will only work once an
        appointment has been selected.
      </p>
      <ul className="func-ul">
        <li>
          <p>
            <b>Session</b> – Changes appointment status in a green colour with a
            timer displayed.
          </p>
        </li>
        <li>
          <p>
            <b>Queue</b> – Changes appointment status in a blue colour with
            words 'IN QUEUE' displayed. User can use this if an appointment was
            accidentally put in session.
          </p>
        </li>
        <li>
          <p>
            <b>+1 or -1</b> – Adds or subtracts one minute of the timer for the
            appointment, if finished appointment status change to an orange
            colour with words 'TIME UP' displayed.
          </p>
        </li>
        <li>
          <p>
            <b>Add Student</b> – Pops out a form to fill in the information
            needed from the student, and once completed it will be added into
            the respective queue (Learning Adviser or Librarian).
          </p>
        </li>
        <li>
          <p>
            <b>Complete Appointment</b> – The appointment will be removed from
            the queue as its session has finished, and adds its information in
            the database. The appointment can also appear in the{" "}
            <i>Historical View</i> in the usage page.
          </p>
        </li>
      </ul>

      <h3>3. Form</h3>
      <p>
        The form will popup once the <b>Add Student</b> button is clicked on.
        This is where the user can add Student details and their respective
        enquiries. After submission, an <b>Appointment</b> will be added in the
        queue with the respective details.
      </p>
      <img
        src={form}
        alt="Form for adding student details and to the queue."
        className="imageForm"
      />

      <ul className="func-ul">
        <li>
          <p>
            <b>Name</b> – Student's name.
          </p>
        </li>
        <li>
          <p>
            <b>Student Number</b> – Must be 8 digits long.
          </p>
        </li>
        <li>
          <p>
            <b>Unit Code</b> – Must contain 4 letters, followed by 4 numbers.
            Can be left blank. Example: cits3200.
          </p>
        </li>
        <li>
          <p>
            <b>Team</b> – Has 2 options, Learning Adviser or Librarian.
          </p>
        </li>
        <li>
          <p>
            <b>Enquiry</b> – Couple of options to choose from. If the options
            are not listed then choose <b>Other (See Notes)</b> and write its
            description in the <b>Notes</b> input.
          </p>
        </li>
        <li>
          <p>
            <b>Notes</b> – Additional description. Maximum of 150 characters
            including space.
          </p>
        </li>
      </ul>

      <br />
    </div>
  );
};

const UsageContent: React.FC = (): JSX.Element => {
  return (
    <div>
      <h1 id="usage">Usage</h1>
      <p>
        The usage page is where you are able to view the history of the service,
        and view the data stored on the machine. This is also where you can
        export relevant data based on the date range, delete specific data
        checked in the <b>Historical View</b> section, or reset the whole
        database (clearing it all).
      </p>
      <p>
        <b>NOTE:</b> Please read the <b>Important Notes</b> section before using
        the application.
      </p>

      <h2>General View of the page:</h2>
      <img
        src={usage}
        alt="Diagram of usage with number annotations"
        className="image"
      />

      <ol className="num-li">
        <li>
          <span>
            Historical View – This is where completed appointments will appear.
          </span>
        </li>
        <li>
          <span>Date Ranges</span>
        </li>
        <li>
          <span>Buttons – See functionalities for more details.</span>
        </li>
        <li>
          <span>Data Columns</span>
        </li>
        <li>
          <span>Appointments</span>
        </li>
      </ol>

      <h2>Functionalities:</h2>

      <h3>1. Date Range Picker</h3>
      <p>Here you specify the range for which you would like to view data.</p>
      <p>
        The date range is such that if you view data from 01/01/20 to 03/01/20,
        it will display data from any sessions that started between 12am
        01/01/20, and 11:59pm on 03/01/20.
      </p>
      <p>
        If you want to view sessions occurring on the 03/01/20, you need to have
        03/01/20 as the end date.
      </p>

      <h3>2. Data Columns</h3>
      <p>
        These columns display the data captured by the system. Clicking on the
        names of the columns allows you to sort the columns in ascending or
        descending order, as well as specify filters for the columns. Filtering
        by student number is useful to see the service's usage by a particular
        student.
      </p>
      <ul className="func-ul">
        <li>
          <p>
            <b>Name</b> – The name of the student using the service.
          </p>
        </li>
        <li>
          <p>
            <b>Student Number</b> – The student number of the student using the
            service.
          </p>
        </li>
        <li>
          <p>
            <b>Unit Code</b> – The unit code relevant to the help session.
          </p>
        </li>
        <li>
          <p>
            <b>Team</b> – The team that the student is seeing.
          </p>
        </li>
        <li>
          <p>
            <b>Enquiry</b> - What category the enquiry type falls into.
          </p>
        </li>
        <li>
          <p>
            <b>Start</b> – The date and time at which the session started.
          </p>
        </li>
        <li>
          <p>
            <b>Length</b> – The length of the session (in minutes).
          </p>
        </li>
        <li>
          <p>
            <b>Wait Time</b> – The time (in minutes) between the student being
            added to the system, and being marked as "<b>IN SESSION</b>".
          </p>
        </li>
        <li>
          <p>
            <b>Notes</b> – Additional notes regarding the appointment.
          </p>
        </li>
      </ul>

      <h3>3. Buttons</h3>
      <ul className="func-ul">
        <li>
          <p>
            <b>DELETE DB</b> – Resets the database, clears all appointments in
            the database currently.
          </p>
        </li>
        <li>
          <p>
            <b>EXPORT DATA</b> – Exports data in the database. Data exported
            will depend on the date range chosen.
          </p>
        </li>
        <li>
          <p>
            <b>DELETE SELECTED ROW</b> – Deletes rows that are checked/selected
            in the Historical View. Can select all by clicking on the top most
            checkbox.
          </p>
        </li>
      </ul>

      <h3>4. Data Navigation</h3>
      <p>
        By clicking the buttons at the bottom of the page, you can view multiple
        pages of data. You can also change the limit of rows viewed in one page.
        Only have the option of 5, 10 or 15 rows of data to be shown.
      </p>

      <br />
    </div>
  );
};

export default {
  routeProps: {
    path: "/help",
    component: HelpContainer,
  },
  name: "Help",
};
