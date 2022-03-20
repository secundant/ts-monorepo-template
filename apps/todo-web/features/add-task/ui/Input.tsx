import { useEventCallback } from '@libs/ui/hooks';
import { useEvent } from 'effector-react';
import { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import { TaskModel } from '@/entities/task';

export const AddTaskInput = memo(() => {
  const [value, setValue] = useState('');
  const addTask = useEvent(TaskModel.addTask);

  const handleChange = useEventCallback((e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)
  );
  const handleKeyDown = useEventCallback((e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      setValue('');
      addTask({
        label: value
      });
    }
  });

  return (
    <input
      type="text"
      placeholder="Add task..."
      className="p-4 block w-full text-2xl italic text-gray-400 border-gray-200 border shadow-sm rounded-md focus:outline outline-2 outline-offset-2 outline-violet-600"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
});

AddTaskInput.displayName = 'AddTaskInput';
