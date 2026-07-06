import { useState, useEffect, useCallback } from 'react';

const MASTER_SYNC_URL = 'https://ruralopstools.com/sync';
const MASTER_ORIGIN = 'https://ruralopstools.com';

export function useMasterPins(toolId: string) {
  const [isPinned, setIsPinned] = useState(false);
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Programmatically inject hidden iframe
    const iframe = document.createElement('iframe');
    iframe.src = MASTER_SYNC_URL;
    iframe.style.display = 'none';
    iframe.title = 'Master Sync Bridge';
    document.body.appendChild(iframe);
    setIframeRef(iframe);

    // Cleanly listen for cross-origin messages
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== MASTER_ORIGIN) return;

      try {
        const { type, payload } = event.data;
        if (type === 'SYNC_READY') {
          setIsReady(true);
          iframe.contentWindow?.postMessage({ type: 'GET_PINS', payload: { toolId } }, MASTER_ORIGIN);
        } else if (type === 'PINS_DATA') {
          setIsPinned(payload.includes(toolId));
        } else if (type === 'PIN_UPDATED') {
          setIsPinned(payload.isPinned);
        }
      } catch (error) {
        console.error('Error processing cross-origin message:', error);
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup iframe DOM element and event listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };
  }, [toolId]);

  const pinTool = useCallback(() => {
    if (!isReady || !iframeRef?.contentWindow) return;
    iframeRef.contentWindow.postMessage({ type: 'PIN_TOOL', payload: { toolId } }, MASTER_ORIGIN);
    setIsPinned(true);
  }, [isReady, iframeRef, toolId]);

  const unpinTool = useCallback(() => {
    if (!isReady || !iframeRef?.contentWindow) return;
    iframeRef.contentWindow.postMessage({ type: 'UNPIN_TOOL', payload: { toolId } }, MASTER_ORIGIN);
    setIsPinned(false);
  }, [isReady, iframeRef, toolId]);

  return { isPinned, pinTool, unpinTool, isReady };
}
