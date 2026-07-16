declare global {
  interface Window {
    __jamestreamPopupAllow?: boolean;
  }
}

export function openWindowSafely(
  url?: string | URL,
  target?: string,
  features?: string,
): WindowProxy | null {
  window.__jamestreamPopupAllow = true;
  try {
    return window.open(url, target, features);
  } finally {
    window.__jamestreamPopupAllow = false;
  }
}
