export function subscribeToProcessMessage(
  targetMessage: string,
  handler: () => unknown
): () => void {
  const listener = (message: string) => {
    if (message === targetMessage) {
      handler();
    }
  };

  process.on('message', listener);
  return () => process.off('message', listener);
}
