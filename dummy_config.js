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
              }, {
                id: 'lightswitch-4',
                name: 'Back light',
                category: 'light_switches'
              }, {
                id: 'lightswitch-5',
                name: 'Back light',
                category: 'light_switches'
              }, {
                id: 'lightswitch-6',
                name: 'Back light best light ever fituri is a beast',
                category: 'light_switches'
              }, {
                id: 'dimmer-2',
                name: 'Side Table Lamp',
                category: 'dimmers'
              }
            ],
            presets: [
              {
                'lightswitch-1': {
                  intensity: 1
                },
                'lightswitch-2': {
                  intensity: 1
                },
                'lightswitch-3': {
                  intensity: 1
                },
                'lightswitch-4': {
                  intensity: 0
                },
                'lightswitch-5': {
                  intensity: 0
                },
                'lightswitch-6': {
                  intensity: 0
                },
                'dimmer-1': {
                  intensity: 50
                },
                'dimmer-2': {
                  intensity: 100
                },
              },
              {
                'lightswitch-1': {
                  intensity: 0
                },
                'lightswitch-2': {
                  intensity: 0
                },
                'lightswitch-3': {
                  intensity: 0
                },
                'lightswitch-4': {
                  intensity: 0
                },
                'lightswitch-5': {
                  intensity: 0
                },
                'lightswitch-6': {
                  intensity: 0
                },
                'dimmer-1': {
                  intensity: 0
                },
                'dimmer-2': {
                  intensity: 0
                },
              },
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
      }, {
        id: 'room-2',
        name: 'Bedroom',
        groups: []
      }, {
        id: 'room-3',
        name: 'Kitchen',
        groups: []
      }, {
        id: 'room-4',
        name: 'Bathroom',
        groups: []
      }, {
        id: 'room-5',
        name: 'Bedroom',
        groups: []
      }, {
        id: 'room-6',
        name: 'Guest Room',
        groups: []
      }
    ],
    translations: {

    }
  }
};
