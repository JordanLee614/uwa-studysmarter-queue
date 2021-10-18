import { useAppContext } from "../../services/queue.service";
import { Fade, Modal, Backdrop } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import DataInputForm from "./data-input-form/data-input-form";
import "./queue.scss";

// Importing helper function
import { arrange_queue, calcWaitTimeStrings } from "../../shared/utils";

const QueueContainer: React.FC = (): JSX.Element => {
  const {
    app_state,
    removeQueueItem,
    updateQueueItemStatus,
    updateQueueItemWaitTime,
  } = useAppContext();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="queue-container">
      <Queue
        name="Learning Advisers"
        data={app_state.queues.studysmarter}
        selected_id={app_state.selected_id}
      />

      {/* Testing style of buttons*/}
      <div className="btn-container">
        <button
          className="button"
          onClick={() => {
            updateQueueItemStatus("in-session");
          }}
        >
          Session
        </button>
        <button
          className="button"
          onClick={() => {
            updateQueueItemStatus("in-queue");
          }}
        >
          Queue
        </button>

        <div className="inline">
          <button
            className="button2"
            onClick={() => updateQueueItemWaitTime(1)}
          >
            +1
          </button>
          <button
            className="button2"
            onClick={() => updateQueueItemWaitTime(-1)}
          >
            -1
          </button>
        </div>

        <div className="inline2"></div>

        <button className="button" onClick={handleOpen}>
          Add Student
        </button>
        <button className="button" onClick={removeQueueItem}>
          Complete Appointment
        </button>
      </div>

      <Queue
        name="Librarians"
        data={app_state.queues.librarian}
        selected_id={app_state.selected_id}
      />

      <Modal
        open={open}
        aria-describedby="transition-modal-description"
        onClose={handleClose}
        className="modal-wrapper"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={open}>
          <div className="modal">
            <DataInputForm close={handleClose}></DataInputForm>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const Queue: React.FC<QueueInfo> = (props) => {
  const queue: AppointmentState[] = arrange_queue(Array.from(props.data));
  //TODO: render the array such that time left at top, in session below, in queue below that

  // Rendering the stored students to student JSX based on the internal state
  const rendered_students = queue.map((appointment, index) => {
    return (
      <Student
        key={index}
        {...appointment}
        selected={appointment.unique_id == props.selected_id}
      ></Student>
    );
  });

  // Rendering queue
  return (
    <div className="queue">
      <h1>{props.name}</h1>
      {rendered_students}
    </div>
  );
};

const Student: React.FC<AppointmentState> = (props) => {
  const { selectAppointment } = useAppContext();
  const { capture_data, display_data, selected, unique_id } = props;

  const updateTimer = useRef(null);

  const calcTime = (): { text: string; status: Status } => {
    const { mins, secs } = calcWaitTimeStrings(display_data.target);

    if (mins == "00" && secs == "00")
      return { text: "TIME UP", status: "time-up" };

    return { text: `${mins}:${secs}`, status: "in-session" };
  };

  const [displayed_data, setDisplayData] = useState(calcTime());

  const setUpdateTimer = () => {
    updateTimer.current = setInterval(() => {
      const data = calcTime();
      if (data.status == "time-up") clearUpdateTimer();
      setDisplayData(data);
      display_data.status = data.status;
      display_data.text = data.text;
    }, 1000);
  };

  const clearUpdateTimer = () => {
    console.log("clearing update timer");
    clearInterval(updateTimer.current);
    updateTimer.current = undefined;
  };

  const checkStatus = () => {
    if (updateTimer.current) clearUpdateTimer();
    switch (display_data.status) {
      case "in-queue": {
        setDisplayData(display_data);
        break;
      }
      case "in-session": {
        setDisplayData(display_data);
        setUpdateTimer();
        break;
      }
      case "time-up": {
        setDisplayData(display_data);
        break;
      }
    }
  };

  useEffect(() => {
    console.log("component mounted");
    checkStatus();

    return () => {
      console.log("component unmounted");
      if (updateTimer.current) clearUpdateTimer();
    };
  }, []);

  useEffect(() => {
    checkStatus();
  }, [props]);

  return (
    <div
      className={`student ${selected ? "selected" : ""}`} // classes are "student" + state
      onClick={() => selectAppointment(unique_id)}
    >
      {/* Have the elements inside in rows */}
      <div className={`status-container ${displayed_data.status}`}>
        <p>{displayed_data.text}</p>
      </div>

      <div className="name-id">
        <p>
          <b>{capture_data.student.name}</b>
        </p>
        <p>{capture_data.student.student_num}</p>
      </div>

      <div className="unit-code">
        <p>{capture_data.unit_code}</p>
      </div>
    </div>
  );
};

export default {
  routeProps: {
    path: "/",
    component: QueueContainer,
  },
  name: "Dashboard",
};
