import type { GatewayService, GatewayLog, GatewaySettings } from './types';

export const INITIAL_SERVICES: GatewayService[] = [
  { id: 1, name: 'Auth Service', path: '/api/v1/auth', targetUrl: 'http://auth-cluster.internal:4001', status: 'success', uptime: '99.9%', latency: '12ms', rateLimit: 5000 },
  { id: 2, name: 'Payment Gateway', path: '/api/v1/payments', targetUrl: 'http://pay-cluster.internal:4002', status: 'success', uptime: '99.5%', latency: '85ms', rateLimit: 2000 },
  { id: 3, name: 'User Management', path: '/api/v1/users', targetUrl: 'http://users-cluster.internal:4003', status: 'warning', uptime: '98.2%', latency: '32ms', rateLimit: 3000 },
  { id: 4, name: 'Inventory API', path: '/api/v1/stock', targetUrl: 'http://stock-cluster.internal:4004', status: 'error', uptime: '45.0%', latency: '-', rateLimit: 1000 },
  { id: 5, name: 'Notification Service', path: '/api/v1/notifications', targetUrl: 'http://notify-cluster.internal:4005', status: 'success', uptime: '99.8%', latency: '18ms', rateLimit: 4000 },
];

export const INITIAL_LOGS: GatewayLog[] = [
  { id: 'log-101', timestamp: '12:45:02', method: 'GET', path: '/api/v1/auth/verify', status: 200, latency: '11ms', clientIp: '192.168.1.45' },
  { id: 'log-102', timestamp: '12:45:01', method: 'POST', path: '/api/v1/payments/checkout', status: 201, latency: '89ms', clientIp: '172.16.0.12' },
  { id: 'log-103', timestamp: '12:44:59', method: 'GET', path: '/api/v1/users/me', status: 200, latency: '28ms', clientIp: '192.168.1.99' },
  { id: 'log-104', timestamp: '12:44:55', method: 'GET', path: '/api/v1/stock/items/492', status: 503, latency: '1205ms', clientIp: '10.0.4.15' },
  { id: 'log-105', timestamp: '12:44:48', method: 'POST', path: '/api/v1/notifications/push', status: 200, latency: '15ms', clientIp: '172.16.0.12' },
  { id: 'log-106', timestamp: '12:44:42', method: 'GET', path: '/api/v1/auth/session', status: 401, latency: '14ms', clientIp: '192.168.2.100' },
  { id: 'log-107', timestamp: '12:44:38', method: 'DELETE', path: '/api/v1/users/12/token', status: 204, latency: '35ms', clientIp: '192.168.1.99' },
];

export const INITIAL_SETTINGS: GatewaySettings = {
  rateLimitPerMin: 10000,
  requestTimeoutMs: 5000,
  corsAllowedOrigins: '*',
  cacheTtlSeconds: 60,
  enableCircuitBreaker: true,
  enableDebugLogs: false,
};
