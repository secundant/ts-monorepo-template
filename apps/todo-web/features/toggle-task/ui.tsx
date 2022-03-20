import { useEvent } from 'effector-react';
import { memo, useCallback } from 'react';
import { TaskModel } from '@/entities/task';
import { Task } from '@/shared/types';

export interface ToggleTaskProps {
  task: Task;
}

export const ToggleTask = memo(({ task }: ToggleTaskProps) => {
  const updateTask = useEvent(TaskModel.updateTask);
  const handleChange = useCallback(
    e =>
      updateTask({
        id: task.id,
        completed: e.target.checked
      }),
    [task.id]
  );

  return <input type="checkbox" onChange={handleChange} checked={task.completed} />;
});

ToggleTask.displayName = 'ToggleTask';
