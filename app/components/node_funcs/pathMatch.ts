export function isOriginMatching(request: Request): boolean {
  const referer = request.headers.get('referer');
  const origin = request.headers.get('origin');
  let host = '';

  // Originがnullの場合、refererから取得
  let requestOrigin = origin;
  if (referer !== null) {
    try {
      const refererUrl = new URL(referer);
      host = refererUrl.host;
      if (requestOrigin === null && referer !== null) {
        requestOrigin = refererUrl.origin;
      }
    } catch (error) {
      console.error('Error parsing referer URL:', error);
      return false;
    }
  }

  // 現在のリクエストURLのオリジンを取得
  const currentUrl = new URL(request.url);
  const currentOrigin = currentUrl.origin;

  return requestOrigin === currentOrigin && request.headers.get('host') === host;
}

export function isNearPathMatching(request: Request): boolean {
  const referer = request.headers.get('referer');
  let origin = request.headers.get('origin');
  let isRefererValid = false;

  // Originがnullの場合、refererから取得
  if (origin === null && referer !== null) {
    try {
      const refererUrl = new URL(referer);
      origin = refererUrl.origin;
    } catch (error) {
      console.error('Error parsing referer URL:', error);
    }
  }

  if (referer !== null && origin !== null) {
    const refererUrl = new URL(referer);
    const refererBasePath = refererUrl.pathname;
    isRefererValid =
      origin + refererBasePath === `${origin}/contact` &&
      request.headers.get('host') === refererUrl.host;
  }

  return isRefererValid;
}
