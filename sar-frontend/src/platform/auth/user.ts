import { Self } from "services";

/**
 * A user of the application.
 */
export class User {
  constructor(private readonly self: Self) { }

  get email(): string {
    return this.self.email;
  }

  get name(): string {
    return [this.self.firstName, this.self.lastName].join(" ");
  }

  get sessionId(): string | undefined {
    return document.cookie.match(/ai_session=([^;]+)/)?.[1]?.split("|")[0];
  }

  toRecord(): Record<string, unknown> {
    const getters = Object.fromEntries(
      Object.entries(Object.getOwnPropertyDescriptors(User.prototype))
        .filter(([_, value]) => !value.writable)
        .map(([key]) => [key, this[key as keyof User]]),
    );

    return { ...getters, ...this };
  }
}
