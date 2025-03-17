export function formatStr(str?: string, length = 4) {
  if (!str) return null;
  return `${str.slice(0, length)}…${str.slice(-length)}`;
}
