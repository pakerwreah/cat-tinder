export type ResultSuccess<S> = readonly [error: null, data: S];
export type ResultFailure<E> = readonly [error: E, data: null];
export type Result<Success, Failure = Error> = ResultSuccess<Success> | ResultFailure<Failure>;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpClient {
  fetch<T>(
    method: HttpMethod,
    path: string,
    params?: Record<string, any>,
    init?: RequestInit,
  ): Promise<Result<T>>;
}

export class BasicHttpClient implements HttpClient {
  private fetchClient: GlobalFetch;
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string, headers: Record<string, string>, fetchClient = { fetch }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.fetchClient = fetchClient;
  }

  async fetch<T>(
    method: HttpMethod,
    path: string,
    params: Record<string, any> = {},
    init?: RequestInit,
  ): Promise<Result<T>> {
    try {
      let url = `${this.baseUrl}/${path.replace(/^\//g, '')}`;

      if (method === 'GET') {
        const query = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
          if (value !== null && value !== undefined) {
            query.append(key, value);
          }
        }
        const queryString = query.toString();
        if (queryString.length > 0) {
          url += `?${queryString}`;
        }
      }

      const response = await this.fetchClient.fetch(url, {
        ...init,
        method,
        body: method !== 'GET' ? JSON.stringify(params) : null,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...this.headers,
          ...init?.headers,
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      return [null, result];
    } catch (e) {
      return [e as Error, null];
    }
  }
}
