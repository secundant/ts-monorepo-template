export const getOwnerWindow = (node?: Node | null) => getDocumentWindow(getOwnerDocument(node));
export const getOwnerDocument = (node?: Node | null) => node?.ownerDocument ?? document;
export const getDocumentWindow = (document: Document) => document.defaultView || window;
export const getCurrentFocused = () => document.activeElement;

export const isFocusableElement = (element: Element | EventTarget | null): element is HTMLElement =>
  element !== null && 'focus' in element && typeof (element as HTMLElement).focus === 'function';
export const tryFocusElement = (element: Element | EventTarget | null) =>
  isFocusableElement(element) && element.focus();
