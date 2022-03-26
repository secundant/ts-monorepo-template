import {
  getOwnerDocument,
  getOwnerWindow,
  getPaddingRight,
  getScrollbarSize,
  isOverflowing,
  setStyle,
  StyleDescriptor
} from '../../lib/dom';

export interface ModalDescriptor<T> {
  value: T | null;
}

export abstract class ModalManager<T> {
  protected items: Array<ModalDescriptor<T>> = [];
  private mounted = false;

  isLast(item: ModalDescriptor<T>) {
    return this.items.length > 0 && this.items.indexOf(item) === this.items.length - 1;
  }

  add(item: ModalDescriptor<T>) {
    if (this.items.includes(item)) return;
    this.items.push(item);
  }

  mount() {
    if (this.mounted || this.items.length === 0) return;
    this.mounted = true;
    this.onMount();
  }

  remove(item: ModalDescriptor<T>) {
    if (!this.items.includes(item)) return;
    this.items.splice(this.items.indexOf(item), 1);
    if (this.items.length === 0) {
      this.mounted = false;
      this.onUnmount();
    }
  }

  protected abstract onMount(): void;
  protected abstract onUnmount(): void;
}

export class BrowserModalManager extends ModalManager<HTMLElement> {
  private stylesToRestore: StyleDescriptor[] = [];

  protected onMount(): void {
    const currentDocument = getOwnerDocument(this.items[0].value);
    const currentBody = currentDocument.body;

    if (isOverflowing(currentBody)) {
      const scrollbarSize = getScrollbarSize(currentDocument);
      const addRightPaddingStyle = (target: HTMLElement) => {
        this.stylesToRestore.push({
          property: 'padding-right',
          element: target,
          value: target.style.paddingRight
        });

        target.style.paddingRight = `${getPaddingRight(target) + scrollbarSize}px`;
      };

      addRightPaddingStyle(currentBody);
      /**
       * Preventing jumps of fixed-elements on overflow change
       */
      for (const fixedElement of Array.from(
        currentBody.querySelectorAll('[data-ui-fixed-element]')
      )) {
        addRightPaddingStyle(fixedElement as HTMLElement);
      }
    }
    // Improve Gatsby support
    // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
    const parent = currentBody.parentElement;
    const containerWindow = getOwnerWindow(currentDocument);
    const scrollContainer =
      parent?.nodeName === 'HTML' && containerWindow.getComputedStyle(parent).overflowY === 'scroll'
        ? parent
        : currentBody;
    // Block the scroll even if no scrollbar is visible to account for mobile keyboard screensize shrink.
    this.stylesToRestore.push(
      {
        value: scrollContainer.style.overflow,
        property: 'overflow',
        element: scrollContainer
      },
      {
        value: scrollContainer.style.overflowX,
        property: 'overflow-x',
        element: scrollContainer
      },
      {
        value: scrollContainer.style.overflowY,
        property: 'overflow-y',
        element: scrollContainer
      }
    );

    scrollContainer.style.overflow = 'hidden';
  }

  protected onUnmount(): void {
    this.stylesToRestore.forEach(setStyle);
    this.stylesToRestore = [];
  }
}
