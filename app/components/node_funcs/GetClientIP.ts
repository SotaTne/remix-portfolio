const getClientIp = (req: Request): string | null => {
  const headers = req.headers;

  // ヘッダーの順序でIPアドレスを取得
  const headerNames = [
    'cf-connecting-ip',
    'true-client-ip',
    'x-forwarded-for',
    'x-real-ip',
    'fastly-client-ip',
  ];

  for (const headerName of headerNames) {
    const headerValue = headers.get(headerName);
    if (headerValue != null) {
      if (headerName === 'x-forwarded-for') {
        // 複数のIPアドレスがカンマ区切りで含まれている場合があるので、最初のIPアドレスを取得
        const forwardedForArray = headerValue.split(',');
        if (forwardedForArray.length > 0 && forwardedForArray[0] != null) {
          return forwardedForArray[0].trim();
        }
      } else {
        return headerValue.trim();
      }
    }
  }

  // ローカル環境の場合のデフォルトIPアドレス取得
  const remoteAddress = headers.get('x-real-ip') || headers.get('x-forwarded-for') || '127.0.0.1';
  if (remoteAddress) {
    return remoteAddress.split(',')[0].trim();
  }

  return null;
};

export default getClientIp;
