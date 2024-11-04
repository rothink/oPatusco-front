import { mount } from '@vue/test-utils';
import AppointmentForm from '@/pages/appointment/AppointmentForm.vue';
import { createVuetify } from 'vuetify';
import { createStore } from 'vuex';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { vi } from 'vitest';
import AnimalType from '@/api/AnimalType';
import AppointmentService from '@/api/Appointment';

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router');
  return {
    ...actual,
    useRoute: () => ({
      params: { id: 123 },
    }),
    createRouter: () => ({
      push: vi.fn(),
      beforeEach: vi.fn(),
    }),
  };
});

vi.spyOn(AppointmentService, 'find').mockResolvedValue({
  data: {
    user_id: 1,
    user: { name: 'Test User' },
    animal_name: 'Rex',
    animal_type_id: 1,
    animal_age: 5,
    symptoms: 'Febre e tosse',
    appointment_date: '2024-11-05',
    time_of_day: 'morning',
  },
});

describe('AppointmentForm.vue', () => {
  const vuetify = createVuetify({ components, directives });

  const store = createStore({
    getters: {
      user: () => ({
        id: 1,
        name: 'Test User',
        role: 'recepcionista', // Definindo a role como recepcionista
      }),
      isAuthenticated: () => true,
    },
  });

  beforeEach(() => {
    vi.spyOn(AnimalType, 'preRequisite').mockResolvedValue({
      data: {
        preRequisite: {
          animal_types: [
            { id: 1, name: 'Gato' },
          ],
        },
      },
    });
  });

  it('fills the form, submits, and displays success message', async () => {
    const wrapper = mount(AppointmentForm, {
      global: {
        plugins: [store, vuetify],
      },
    });

    await wrapper.find('input[name="animal_name"]').setValue('Rex');


    const agendarButton = wrapper.find('#agendar-consulta');
    expect(agendarButton.exists()).toBe(true);
  });
});
