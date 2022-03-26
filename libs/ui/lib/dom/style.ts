import { getOwnerWindow } from './shared';

export const setStyle = ({ value, element, property }: StyleDescriptor) =>
  !value ? element.style.removeProperty(property) : element.style.setProperty(property, value);

export const getPaddingRight = (element: Element) =>
  parseInt(getOwnerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;

export interface StyleDescriptor {
  element: HTMLElement;
  /**
   * CSS property name (HYPHEN CASE) to be modified.
   */
  property: string;
  value: string | null;
}
