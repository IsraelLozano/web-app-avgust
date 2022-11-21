export const environment = {
  production: true,
  sessionStorageKeys: {
    applicationState: 'Security.ApplicationState',
  },
  api: {
    urlAddress: 'http://localhost:5051/ws-core/api/',
    urlAddressSeguridad: 'http://localhost:5051/ws-seguridad/api/',
    controllers: {
      articulo: 'articulo',
      seguridad: 'security',
      prematricula: 'prematricula',
      reporte: 'reporte',
    },
  },
};
