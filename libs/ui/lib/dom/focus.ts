import { getOwnerDocument } from './shared';

export function isElementContainsFocus(target: HTMLElement | null) {
  if (!target) return false;
  const targetDocument = getOwnerDocument(target);
  const { activeElement } = targetDocument;

  return !targetDocument.hasFocus() || target === activeElement || target.contains(activeElement);
}
