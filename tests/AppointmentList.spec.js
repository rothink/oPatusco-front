import {mount} from '@vue/test-utils';
import AppointmentList from '@/pages/appointment/AppointmentList.vue';
import {createStore} from 'vuex';
import {createVuetify} from 'vuetify'; // Importa diretamente o Vuetify
import 'vuetify/styles'; // Importa estilos do Vuetify
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

describe('AppointmentList.vue', () => {
  it('renders the list of appointments', () => {
    const store = createStore({
      getters: {
        user: () => ({
          id: 1,
          name: 'Test User',
          role: 'recepcionista',
        }),
      },
    });

    const vuetify = createVuetify({
      components,
      directives,
    });

    const wrapper = mount(AppointmentList, {
      global: {
        plugins: [store, vuetify],
      },
    });

    expect(wrapper.text()).toContain('Nome do Cliente');
  });
});
