import { useEventCallback, useForkRef, useMergedCallback } from '../../hooks';
import { useFocusReturnToLast } from '../../hooks/focus-trap/useFocusReturnToLast';
import { useHotkeyCallback } from '../../hooks/keyboard/useHotkey';
import { Backdrop } from './backdrop';
import { BrowserModalManager, ModalDescriptor, ModalManager } from './modal-manager';
import { Portal } from './portal';
import { TrapFocus } from './trap-focus';
import clsx from 'clsx';
import {
  cloneElement,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

export interface ModalProps {
  open?: boolean;
  manager?: ModalManager<HTMLElement>;
  onClose?(): void;
  children: ReactElement;
  backdrop?: boolean | 'invisible' | 'blur';
  className?: string;
  transition?: boolean;
}

export const DEFAULT_MODAL_MANAGER = new BrowserModalManager();

export const Modal = forwardRef(
  (
    {
      open,
      children,
      className,
      backdrop = true,
      manager = DEFAULT_MODAL_MANAGER,
      onClose,
      transition
    }: ModalProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [exited, setExited] = useState(true);
    const visible = transition ? !exited : !!open;

    const rootRef = useRef<HTMLDivElement>(null);
    const rootForkRef = useForkRef(ref, rootRef);
    const descriptorRef = useRef<ModalDescriptor<HTMLElement>>({ value: null });

    const isLastModal = useCallback(() => manager.isLast(descriptorRef.current), [manager]);
    /**
     * Modal lifecycle
     */
    const handleMounted = useCallback(() => {
      manager.mount();
      // Fix a bug on Chrome where the scroll isn't initially 0.
      rootRef.current!.scrollTop = 0;
    }, [manager]);

    const handleClose = useCallback(() => manager.remove(descriptorRef.current), [manager]);

    const handleOpen = useEventCallback(() => {
      descriptorRef.current.value = rootRef.current;
      manager.add(descriptorRef.current);
      // The element was already mounted.
      if (rootRef.current) handleMounted();
    });
    /**
     * Event listeners and handlers
     */
    const handlePortalRef = useEventCallback(portalNode => {
      if (portalNode && open && isLastModal()) {
        handleMounted();
      }
    });
    const handleKeyDown = useHotkeyCallback(
      [['Escape', () => open && onClose?.()]],
      [open, onClose]
    );
    const handleBackdropClick = useEventCallback((event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose?.();
      }
    });
    const handleEnter = useEventCallback(() => setExited(false));
    const handleExited = useEventCallback(() => {
      setExited(true);
      handleClose();
    });

    useFocusReturnToLast(visible);
    useEffect(() => handleClose, [handleClose]);
    useEffect(() => {
      if (open) {
        handleOpen();
      } else if (!transition) {
        handleClose();
      }
    }, [open, transition, handleClose, handleOpen]);

    const transitionProps = {
      onEnter: useMergedCallback(handleEnter, transition ? children.props.onEnter : null),
      onExited: useMergedCallback(handleExited, transition ? children.props.onExited : null)
    };

    if (!open && (!transition || exited)) {
      return null;
    }
    return (
      <Portal ref={handlePortalRef}>
        <div
          role="presentation"
          ref={rootForkRef}
          onKeyDown={handleKeyDown}
          className={clsx('fixed z-50 inset-0', !visible && 'invisible opacity-0', className)}
          aria-hidden={!visible}
        >
          {backdrop && (
            <Backdrop
              open={open}
              onClick={handleBackdropClick}
              blurred={backdrop === 'blur'}
              invisible={backdrop === 'invisible'}
            />
          )}
          <TrapFocus active={!!open} isEnabled={isLastModal}>
            {cloneElement(children, {
              tabIndex: children.props.tabIndex ?? '-1',
              ...(transition ? transitionProps : {})
            })}
          </TrapFocus>
        </div>
      </Portal>
    );
  }
);

Modal.displayName = 'Modal';
