import { Paper } from '@libs/ui/core/card';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Task } from '@/shared/types';

export interface TaskListItemProps {
  task: Task;
  endNode?: ReactNode;
  startNode?: ReactNode;
}

export function TaskListItem({
  task: { completed, label },
  startNode,
  endNode
}: TaskListItemProps) {
  return (
    <Paper className="mb-4 flex flex-row items-center">
      {startNode && <div className="mr-6">{startNode}</div>}
      <div
        className={clsx('text-xl text-blue-900', completed && 'line-through', endNode && 'mr-6')}
      >
        {label}
      </div>
      {endNode && <div className="ml-auto">{endNode}</div>}
    </Paper>
  );
}
