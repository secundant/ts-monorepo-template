import { useList } from 'effector-react';
import { memo } from 'react';
import { TaskListItem, TaskModel } from '@/entities/task';
import { AddTaskInput } from '@/features/add-task';
import { RemoveTask } from '@/features/remove-task';
import { ToggleTask } from '@/features/toggle-task';

export const TodosScreen = memo(() => {
  return (
    <div className="py-12 px-4 mx-auto max-w-lg">
      <h1 className="mb-8 text-6xl">Todos</h1>
      <div className="mb-8">
        <AddTaskInput />
      </div>
      {useList(TaskModel.tasksList, {
        fn: task => (
          <TaskListItem
            task={task}
            endNode={<RemoveTask task={task} />}
            startNode={<ToggleTask task={task} />}
          />
        ),
        getKey: task => task.id
      })}
    </div>
  );
});

TodosScreen.displayName = 'TodosScreen';
