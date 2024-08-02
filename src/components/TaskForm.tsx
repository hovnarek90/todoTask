import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../features/tasks/tasksSlice';
import { Task } from '../features/tasks/Task';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4">{task ? 'Edit Task' : 'Add Task'}</h2>
        <Formik
          initialValues={{
            title: task?.title || '',
            description: task?.description || '',
            deadline: task?.deadline || '',
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Title is required'),
            deadline: Yup.date().optional(),
          })}
          onSubmit={(values) => {
            const newTask: Task = {
              id: task ? task.id : Date.now().toString(),
              title: values.title,
              description: values.description,
              deadline: values.deadline,
              status: task ? task.status : 'Pending',
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
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <Field id="title" name="title" type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Field id="description" name="description" as="textarea" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                <Field id="deadline" name="deadline" type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Save</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
