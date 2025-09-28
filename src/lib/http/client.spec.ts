import { BasicHttpClient, type HttpClient } from '@/lib/http/client';

describe('BasicHttpClient', () => {
  const testParams = () => ({
    p1: null,
    p2: undefined,
    p3: 123,
    p4: 'text',
    p5: true,
    p6: false,
  });

  let fetch: jest.Mock;
  let httpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    fetch = jest.fn();
    httpClient = jest.mocked(
      new BasicHttpClient('https://base-url.com', { 'x-custom': 'test' }, { fetch }),
    );
  });

  it('GET method should serialize params in url', async () => {
    await httpClient.fetch('GET', '/path', testParams());

    expect(fetch).toHaveBeenCalledWith(
      'https://base-url.com/path?p3=123&p4=text&p5=true&p6=false',
      {
        method: 'GET',
        body: null,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-custom': 'test',
        },
      },
    );
  });

  it('POST method should serialize params in body as json', async () => {
    await httpClient.fetch('POST', '/path', testParams());

    expect(fetch).toHaveBeenCalledWith('https://base-url.com/path', {
      method: 'POST',
      body: JSON.stringify(testParams()),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-custom': 'test',
      },
    });
  });

  it('Successful request should not return error', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const [error, result] = await httpClient.fetch('GET', '/path');

    expect(error).toBeNull();
    expect(result).toEqual({});
  });

  it('Failed json parsing should return error', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.reject(new Error('Parsing failed')),
    });

    const [error, result] = await httpClient.fetch('GET', '/path');

    expect(error?.message).toBe('Parsing failed');
    expect(result).toBeNull();
  });

  it('Failed request should return error', async () => {
    fetch.mockRejectedValue(new Error('Request failed'));

    const [error, result] = await httpClient.fetch('GET', '/path');

    expect(error?.message).toBe('Request failed');
    expect(result).toBeNull();
  });

  it('Response error should return error', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const [error, result] = await httpClient.fetch('GET', '/path');

    expect(error?.message).toBe('404 - Not Found');
    expect(result).toBeNull();
  });
});
