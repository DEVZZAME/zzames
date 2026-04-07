module.exports = {
  apps: [
    {
      name: "zzames",
      script: "npm",
      args: "start",
      cwd: "/var/www/zzames",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
