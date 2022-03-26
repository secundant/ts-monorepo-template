import { useChildrenForkRef, useUniversalLayoutEffect } from '../../hooks';
import setRef from '../../lib/refs';
import { cloneElement, forwardRef, ReactElement, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  disablePortal?: boolean;
  targetNode?: HTMLElement | null;
  children: ReactElement;
}

export const Portal = forwardRef(function Portal(
  { children, targetNode, disablePortal }: PortalProps,
  ref
) {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const forkRef = useChildrenForkRef(children, ref);

  useUniversalLayoutEffect(() => {
    if (!disablePortal) {
      setMountNode(targetNode ?? document.body);
    }
  }, [targetNode, disablePortal]);

  useUniversalLayoutEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => setRef(ref, null);
    }
    return void 0;
  }, [mountNode, disablePortal]);

  if (disablePortal) {
    return cloneElement(children, {
      ref: forkRef
    });
  }
  return mountNode ? createPortal(children, mountNode) : mountNode;
});
