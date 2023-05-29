import ResponseError from '../types/ResponseError';

export const API_BASE_URL = 'http://localhost:3000';

type Request = {
  url: string;
  method: string;
  data?: any;
  headers?: object;
};

export type AuthHeader = {
  Authorization?: string;
  'x-refresh-token'?: string;
};

const httpRequest = async ({ url, method, data = null, headers = {} }: Request) => {
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
    let errorMessage: string;

    try {
      const body = await response.json();

      errorMessage = body?.message ?? 'An error occurred. Please try again later.';
    } catch (e: any) {
      errorMessage = `An error occurred: ${response.statusText}`;
    }

    throw new ResponseError(errorMessage);
  }

  return await response.json();
};

const get = (url: string, headers: object | undefined = undefined) =>
  httpRequest({
    url: url,
    method: 'GET',
    data: null,
    headers: headers,
  });

const post = (url: string, data: object | undefined = undefined, headers: object | undefined = undefined) =>
  httpRequest({
    url: url,
    method: 'POST',
    data: data,
    headers: headers,
  });

const put = (url: string, data: object | undefined = undefined, headers: object | undefined = undefined) =>
  httpRequest({
    url: url,
    method: 'PUT',
    data: data,
    headers: headers,
  });

const deleteRequest = (url: string, headers: object | undefined = undefined) =>
  httpRequest({
    url: url,
    method: 'DELETE',
    data: null,
    headers: headers,
  });

const postMultiPart = (url: string, data: FormData | undefined = undefined, headers: object | undefined = undefined) =>
  httpRequest({
    url: url,
    method: 'POST',
    data: data,
    headers: headers,
  });

const putMultiPart = (url: string, data: FormData | undefined = undefined, headers: object | undefined = undefined) =>
  httpRequest({
    url: url,
    method: 'PUT',
    data: data,
    headers: headers,
  });

const createAuthClient = (thunkApi: any) => {
  const { token, refreshToken } = thunkApi.getState().auth.userData;
  let authHeader: AuthHeader = {};

  if (token) {
    authHeader = {
      Authorization: `Bearer ${token}`,
    };
  }

  if (refreshToken) {
    authHeader = {
      ...authHeader,
      'x-refresh-token': refreshToken,
    };
  }

  const getWithAuth = (url: string, headers: object | undefined = undefined) => get(url, { ...headers, ...authHeader });
  const postWithAuth = (url: string, data: object | undefined = undefined, headers: object | undefined = undefined) =>
    post(url, data, { ...headers, ...authHeader });
  const putWithAuth = (url: string, data: object | undefined = undefined, headers: object | undefined = undefined) =>
    put(url, data, { ...headers, ...authHeader });
  const deleteWithAuth = (url: string, headers: object | undefined = undefined) =>
    deleteRequest(url, { ...headers, ...authHeader });
  const postMultiPartWithAuth = (
    url: string,
    data: FormData | undefined = undefined,
    headers: object | undefined = undefined,
  ) => postMultiPart(url, data, { ...authHeader, ...headers });

  const putMultiPartWithAuth = (
    url: string,
    data: FormData | undefined = undefined,
    headers: object | undefined = undefined,
  ) => putMultiPart(url, data, { ...authHeader, ...headers });

  return {
    get: getWithAuth,
    post: postWithAuth,
    put: putWithAuth,
    deleteRequest: deleteWithAuth,
    postMultiPart: postMultiPartWithAuth,
    putMultiPart: putMultiPartWithAuth,
  };
};

export default createAuthClient;
