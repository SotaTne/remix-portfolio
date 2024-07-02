//in this file, basically you must write as functional programming

export const ClsxTranslator = (input: string): string[] => {
  return input.replace(/\s+/g, ' ').trim().split(' ');
};

export const CheckList = (checkStr: string, input: string[]): string[] => {
  checkStr = checkStr.replace(/\s+/g, '').trim();
  return input.filter((item) => item !== checkStr);
};

export const escapeHTML = (inHtml: string): string =>
  inHtml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, ":'")
    .replace(/"/g, '&quot;');
