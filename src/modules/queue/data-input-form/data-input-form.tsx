import React, { ChangeEvent, useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import "./data-input-form.scss";
import { useAppContext } from "../../../services/queue.service";

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: <T>(value: T) => boolean;
    message: string;
  };
}

type Validations<T> = Partial<Record<keyof T, Validation>>;

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

const form: {
  validations?: Validations<FormOutput>;
  initialValues?: Partial<FormOutput>;
  onSubmit?: (input_form: FormOutput) => void;
} = {
  validations: {
    name: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: "^[a-zA-Z ,.'-]+$",
        message: "Only alphabetical characters are permitted.",
      },
    },
    unit_code: {
      pattern: {
        value: "(^$)|(^[a-zA-Z]{4}[0-9]{4}$)",
        message: "Must be 4 letters followed by 4 numbers.",
      },
    },
    student_num: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: "^[0-9]{8}$",
        message: "Must be 8 numbers long",
      },
    },
    team: {
      required: {
        value: true,
        message: "This field is required",
      },
      custom: {
        isValid: (value: unknown) =>
          ["Learning Adviser", "Librarian"].includes(value as string),
        message: "Must be 'Learning Adviser' or 'Librarian'",
      },
    },
    enquiry_type: {
      required: {
        value: true,
        message: "This field is required",
      },

      pattern: {
        value: "^[A-Za-z0-9s /()]{0,150}$",
        message: "Up to 150 alphanumeric characters permitted.",
      },
    },
    notes: {
      pattern: {
        value: "^[A-Za-z /()-,]{0,150}$",
        message: "Only alphabetical characters are permitted.",
      },
    },
  },
};

type UseForm<T> = {
  data: Record<keyof T, unknown>;
  handleChange: <S extends unknown>(
    key: keyof T,
    sanitizeFn?: ((value: string) => S) | undefined
  ) => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  errors: Partial<Record<keyof T, string>>;
};

export const useForm = <T extends Record<keyof T, unknown>>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: (input_form: FormOutput) => void;
}): UseForm<T> => {
  const [data, setData] = useState((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});
  // all logic goes here
  const handleChange =
    <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setErrors({
        ...errors,
        [key]: undefined,
      });
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
      setData({
        ...data,
        [key]: value,
      });
    };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    event
  ) => {
    event?.preventDefault();
    const validations = options?.validations;

    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<T> = {};

      for (const key in validations) {
        let value = String(data[key]);
        if (value === "undefined") {
          value = ""; // In case element isn't defined (due to it being the first time the form is opened)
        }

        console.log(typeof value);
        const validation = validations[key];

        const required = validation?.required;
        if (required?.value && !value) {
          console.log("required");
          valid = false;
          newErrors[key] = required?.message;
          continue;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value as string)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        console.log(errors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit(data as unknown as FormOutput);
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };
};

const DataInputForm = (props: { close: () => void }): JSX.Element => {
  const { addQueueItem } = useAppContext();
  const submitForm = (input_form: FormOutput) => {
    let code = input_form.unit_code;
    // If code is undefined
    if (!code) {
      code = "";
    }
    // Making unit code all uppercase
    code = code.toUpperCase();

    input_form.unit_code = code;
    addQueueItem(input_form);
    props.close();
  };

  //Team name selection
  const teams = ["Learning Adviser", "Librarian"];

  // Enquiry selection
  const enquiries = [
    "Essay",
    "Grammar",
    "Lab Report",
    "Assignment",
    "Literature Review",
    "Research Proposal",
    "Thesis/Paper",
    "IELTS",
    "Oral Presentation",
    "Referencing",
    "Finding Sources",
    "Endnote",
    "Other (See Notes)",
  ];

  form.onSubmit = submitForm;

  const { data, handleChange, handleSubmit, errors } =
    useForm<FormOutput>(form);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Student name */}
      <FormControl variant="outlined" error={errors?.name !== undefined}>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={data.name || ""}
          onChange={handleChange("name")}
          label="Name"
          className="margin"
        />
        <FormHelperText id="my-helper-text">{errors.name}</FormHelperText>
      </FormControl>

      {/* Student ID */}
      <FormControl variant="outlined" error={errors?.student_num !== undefined}>
        <InputLabel htmlFor="component-outlined">Student Number</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={data.student_num || ""}
          onChange={handleChange("student_num")}
          label="Student Number"
          className="margin"
        />
        <FormHelperText id="my-helper-text">
          {errors.student_num}
        </FormHelperText>
      </FormControl>

      {/* Unit code */}
      <FormControl variant="outlined" error={errors?.unit_code !== undefined}>
        <InputLabel htmlFor="component-outlined">Unit Code</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={data.unit_code || ""}
          onChange={handleChange("unit_code")}
          label="Unit Code"
          className="margin"
        />
        <FormHelperText id="my-helper-text">{errors.unit_code}</FormHelperText>
      </FormControl>

      {/* Team option */}
      <FormControl variant="outlined" error={errors?.team !== undefined}>
        <InputLabel htmlFor="component-outlined">Team</InputLabel>
        <Select
          id="component-outlined"
          value={data.team || ""}
          onChange={handleChange("team")}
          label="Team"
          className="margin"
        >
          {teams.map((team) => (
            <MenuItem key={team} value={team}>
              {team}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id="my-helper-text">{errors.team}</FormHelperText>
      </FormControl>

      {/* Enquiry option */}
      <FormControl
        variant="outlined"
        error={errors?.enquiry_type !== undefined}
      >
        <InputLabel htmlFor="component-outlined">Enquiry</InputLabel>
        <Select
          id="component-outlined"
          value={data.enquiry_type || ""}
          onChange={handleChange("enquiry_type")}
          label="Enquiry"
          className="margin"
        >
          {enquiries.map((enq) => (
            <MenuItem key={enq} value={enq}>
              {enq}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id="my-helper-text">
          {errors.enquiry_type}
        </FormHelperText>
      </FormControl>

      {/* Notes */}
      <FormControl variant="outlined" error={errors?.notes !== undefined}>
        <InputLabel htmlFor="component-outlined">Notes</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={data.notes || ""}
          onChange={handleChange("notes")}
          label="Notes"
          className="margin"
        />
        <FormHelperText id="my-helper-text">{errors.notes}</FormHelperText>
      </FormControl>

      <Button type="submit" id="button">
        Submit
      </Button>
    </form>
  );
};

export default DataInputForm;
