---
to: libs/ui/core/<%=name%>/<%=name%>.tsx
---
import { ReactNode } from 'react';
import clsx from 'clsx';

export interface <%=h.changeCase.pascalCase(name)%>Props {
  className?: string;
  children: NonNullable<ReactNode>;
}

export function <%=h.changeCase.pascalCase(name)%>({ children, className }: <%=h.changeCase.pascalCase(name)%>Props) {
  return <div className={clsx('bg-white', className)}>{children}</div>;
}
