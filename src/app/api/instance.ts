type Params = { [key in string]: string | number | null | boolean };
type DataParams =
  | { [key in string]: string | number | null | Blob | FormData | boolean | string[] }
  | Blob
  | FormData;

const baseurl = 'http://127.0.0.1:3001';

const fetchMethod = async (
  url: string,
  method: string,
  data: { data?: DataParams; params?: Params },
  headers?: object
) => {
  let params = '';

  const paramsObj = data.params;
  if (paramsObj) {
    params = '?';
    Object.keys(paramsObj).forEach((key, index, arr) => {
      params += `${key}=${paramsObj[key]}${index === arr.length - 1 ? '' : '&'}`;
    });
  }
  const targetUrl = url.startsWith('http') ? url : `${baseurl}${url}`;
  const result = await fetch(targetUrl + params, {
    method: method,
    body: JSON.stringify(data.data),

    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  if (result.status >= 200 && result.status < 400) {
    return result;
  }
  throw { status: result.status, message: await result.json() };
};
export const get = async <T>(
  url: string,
  params?: Params,
  headers?: object,
  config?: {
    isNativeData?: boolean;
    userServer1?: boolean;
  }
) => {
  const result = await fetchMethod(url, 'GET', { params }, headers);
  if (result.status >= 400) {
    throw {
      status: result.status,
      message: await result.json(),
    };
  }
  return result.json() as T;
};

export const post = async <T>(
  url: string,
  params: { data?: DataParams; params?: Params },
  headers?: object
) => {
  const result = await fetchMethod(url, 'POST', params, headers);
  return (await result.json()) as T;
};
