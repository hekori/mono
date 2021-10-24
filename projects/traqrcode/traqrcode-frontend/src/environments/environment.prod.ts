export const environment = {
  production: true,
  stage: process.env.NX_STAGE ?? 'NX_STAGE',
  appName: process.env.NX_APP_NAME ?? 'NX_APP_NAME',
  frontendUrl: process.env.NX_FRONTEND_URL ?? 'NX_FRONTEND_URL',
  backendUrl: process.env.NX_BACKEND_URL ?? 'NX_BACKEND_URL',
  getAccessTokenLocalStorageKey: () =>
    `${environment.appName}--${environment.stage}--accessToken`,
}
