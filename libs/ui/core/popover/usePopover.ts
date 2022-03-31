import { useCallback, useMemo, useState } from 'react';

export interface UsePopoverParams {
  id: string;
  disabled?: boolean;
}

export type PopoverState = ReturnType<typeof usePopover>;

export function usePopover({ id, disabled }: UsePopoverParams) {
  const [anchorNode, setAnchorNode] = useState<HTMLElement | null>(null);
  const handleClick = useCallback(e => setAnchorNode(e.currentTarget), []);
  const close = useCallback(() => setAnchorNode(null), []);
  const open = useCallback((target: HTMLElement) => setAnchorNode(target), []);

  return useMemo(
    () => ({
      expanded: !!anchorNode,
      close,
      open,
      triggerProps: {
        'aria-controls': anchorNode ? id : void 0,
        onClick: disabled ? void 0 : handleClick,
        'aria-haspopup': true
      },
      popoverProps: {
        id,
        anchorNode,
        open: !!anchorNode && !disabled,
        onClose: close
      }
    }),
    [id, close, handleClick, disabled, anchorNode]
  );
}
