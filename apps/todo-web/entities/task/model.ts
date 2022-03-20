import { createEvent, createStore } from 'effector';
import { Task, TaskCreationParams, TaskID, TaskUpdateParams } from '@/shared/types';

export const tasksList = createStore<Task[]>([
  {
    id: '0',
    label: 'First example',
    completed: true
  }
]);

export const addTask = createEvent<TaskCreationParams>();

tasksList.on(addTask, (prev, { label }) =>
  prev.concat({
    id: prev.length.toString(),
    label,
    completed: false
  })
);

export const removeTaskById = createEvent<TaskID>();
export const removeTask = removeTaskById.prepend<Task>(task => task.id);

tasksList.on(removeTaskById, (prev, id) => prev.filter(task => task.id !== id));

export const updateTask = createEvent<TaskUpdateParams>();

tasksList.on(updateTask, (prev, updates) =>
  prev.map(task => (task.id === updates.id ? { ...task, ...updates } : task))
);
