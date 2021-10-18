import { Button, TextField } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import * as React from "react";
import "./usage.scss";
import { ipcRenderer } from "electron";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import { useAppContext } from "../../services/queue.service";
import {
  getApptsForHistoryView,
  removeAll,
  deleteAppt,
} from "../../services/models/appointment_sequelized";
import { Appointment, Student } from "../../services/api_service";
import { getFormattedAppts } from "../../services/csv-export-script";

const columns = [
  { flex: 1, field: "id", headerName: "ID", hide: true },
  { flex: 1, field: "name", headerName: " Name" },
  { flex: 1, field: "student_num", headerName: "Number" },
  { flex: 1, field: "unit_code", headerName: "Unit Code" },
  { flex: 1, field: "team", headerName: "Team" },
  { flex: 1, field: "enquiry_type", headerName: "Enquiry" },
  { flex: 1, field: "session_start", headerName: "Start" },
  { flex: 1, field: "session_len", headerName: "Length (mins)" },
  { flex: 1, field: "waittime", headerName: "Wait Time (mins)" },
  { flex: 1, field: "notes", headerName: "Notes" },
];

const Usage = (): JSX.Element => {
  const { exportData } = useAppContext();
  const [history, setHistory] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);

  const handleRowSelection = (e) => {
    const items = [];
    for (let i = 0; i < e.length; i++) {
      for (let j = 0; j < history.length; j++) {
        if (history[j].id == e[i]) {
          items.push(history[j]);
        }
      }
    }
    setDeletedRows(items);
  };

  const handlePurge = () => {
    //Call the delete function
    console.log("Rows to delete:", deletedRows);
    for (let i = 0; i < deletedRows.length; i++) {
      console.log("deleting id:", deletedRows[i].id);
      deleteAppt(Appointment, deletedRows[i].id);
    }
    fetchHistory();
  };

  const handleClick = () => {
    // Resolves to a Promise<Object>
    ipcRenderer
      .invoke("show-save", {from: from, to: to})
      .then((file) => {
        // Stating whether dialog operation was cancelled or not.
        console.log(file.canceled);
        if (!file.canceled) {
          console.log("Path:", file.filePath.toString());
          const inclusiveTo = to;
          inclusiveTo.setDate(inclusiveTo.getDate() + 1);
          exportData(file.filePath.toString(), from, inclusiveTo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDbClick = () => {
    // Resolves to a Promise<Object>
    ipcRenderer
      .invoke("show-delete")
      .then((confirm) => {
        // Stating whether dialog operation was cancelled or not.
        //confirm.response = 1 when cancel, 0 when approve -_-
        if (!confirm.response) {
          removeAll(Appointment);
          console.log("Database removed!");
          fetchHistory();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const d1 = new Date();
  const d2 = new Date();
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  const [to, setTo] = useState<Date | null>(d1);
  const [from, setFrom] = useState<Date | null>(d2);

  const [pageSize, setPageSize] = useState<number>(10);

  const fetchHistory = async () => {
    const query_to = new Date(to?.valueOf());
    query_to.setDate(query_to.getDate() + 1);
    const apptData = await getApptsForHistoryView(
      Appointment,
      Student,
      from,
      query_to
    );
    setHistory(
      getFormattedAppts(apptData).map((entries) => {
        return { ...entries, id: entries.id };
      })
    );
  };

  useEffect(() => {
    console.log("component mounted");
    fetchHistory();
    return () => {
      console.log("component unmounted");
    };
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [to, from]);

  const variantProps = { variant: "outlined" as const };

  return (
    <div className="usage-page">
      <div className="export-form">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3} direction="row">
            <DesktopDatePicker
              label="From"
              inputFormat="dd/MM/yyyy"
              value={from}
              onChange={setFrom}
              renderInput={(params) => (
                <TextField {...(variantProps as any)} {...params} />
              )}
            />

            <DesktopDatePicker
              label="To"
              inputFormat="dd/MM/yyyy"
              value={to}
              onChange={setTo}
              renderInput={(params) => (
                <TextField {...(variantProps as any)} {...params} />
              )}
            />

            <Button
              variant="outlined"
              style={{ marginLeft: "auto"}}
              onClick={handlePurge}
              id="btn"
            >
              Delete selected Rows
            </Button>

            <Button variant="outlined" onClick={deleteDbClick} id="btn2">
              Clear DB
            </Button>

            <Button variant="outlined" onClick={handleClick} id="btn3">
              Export Data
            </Button>
          </Stack>
        </LocalizationProvider>
        <DataGrid
          rows={history}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          onSelectionModelChange={handleRowSelection}
        />
      </div>
    </div>
  );
};

export default {
  routeProps: {
    path: "/usage",
    component: Usage,
  },
  name: "Usage",
};
