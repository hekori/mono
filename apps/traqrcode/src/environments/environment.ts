// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  stage: process.env.NX_STAGE ?? 'NX_STAGE',
  appName: process.env.NX_APP_NAME ?? 'NX_APP_NAME',
  frontendUrl: process.env.NX_FRONTEND_URL ?? 'NX_FRONTEND_URL',
  backendUrl: process.env.NX_BACKEND_URL ?? 'NX_BACKEND_URL',
  getAccessTokenLocalStorageKey: () =>
    `${environment.appName}--${environment.stage}--accessToken`,
}
