const API_BASE_URL = 'http://localhost:3000/';

type Request = {
  url: string;
  method: string;
  data?: any;
  headers?: object;
};

export const httpRequest = async ({ url, method, data = null, headers = {} }: Request) => {
  try {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${API_BASE_URL}${url}`, options);

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      return await response.json();
    } catch (error: unknown) {
      console.error('Error while fetching data:', error);
      return {};
    }
  } catch (e) {
    console.error(e);
  }
};

export const get = (url: string, headers: object | undefined = undefined) =>
  httpRequest({
    url: url,
    method: 'GET',
    data: null,
    headers: headers,
  });

export const post = (url: string, data: object | undefined = undefined, headers: object | undefined = undefined) =>
  httpRequest({
    url: url,
    method: 'POST',
    data: data,
    headers: headers,
  });

export const put = (url: string, data: object | undefined = undefined, headers: object | undefined = undefined) =>
  httpRequest({
    url: url,
    method: 'PUT',
    data: data,
    headers: headers,
  });
