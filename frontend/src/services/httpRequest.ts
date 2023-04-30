export const API_BASE_URL = 'http://localhost:3000';

type Request = {
  url: string;
  method: string;
  data?: any;
  headers?: object;
};

export const httpRequest = async ({ url, method, data = null, headers = {} }: Request) => {
  const options: RequestInit = {
    method,
    headers: {
      ...headers,
    },
  };

  if (data instanceof FormData) {
    options.body = data;
  } else if (data) {
    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}/${url}`, options);

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  return await response.json();
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

export const postMultiPart = (
  url: string,
  data: FormData | undefined = undefined,
  headers: object | undefined = undefined,
) =>
  httpRequest({
    url: url,
    method: 'POST',
    data: data,
    headers: headers,
  });

export const putMultiPart = (
  url: string,
  data: FormData | undefined = undefined,
  headers: object | undefined = undefined,
) =>
  httpRequest({
    url: url,
    method: 'PUT',
    data: data,
    headers: headers,
  });
