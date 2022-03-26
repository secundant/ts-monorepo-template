---
to: libs/ui/core/<%=groupName%>/index.ts
inject: true
after: // Components
---
export { <%=h.changeCase.pascalCase(name)%> } from './<%=name%>';
