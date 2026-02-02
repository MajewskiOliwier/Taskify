import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4200,
    allowedHosts: [
      'localhost',
      'test-taskify-frontend-lb-2028155531.us-east-1.elb.amazonaws.com'
      // '.execute-api.us-east-1.amazonaws.com'  // Permetti API Gateway
    ]
  }
});
