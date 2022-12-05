export const environment = {
  production: true,
  sessionStorageKeys: {
    applicationState: 'Security.ApplicationState',
    personaEstudianteInstitucion: 'Security.KeyEis',
  },
  api: {
    urlAddress: 'http://181.224.227.242:5051/ws-core/api/',
    urlAddressSeguridad: 'http://181.224.227.242:5051/ws-seguridad/api/',
    controllers: {
      articulo: 'articulo',
      seguridad: 'security',
      prematricula: 'prematricula',
      reporte: 'reporte',
      file: 'file',
      maestra: 'maestra',
    },
  },
};
