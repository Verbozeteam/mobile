/* @flow */

import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { TabBarBottomBlur } from '../navigation/components/TabBarBottomBlur';

import { ConfigManager } from '../js-api-utils/ConfigManager';
import type { GroupType, ThingMetadataType, ConfigType } from '../js-api-utils/ConfigManager';
import { Colors, TypeFaces } from '../constants/styles';

const I18n = require('../js-api-utils/i18n/i18n');

import SettingsStack from '../navigation/SettingsStack';
import RoomControlsPanel from './RoomControlsPanel';
import AmenitiesPanel from './AmenitiesPanel';

import FadeInView from './FadeInView';

type StateType = {
    groups: Array<GroupType>,
    currentPage: number,
};

type IconType = {
    passive: number,
    active: number,
}

type PageType = {
    name: string,
    icon: IconType,
    background: number,
    render: (w: number, h: number) => (Object => any),
    viewName: any,
    things: Array<ThingMetadataType>,
};

export default class MainNavigator extends React.Component<any, StateType> {
    _unsubscribe: () => any = () => null;

    state = {
        groups: [],
        currentPage: 0,
    };

    _backgrounds = {
        /*'dimmers': require('../assets/images/room-lights.png'),
        'light_switches': require('../assets/images/bathroom-lights2.png'),
        'curtains': require('../assets/images/curtain_back.jpg'),
        'hotel_controls': require('../assets/images/services_stack.jpg'),
        'central_acs': require('../assets/images/thermostat_stack.jpg'),
        'honeywell_thermostat_t7560': require('../assets/images/thermostat_stack.jpg'),
        'alarm_system': require('../assets/images/alarms_background.jpg'),
        'settings': require('../assets/images/verboze_poster.jpg'),*/
    };

    _icons = {
        room: {
            passive: require('../assets/images/icons/bed.png'),
            active: require('../assets/images/icons/bed_on.png'),
        },
        amenities: {
            passive: require('../assets/images/icons/bell.png'),
            active: require('../assets/images/icons/bell_on.png'),
        },
        alarms: {
            passive: require('../assets/images/icons/alarm.png'),
            active: require('../assets/images/icons/alarm_on.png'),
        },
        telephone: {
            passive: require('../assets/images/icons/telephone.png'),
            active: require('../assets/images/icons/telephone_on.png'),
        },
        settings: {
            passive: require('../assets/images/icons/cog.png'),
            active: require('../assets/images/icons/cog_on.png'),
        },
    };

    _last_settings_click = new Date();
    _num_settings_clicks = 0;

    componentWillMount() {
        this._unsubscribe = ConfigManager.registerConfigChangeCallback(this.onConfigChanged.bind(this));
        if (ConfigManager.config)
            this.onConfigChanged(ConfigManager.config);
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    onConfigChanged(config: ConfigType) {
        const { groups } = this.state;

        if (config && config.rooms) {
            var newGroups = [];
            for (var r = 0; r < config.rooms.length; r++) {
                var room = config.rooms[r];
                newGroups = newGroups.concat(room.groups);
            }

            if (JSON.stringify(newGroups) != JSON.stringify(groups)) {
                this.setState({groups: newGroups, currentPage: 0});
            }
        }
    }

    getPages(): Array<PageType> {
        const { groups } = this.state;
        var pages = [];
        var roomThings = [];
        for (var i = 0; i < groups.length; i++) {
            for (var j = 0; j < groups[i].things.length; j++) {
                const thing = groups[i].things[j];
                switch (thing.category) {
                    case 'light_switches':
                    case 'dimmers':
                    case 'central_acs':
                    case 'split_acs':
                    case 'curtains':
                    case 'hotel_controls':
                    case 'honeywell_thermostat_t7560':
                    case 'room_keys':
                        roomThings.push(thing);
                        break;
                    case 'alarm_system':
                        /** Not supported on phone */
                        break;
                    case 'telephone':
                        /** Not supported on phone */
                        break;
                    case 'hotel_orders':
                        pages.push({
                            name: 'Amenities',
                            icon: this._icons.amenities,
                            background: this._backgrounds.hotel_controls,
                            things: [thing],
                            viewName: 'AmenitiesPanel',
                            render: (w, h) => (props => <AmenitiesPanel {...props} id={thing.id} />)
                        });
                        break;
                }
            }
        }

        if (roomThings.length > 0)
            pages = [{
                name: 'Room',
                icon: this._icons.room,
                background: this._backgrounds.dimmers,
                things: roomThings,
                viewName: 'RoomControlsPanel',
                render: (w, h) => (props => <RoomControlsPanel {...props} ids={roomThings.map(t => t.id)} />)
            }].concat(pages);
        pages.push({
            name: 'Settings',
            icon: this._icons.settings,
            background: this._backgrounds.settings,
            things: [],
            viewName: 'SettingsStack',
            render: (w, h) => SettingsStack
        });

        return pages;
    }

    render() {
        var pages = this.getPages();

        const w = 100;
        const h = 100;

        var structure = {};
        for (var p = 0; p < pages.length; p++) {
            const page = pages[p];
            structure[page.viewName] = {
                screen: page.render(w, h),
                navigationOptions: {
                    tabBarIcon: (state: {focused: boolean}) => (
                        <Image style={styles.tabbar_icon}
                            source={(state.focused) ? page.icon.active : page.icon.passive} />
                    ),
                    tabBarLabel: page.name,
                    title: page.name,
                },
            }
        }

        const options = {
            lazy: true,
            initialRouteName: Object.keys(structure)[0],
            tabBarPosition: 'bottom',
            tabBarComponent: TabBarBottomBlur,
            tabBarOptions: {
                showIcon: true,
                activeTintColor: Colors.white,
                inactiveTintColor: Colors.gray,
                labelStyle: TypeFaces.ios_tabbar_label,
                indicatorStyle: {
                    backgroundColor: Colors.red
                },
                style: {
                    height: 60,
                    backgroundColor: Colors.blackish,
                },
            }
        };

        const Navigator = TabNavigator(structure, options);

        return <Navigator />;
    }
};

const styles = StyleSheet.create({
    tabbar_icon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    }
});

