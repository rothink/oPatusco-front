// tests/setup/vuetifySetup.js
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

export default function createVuetifyInstance() {
  return createVuetify({
    components,
    directives,
  });
}
