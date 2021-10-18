// This file contains helper functions that are used in the logic
// of the application.

export const locate_selected_appointment = (
  queues: QueuesState,
  selected_id: number | undefined
): { queue_key: string; index: number } | undefined => {
  // This function takes in the queues object, as well as the selected_id.
  // Function returns the key of the queue with the selected appointment, and the index of the selected appointment
  // Returns false if the id isn't found

  if (selected_id === undefined) {
    return;
  }

  const is_selected = (appointment: AppointmentState) => {
    // Function that takes in an appointment, and returns true if the appointment unique_id matches the selected_id
    return appointment.unique_id == selected_id;
  };

  // Looping through the queues
  for (const [key, queue] of Object.entries(queues)) {
    // Find the selected appointment
    const selected_appointment_index = queue.findIndex(is_selected);
    if (selected_appointment_index !== -1) {
      return { queue_key: key, index: selected_appointment_index };
    }
  }
  return;
};

export const arrange_queue = (queue: Array<AppointmentState>) => {
  // This function takes a queue, and returns a copy of the queue that has:
  // TOP/beginnning of array
  // - in session appointments
  // - in queue
  // BOTTOM/end of array
  // In each of those categories, they are sorted by the time they were added to queue/marked as in session

  // Works by taking two appointments, and comparing them
  queue.sort((a, b) => {
    if (queue_sorting_logic(a) > queue_sorting_logic(b)) {
      return 1;
    } else {
      return -1;
    }
  });
  return queue;
};

const queue_sorting_logic = (appointment: AppointmentState) => {
  // Returns an integer to sort the appointment by.

  let status = appointment.display_data.status;

  // Sort by status first
  let status_sort = ["in-session", "time-up"].includes(status) ? 1 : 2;

  // Within, sort by time added to session/time added to queue
  let date_sort;
  if (appointment.time_data.marked_as_in_session) {
    date_sort = appointment.time_data.marked_as_in_session;
  } else {
    date_sort = appointment.time_data.added_to_queue;
  }
  return status_sort * date_sort;
};

export const calcWaitTimeStrings = (target) => {
  let time_delta = target - new Date().getTime();
  time_delta = time_delta > 0 ? time_delta / 1000 : 0; // Convert to seconds

  let mins = String(Math.floor(time_delta / 60));
  let secs = String(Math.floor(time_delta % 60));
  mins = mins.padStart(2, "0");
  secs = secs.padStart(2, "0");

  return { mins, secs };
};

export const formatDate = (date:Date) => {
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  return `${ye}-${mo}-${da}`;
}