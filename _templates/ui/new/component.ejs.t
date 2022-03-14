---
to: libs/ui/core/<%=name%>/<%=name%>.tsx
---
import { ReactNode } from 'react';
import clsx from 'clsx';

export interface <%=name%>Props {
  className?: string;
  children: NonNullable<ReactNode>;
}

export function <%=name%>({ children, className }: <%=name%>Props) {
  return <div className={clsx('bg-white', className)}>{children}</div>;
}
