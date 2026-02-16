module.exports = {
  apps: [
    {
      name: 'btl-website',
      cwd: '/opt/btl-website-11feb26',
      script: 'node_modules/.bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 6005,
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
