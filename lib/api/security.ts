import { NextApiRequest } from 'next';

// 單一 key（例如 login:1.2.3.4）在記憶體中的狀態
// count: 目前窗口內的請求次數
// resetAt: 這個窗口何時重置（unix ms）
type RateLimitEntry = {
  count: number;
  resetAt: number;
};

// rate-limit 檢查結果
// allowed: 這次請求是否允許通過
// retryAfterSeconds: 若被擋，還要等幾秒
type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

// 呼叫 checkRateLimit 時要傳入的參數
// key: 限流鍵（通常由路由 + IP 組成）
// limit: 允許次數上限
// windowMs: 時間窗口（毫秒）
type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

// 以 Map 當作記憶體限流儲存
// key -> RateLimitEntry
type RateLimitStore = Map<string, RateLimitEntry>;

// 把 store 掛在 globalThis，避免 dev hot reload 時資料被重建
const globalAny = globalThis as typeof globalThis & {
  __apiRateLimitStore?: RateLimitStore;
};

const store: RateLimitStore = globalAny.__apiRateLimitStore ?? (globalAny.__apiRateLimitStore = new Map<string, RateLimitEntry>());

// 從 request 取出 client IP
// 1) 優先 x-forwarded-for（代理/雲平台常見）
// 2) 再 fallback 到 socket remoteAddress
// 3) 最後保底 unknown
export function getClientIp(req: NextApiRequest): string {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0];
  }

  return req.socket?.remoteAddress || 'unknown';
}

// 固定窗口（fixed window）記憶體限流
// 同一個 key 在 windowMs 內最多 limit 次
export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  // 第一次請求，或已超過窗口重置時間：重新開始計數
  if (!existing || now >= existing.resetAt) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  // 已達上限：拒絕，並回傳還需等待秒數
  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  // 尚未達上限：累加次數並允許通過
  existing.count += 1;
  store.set(key, existing);

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}
