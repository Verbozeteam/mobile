export const dummy_config = {
  config: {
    rooms: [
      {
        id: 'room-1',
        name: 'Living Room',
        groups: [
          {
            id: 'group-1',
            name: 'Lights',
            things: [
              {
                id: 'lightswitch-1',
                name: 'Bitch light',
                category: 'light_switches',
              }, {
                id: 'dimmer-1',
                name: 'Table lamp',
                category: 'dimmers'
              }, {
                id: 'lightswitch-2',
                name: 'Reading light',
                category: 'light_switches'
              }, {
                id: 'lightswitch-3',
                name: 'Ceiling light',
                category: 'light_switches'
              }
            ]
          },
          {
            id: 'group-2',
            name: 'Thermostat',
            things: [
              {
                id: 'ac-1',
                category: 'central_acs',
                name: 'Thermostat'
              }
            ]
          },
          {
            id: 'group-3',
            name: 'Curtains',
            things: [
              {
                id: 'curtain-1',
                category: 'curtains',
                name: 'Curtain'
              },
              {
                id: 'shade-1',
                category: 'curtains',
                name: 'Shade'
              }
            ]
          }
        ]
      }
    ],
    translations: {

    }
  }
};
