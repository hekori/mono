export import path = require('path')

export const SSL_PRIVATE_KEY_PATH = process.env.SSL_PRIVATE_KEY_PATH || ''
export const SSL_PUBLIC_CERT_PATH = process.env.SSL_PUBLIC_CERT_PATH || ''
export const PROJECT_DIR = path.dirname(path.dirname(path.dirname(__dirname)))
export const STORE_DIR = path.join(PROJECT_DIR, 'store')
export const STATIC_DIR = path.join(PROJECT_DIR, 'packages', 'frontend', 'dist')
export const EMAIL_DEFAULT_SENDER =
  process.env.EMAIL_DEFAULT_SENDER || 'traqrcode@hekori.com'
export const SMTP_HOST = process.env.SMTP_HOST || ''
export const SMTP_PORT = process.env.SMTP_PORT || ''
export const SMTP_USER = process.env.SMTP_USER || ''
export const SMTP_PASS = process.env.SMTP_PASS || ''
export const PORT: number = parseInt(process.env.PORT || '80')
export const SSL_PORT: number = parseInt(process.env.SSL_PORT || '443')
