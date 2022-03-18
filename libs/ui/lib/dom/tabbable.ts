export function focusTabbable(
  element: HTMLElement,
  preferChildren?: boolean,
  shouldFocusLastTabbable?: boolean
) {
  if (preferChildren) {
    const tabbable = getOrderedTabbableElements(element);

    if (tabbable.length > 0) {
      const elementToFocus = shouldFocusLastTabbable ? tabbable[tabbable.length - 1] : tabbable[0];

      (elementToFocus as HTMLElement).focus();
      return;
    }
  }
  requestAnimationFrame(() => element.focus());
}

export function getOrderedTabbableElements(root: Element) {
  const elementsWithZeroTabIndex: Element[] = [];
  const elementsGroupedByTabIndex: Element[][] = [];

  root.querySelectorAll(TABBABLE_SELECTOR).forEach(element => {
    const nodeTabIndex = getElementTabIndex(element);

    if (nodeTabIndex < 0 || !isFocusableTabbableElement(element)) return;

    if (nodeTabIndex === 0) {
      elementsWithZeroTabIndex.push(element);
    } else if (elementsGroupedByTabIndex[nodeTabIndex]) {
      elementsGroupedByTabIndex[nodeTabIndex].push(element);
    } else {
      elementsGroupedByTabIndex[nodeTabIndex] = [element];
    }
  });

  return elementsGroupedByTabIndex.flat().concat(elementsWithZeroTabIndex);
}

export function isFocusableTabbableElement(element: Element) {
  if ((element as HTMLInputElement).disabled) return false;
  if (isInput(element)) {
    if (element.type === 'hidden') return false;
    if (isNamedRadio(element)) return isTappableRadio(element);
    return true;
  }
  return true;
}

export function getElementTabIndex(element: Element) {
  const tabIndexAttrValue = element.getAttribute('tabindex');
  const tabIndexAsNumber = parseInt(tabIndexAttrValue!, 10);

  if (!Number.isNaN(tabIndexAsNumber)) return tabIndexAsNumber;

  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // https://bugs.chromium.org/p/chromium/issues/detail?id=661108&q=contenteditable%20tabindex&can=2
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.
  if (
    (element as HTMLElement).contentEditable === 'true' ||
    (NODES_WITH_HIDDEN_TABINDEX.includes(element.nodeName) && tabIndexAttrValue === null)
  ) {
    return 0;
  }

  return (element as HTMLElement).tabIndex;
}

const isInput = (el: Element): el is HTMLInputElement => el.tagName === 'INPUT';
const isNamedRadio = (el: HTMLInputElement) => el.type === 'radio' && Boolean(el.name);

const isTappableRadio = (node: HTMLInputElement) => {
  const roving =
    getRadioSelector(node, `[name="${node.name}"]:checked`) ||
    getRadioSelector(node, `[name="${node.name}"]`);

  return roving === node;
};

const getRadioSelector = (element: HTMLElement, selector: string) =>
  element.ownerDocument.querySelector(`input[type="radio"] ${selector}`);

// Inspired by https://github.com/focus-trap/tabbable
const TABBABLE_SELECTOR = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])'
].join(',');

const NODES_WITH_HIDDEN_TABINDEX = ['AUDIO', 'VIDEO', 'DETAILS'];
