import { getDocumentWindow, getOwnerDocument } from './shared';

// Is a vertical scrollbar displayed?
export function isOverflowing(container: Element): boolean {
  const ownerDocument = getOwnerDocument(container);

  if (ownerDocument.body === container) {
    return getDocumentWindow(ownerDocument).innerWidth > ownerDocument.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/488fd8afc535ca3a6ad4dc581f5e89217b6a36ac/js/src/util/scrollbar.js#L14-L18
export function getScrollbarSize(doc: Document): number {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  const documentWidth = doc.documentElement.clientWidth;

  return Math.abs(window.innerWidth - documentWidth);
}
