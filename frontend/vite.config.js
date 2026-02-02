import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4200,
    allowedHosts: [
      'localhost',
      '.elb.amazonaws.com',  // Permetti tutti gli host AWS ELB
      '.execute-api.us-east-1.amazonaws.com'  // Permetti API Gateway
    ]
  }
});
