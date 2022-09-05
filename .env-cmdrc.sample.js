module.exports = {
  local: {
    HOST: '0.0.0.0',
    PORT: '3000',
    NODE_ENV: 'dev',
  },
  dev: {
    NODE_ENV: 'dev',
    DOMAIN_NAME: '',
    CERTIFICATE_ARN: '',
    NUXT_TELEMETRY_DISABLED: '1',
  },
  prod: {
    NODE_ENV: 'prod',
    DOMAIN_NAME: '',
    CERTIFICATE_ARN: '',
    NUXT_TELEMETRY_DISABLED: '1',
  },
}
