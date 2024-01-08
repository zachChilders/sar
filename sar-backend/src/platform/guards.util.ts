/**
 * Utilities for generating assertion errors, primarily used as type guards.
 * @see monorepo/GUIDELINES.md
 * @example `thisShouldBeTruthy ?? nullish()`
 */

// `function` is required for type narrowing when called as a statement instead of expression.
/* eslint-disable func-style */

/**
 * A runtime assertion caused by an invalid assumption, signifying a bug in the code and therefore must never
 * be caught.
 */
class AssertionError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

class UnreachableError extends AssertionError {
  override readonly name = 'Unreachable';
  constructor(expectation: string, description?: string) {
    super(description ? `${expectation}: ${description}` : expectation);
    this.name = 'Unreachable';
  }
}

export function unreachable(expectation: string): never {
  throw new UnreachableError(expectation);
}

export function nullish(description?: string): never {
  throw new UnreachableError('Unexpected nullish value', description);
}
