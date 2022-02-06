export import path = require('path')

export const SSL_PRIVATE_KEY_PATH = process.env.SSL_PRIVATE_KEY_PATH || ''
export const SSL_PUBLIC_CERT_PATH = process.env.SSL_PUBLIC_CERT_PATH || ''
export const PROJECT_DIR = path.dirname(path.dirname(path.dirname(__dirname)))
export const STORE_DIR = path.join(PROJECT_DIR, 'store')
export const STATIC_DIR = path.join(PROJECT_DIR, 'packages', 'frontend', 'dist')

export const PORT: number = parseInt(process.env.PORT || '80')
export const SSL_PORT: number = parseInt(process.env.SSL_PORT || '443')

export const PGUSER = process.env.PGUSER || ''
export const PGHOST = process.env.PGHOST || ''
export const PGDATABASE = process.env.PGDATABASE || ''
export const PGPASSWORD = process.env.PGPASSWORD || ''
export const PGPORT = parseInt(process.env.PGPORT ?? '5432')

export const FRONTEND_URL = process.env.NX_FRONTEND_URL
export const BACKEND_URL = process.env.NX_BACKEND_URL
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

export const EMAIL_DEFAULT_SENDER =
  process.env.EMAIL_DEFAULT_SENDER || 'traqrcode@hekori.com'

// send emails via an SMTP server (tested with gmail)
export const SMTP_HOST = process.env.SMTP_HOST || ''
export const SMTP_PORT = process.env.SMTP_PORT || ''
export const SMTP_USER = process.env.SMTP_USER || ''
export const SMTP_PASS = process.env.SMTP_PASS || ''

// send emails directly from the server
// The DKIM_*** variables are ignored if SMTP_HOST is defined.
export const DKIM_DOMAIN_NAME = process.env.DKIM_DOMAIN_NAME
export const DKIM_PRIVATE_KEY = process.env.DKIM_PRIVATE_KEY
