/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import store from '../store'
import VuePapaParse from 'vue-papa-parse'


export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(store)
    .use(VuePapaParse)
}
