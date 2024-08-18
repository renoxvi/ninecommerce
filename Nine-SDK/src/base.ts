//Switches between unfetch & node-fetch for client & server.
import fetch from "isomorphic-unfetch";

type Config = {
  baseUrl?: string;
};

export abstract class Base {
  private baseUrl: string;

  constructor(config: Config) {
    this.baseUrl = config.baseUrl || "https://nine-ad9w.onrender.com";
  }
  //change to async
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
          `HTTP error! status:${response.statusText} body:${errorBody}`,
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}