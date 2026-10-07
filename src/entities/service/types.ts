export type ServiceStatus = 'success' | 'warning' | 'error';

export interface GatewayService {
  id: number;
  name: string;
  path: string;
  targetUrl: string;
  status: ServiceStatus;
  uptime: string;
  latency: string;
  rateLimit: number;
}

export interface GatewayLog {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  status: number;
  latency: string;
  clientIp: string;
}

export interface GatewaySettings {
  rateLimitPerMin: number;
  requestTimeoutMs: number;
  corsAllowedOrigins: string;
  cacheTtlSeconds: number;
  enableCircuitBreaker: boolean;
  enableDebugLogs: boolean;
}
