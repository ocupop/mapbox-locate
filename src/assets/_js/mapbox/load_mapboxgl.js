/* @flow */
import { API_URL_ORIGIN } from './config_production';
import { VERSION_GL_JS } from './constants';
import { getWindow } from './get_window';

const SCRIPT_ID = 'gl-js-script';

export const loadMapboxgl = () => {
  return new Promise((resolve, reject) => {
    const window = getWindow();
    const doc = window.document;
    if (doc.getElementById(SCRIPT_ID)) return resolve();
    const script = doc.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `${API_URL_ORIGIN}/mapbox-gl-js/v${VERSION_GL_JS}/mapbox-gl.js`;
    script.addEventListener('load', () => {
      resolve();
      if (process.env.DEPLOY_ENV !== 'production' && window.mapboxgl) {
        window.mapboxgl.config.API_URL = API_URL_ORIGIN;
      }
    });
    script.addEventListener('error', reject);
    doc.body.appendChild(script);
  });
};
