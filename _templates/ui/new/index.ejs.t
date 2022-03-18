---
to: libs/ui/core/<%=name%>/index.ts
---
// Components
export { <%=h.changeCase.pascalCase(name)%> } from './<%=name%>';

// Types
export type { <%=h.changeCase.pascalCase(name)%>Props } from './<%=name%>';
