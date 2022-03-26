import { useCallback, useState } from 'react';

export interface UsePopoverParams {
  id: string;
}

export function usePopover({ id }: UsePopoverParams) {
  const [anchorNode, setAnchorNode] = useState<HTMLElement | null>(null);
  const handleClick = useCallback(e => setAnchorNode(e.target), []);
  const close = useCallback(() => setAnchorNode(null), []);

  return {
    close,
    triggerProps: {
      'aria-controls': anchorNode ? id : void 0,
      onClick: handleClick,
      'aria-haspopup': true
    },
    popoverProps: {
      id,
      anchorNode,
      open: !!anchorNode,
      onClose: close
    }
  };
}
