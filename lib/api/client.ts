export type ApiResponse<TData = unknown> = {
  status: number;
  code?: string;
  message?: string;
  data?: TData;
  error?: string;
  [key: string]: unknown;
};

type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  json?: unknown;
  body?: BodyInit | null;
};

export async function apiRequest<TData = unknown>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<TData>> {
  const { method = 'GET', headers, json, body } = options;

  const requestHeaders = new Headers(headers || {});
  const requestBody = json !== undefined ? JSON.stringify(json) : body;

  if (json !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  const response = await fetch(`/api${path}`, {
    method,
    headers: requestHeaders,
    body: requestBody,
  });

  const text = await response.text();
  let parsed: ApiResponse<TData> | null = null;

  if (text) {
    try {
      parsed = JSON.parse(text) as ApiResponse<TData>;
    } catch {
      parsed = null;
    }
  }

  if (parsed) {
    if (typeof parsed.status !== 'number') {
      parsed.status = response.status;
    }

    return parsed;
  }

  return {
    status: response.status,
    message: response.ok ? 'Success' : 'Request failed',
  };
}
