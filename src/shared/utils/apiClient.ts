const BASE_URL = `${window.location.origin}${window.location.pathname}`;

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // to give impression that products are loading from API
  // and to show loader
  return wait(200)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url),
};
