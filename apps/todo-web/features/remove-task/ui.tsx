import { ErrorIcon } from '@libs/ui/icons';
import { useEvent } from 'effector-react';
import { memo, useCallback } from 'react';
import { TaskModel } from '@/entities/task';
import { Task } from '@/shared/types';

export interface RemoveTaskProps {
  task: Task;
}

export const RemoveTask = memo(({ task: { id } }: RemoveTaskProps) => {
  const remove = useEvent(TaskModel.removeTaskById);
  const handleClick = useCallback(() => remove(id), [remove, id]);

  return (
    <button
      className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent hover:bg-gray-100 focus:bg-gray-300"
      onClick={handleClick}
    >
      <ErrorIcon className="text-2xl text-red-800" />
    </button>
  );
});

RemoveTask.displayName = 'RemoveTask';
