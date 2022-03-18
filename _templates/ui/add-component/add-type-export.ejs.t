---
to: libs/ui/core/<%=groupName%>/index.ts
inject: true
after: // Types
---
export type { <%=h.changeCase.pascalCase(name)%>Props } from './<%=name%>';
