export default function url() {
  const environment = process.env.NEXT_PUBLIC_VERCEL_ENV;
  const isProduction = environment === 'production';
  const isStaging = environment === 'staging';
  const protocol = isProduction || isStaging ? 'https' : 'http';

  const domain =
    process.env.NEXT_PUBLIC_VERCEL_URL != null
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : 'localhost:3000';

  if (!isProduction && domain == 'localhost:3000') {
    return `${protocol}://${domain}`;
  }

  const urlObject = new URL(`${protocol}://${domain}`);
  const hostnameSplit = urlObject.hostname.split('.');
  const subdomain = hostnameSplit[0] != null ? hostnameSplit[0].split('-')[0] : '';
  const secondLevelDomain = hostnameSplit[1];
  const topLevelDomain = hostnameSplit[2];

  const finalDomain = `${subdomain}.${secondLevelDomain}.${topLevelDomain}`;
  return `${protocol}://${finalDomain}`;
}
