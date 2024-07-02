export const generateUUIDv4: () => string = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .split('')
    .map((value) =>
      value == 'y'
        ? (Math.floor(Math.random() * 4) + 8).toString(16)
        : value == 'x'
          ? Math.floor(Math.random() * 16).toString(16)
          : value,
    )
    .join('');
