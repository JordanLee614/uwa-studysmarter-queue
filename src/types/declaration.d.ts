declare module "*.png";

//Defining the structure of the props
//https://www.pluralsight.com/guides/use-interface-props-in-functional-components-using-typescript-with-react
//to be used in the class component
//https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/class_components/
//!What is the difference between props and states?
// Props are read only and passed in on render

declare type Status = "in-queue" | "in-session" | "time-up";
declare type Team = "Learning Adviser" | "Librarian";

declare interface FormOutput {
  name: string;
  student_num: number;
  unit_code: string;
  team: Team;
  enquiry_type: string;
  // week: number;
  notes: string;
}

declare interface StudentInfo {
  unique_id: number;
  name: string;
  student_num: string;
  unit_code?: string;
  status: Status;
  time_displayed?: number | NaN; // Given in seconds
}

declare interface QueueInfo {
  name: string;
  data: Array<AppointmentState>;
  selected_id: number;
}

declare interface ApplicationState {
  queues: QueuesState;
  selected_id: number | undefined;
}

declare interface QueuesState {
  studysmarter: Array<AppointmentState>;
  librarian: Array<AppointmentState>;
}

declare interface AppointmentState {
  // Data that is captured by the form
  unique_id: number;
  selected?: boolean;
  capture_data: AppointmentCapturedData;
  time_data: {
    added_to_queue: number;
    marked_as_in_session?: number;
    marked_as_done?: number;
  };
  display_data: {
    // Data that is solely used to display the entry
    status: Status;
    text: string;
    // queue_position: bigint;
    target?: number; // A number to help with adding and removing minutes
  };
}

declare interface AppointmentCapturedData {
  unit_code?: string;
  team: Team; // Not null
  enquiry_type: string; // Not null
  notes?: string;
  session_start?: Date;
  session_len?: number;
  waittime?: number;

  student: StudentObj;
}

declare interface StudentObj {
  name: string; //Not null
  student_num: number; //Not null
  //not sure if this needs a primary key field..
}
