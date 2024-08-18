let fetch: typeof globalThis.fetch;

if (typeof window === 'undefined') {
  // Server-side environment (Node.js)
  fetch = require('node-fetch');
} else {
  // Client-side environment (browser)
  fetch = require('unfetch');
}

type Config = {
  baseUrl?: string;
};

export abstract class Base {
  private baseUrl: string;

  constructor(config: Config) {
    this.baseUrl = config.baseUrl || "https://nine-ad9w.onrender.com";
  }

  protected async invoke<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };
    const config = {
      ...options,
      headers,
    };
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(
          `HTTP error! status:${response.statusText} body:${JSON.stringify(errorBody)}`,
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}
