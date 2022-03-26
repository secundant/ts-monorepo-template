export const getOwnerWindow = (node?: Node | null) => getDocumentWindow(getOwnerDocument(node));
export const getOwnerDocument = (node?: Node | null) => node?.ownerDocument ?? document;
export const getDocumentWindow = (document: Document) => document.defaultView || window;
