import { BasicHttpClient } from '@/lib/http/client';

describe('BasicHttpClient', () => {
  const testParams = () => ({
    p1: null,
    p2: undefined,
    p3: 123,
    p4: 'text',
    p5: true,
    p6: false,
  });

  it('GET method should serialize params in url', async () => {
    const fetch = jest.fn();
    const httpClient = jest.mocked(
      new BasicHttpClient('https://base-url.com', { 'x-custom': 'test' }, { fetch }),
    );

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
    const fetch = jest.fn();
    const httpClient = jest.mocked(
      new BasicHttpClient('https://base-url.com', { 'x-custom': 'test' }, { fetch }),
    );

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
});
