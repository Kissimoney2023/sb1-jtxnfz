export class AudioError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'AudioError';
  }
}

export class ApiKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiKeyError';
  }
}