export function isLowerCase(c: string) {
  if (c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 122) {
    return true;
  }
  return false;
}
