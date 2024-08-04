import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../store/features/tasks/tasksSlice";
import { Task } from "../store/features/tasks/tasksSlice";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

const DatePickerField = ({ field, form, ...props }: any) => {
  const { setFieldValue } = form;

  return (
    <DatePicker
      {...props}
      value={field.value ? dayjs(field.value) : null}
      onChange={(value) => setFieldValue(field.name, value)}
      renderInput={(params: any) => (
        <TextField
          {...params}
          fullWidth
          variant="outlined"
          error={form.touched[field.name] && Boolean(form.errors[field.name])}
          helperText={form.touched[field.name] && form.errors[field.name]}
        />
      )}
    />
  );
};

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={{
          title: task?.title || "",
          description: task?.description || "",
          deadline: task?.deadline ? dayjs(task.deadline) : null,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          deadline: Yup.date().nullable().optional(),
        })}
        onSubmit={(values) => {
          const newTask: Task = {
            id: task ? task.id : Date.now().toString(),
            title: values.title,
            description: values.description,
            deadline: values.deadline ? values.deadline.toISOString() : "",
            status: task ? task.status : "Pending",
          };

          if (task) {
            dispatch(editTask(newTask));
          } else {
            dispatch(addTask(newTask));
          }

          onClose();
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Container maxWidth="sm">
              <Box sx={{ my: 2 }}>
                <Typography variant="h6">Task Form</Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <Field
                  name="title"
                  as={TextField}
                  label="Title"
                  fullWidth
                  variant="outlined"
                  error={!!ErrorMessage.name}
                  helperText={<ErrorMessage name="title" />}
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <Field
                  name="description"
                  as={TextField}
                  label="Description"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <Field
                  name="deadline"
                  component={DatePickerField}
                  label="Deadline"
                />
              </Box>
              <Box
                sx={{ my: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </Container>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default TaskForm;
