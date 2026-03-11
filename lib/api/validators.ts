export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USERNAME_REGEX = /^(?=.*[A-Za-z])[A-Za-z0-9_]+$/;
export const PASSWORD_MIN_LENGTH = 8;
export const MAX_TABS_PER_PHOTO = 10;
export const MAX_TAB_LENGTH = 30;

export function parseRequestBody(body: unknown): Record<string, any> {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body || '{}');
    } catch {
      return {};
    }
  }

  if (body && typeof body === 'object') {
    return body as Record<string, any>;
  }

  return {};
}

export function getTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= PASSWORD_MIN_LENGTH;
}

export function isValidUsername(userName: string): boolean {
  return USERNAME_REGEX.test(userName);
}
