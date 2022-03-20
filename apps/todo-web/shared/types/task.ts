export type TaskID = string;

export interface Task {
  id: TaskID;
  label: string;
  completed: boolean;
}

export interface TaskCreationParams {
  label: string;
}

export interface TaskUpdateParams extends Pick<Task, 'id'>, Partial<Omit<Task, 'id'>> {}
