/**
 * Escapes HTML special characters to prevent XSS when injecting user input into HTML.
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Strips newlines and carriage returns to prevent email header injection.
 */
export function sanitizeEmailHeader(value: string): string {
  return value.replace(/[\r\n]/g, ' ').trim();
}
