/* eslint-disable func-style */

class AssertionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * Guard against unreachable code paths.
 */
export function unreachable(message?: string): never {
  throw new AssertionError(`Unreachable${message && `: ${message}`}`);
}
