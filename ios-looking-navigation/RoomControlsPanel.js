/* @flow */

import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ToastAndroid, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
const configActions = require ('../actions/ConfigurationActions');

import PropTypes from 'prop-types';

import { ConfigManager } from '../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType } from '../js-api-utils/ConfigManager';

import { TypeFaces } from '../constants/styles';

import { PanelParams }      from './ControlButtons/Panel';
import RoomControlsHeader   from './RoomControlsHeader';
import RoomKey              from './ControlButtons/RoomKey';
import LightSwitch          from './ControlButtons/LightSwitch';
import LightDimmer          from './ControlButtons/LightDimmer';
import Curtain              from './ControlButtons/Curtain';
import RoomStatus           from './ControlButtons/RoomStatus';
import ClimateStatus        from './ControlButtons/ClimateStatus';
import ClimateControl       from './ControlButtons/ClimateControl';

const I18n = require('../js-api-utils/i18n/i18n');

type StateType = {
    cardIn: number,
};

type PropsType = {
    ids: Array<string>,
    width: number,
    height: number,
    setReduxCardIn: (b: boolean) => any,
};

type RenderedThing = {
    meta: ThingMetadataType,
    render: RenderedThing => Array<any>,
    blockSize: number,
}

type GroupType = {
    name: string,
    things: Array<RenderedThing>,
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        setReduxCardIn: (is_in: boolean) => {dispatch(configActions.set_room_card_in(is_in));},
    };
}

class RoomControlsPanelClass extends React.Component<PropsType, StateType>  {
    _unsubscribe: () => any = () => null;

    state: StateType = {
        cardIn: 1,
    };
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps: PropsType) {
        this._unsubscribe();
        if (newProps.ids) {
            for (var i = 0; i < newProps.ids.length; i++) {
                var id = newProps.ids[i];
                if (id in ConfigManager.thingMetas && ConfigManager.thingMetas[id].category === 'hotel_controls') {
                    this._unsubscribe = ConfigManager.registerThingStateChangeCallback(id, this.onRoomStatusChanged.bind(this));
                    if (id in ConfigManager.things)
                        this.onRoomStatusChanged(ConfigManager.thingMetas[id], ConfigManager.things[id]);
                }
            }
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    onRoomStatusChanged(meta: ThingMetadataType, roomStatusState: ThingStateType) {
        const { setReduxCardIn } = this.props;
        const { cardIn } = this.state;

        if ('card' in roomStatusState && roomStatusState.card !== cardIn) {
            setReduxCardIn(roomStatusState.card === 1);
            this.setState({cardIn: roomStatusState.card});
        }
    }


    getGroups(): Array<GroupType> {
        const { ids } = this.props;
        var filters = {
            dimmers: 'Lights',
            light_switches: 'Lights',
            curtains: 'Curtains',
            central_acs: 'Climate',
            split_acs: 'Climate',
            honeywell_thermostat_t7560: 'Climate',
            hotel_controls: 'Room Status',
            room_keys: 'Room Key',
        }

        var definitions = {
            'Room Key': {
                blockSize: [1],
                render: thing => [<RoomKey key={'thing-' + thing.meta.id} id={thing.meta.id} name={thing.meta.name} />]
            },
            'Lights': {
                blockSize: [1, 1],
                render: thing => [thing.meta.category == 'light_switches' ?
                    <LightSwitch key={'thing-' + thing.meta.id} id={thing.meta.id} name={thing.meta.name} /> :
                    <LightDimmer key={'thing-' + thing.meta.id} id={thing.meta.id} name={thing.meta.name} />
                ]
            },
            'Curtains': {
                blockSize: [1, 1],
                render: thing => [
                    <Curtain key={'thing-'+thing.meta.id+'-open'} id={thing.meta.id} name={thing.meta.name} open={true} />,
                    <Curtain key={'thing-'+thing.meta.id+'-close'} id={thing.meta.id} name={thing.meta.name} open={false} />,
                ],
            },
            'Climate': {
                blockSize: [2, 1, 1],
                render:  thing => [
                    <ClimateStatus key={'thing-'+thing.meta.id+'-status'} id={thing.meta.id} name={thing.meta.name} />,
                    <ClimateControl key={'thing-'+thing.meta.id+'-cooler'} id={thing.meta.id} name={thing.meta.name} warmer={false} />,
                    <ClimateControl key={'thing-'+thing.meta.id+'-warmer'} id={thing.meta.id} name={thing.meta.name} warmer={true} />,
                ],
            },
            'Room Status': {
                blockSize: [2, 2],
                render:  thing => [
                    <RoomStatus key={'thing-'+thing.meta.id+'-hk'} id={thing.meta.id} name={thing.meta.name} propertyName={'room_service'} />,
                    <RoomStatus key={'thing-'+thing.meta.id+'-dnd'} id={thing.meta.id} name={thing.meta.name} propertyName={'do_not_disturb'} />,
                ],
            },
        };

        var groups = [];

        for (var i = 0; i < ids.length; i++) {
            if (ids[i] in ConfigManager.thingMetas) {
                var thingMeta = ConfigManager.thingMetas[ids[i]];
                if (thingMeta.category in filters) {
                    var groupName = filters[thingMeta.category];
                    var groupIndex = 0;
                    for (groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                        if (groups[groupIndex].name == groupName)
                            break;
                    }
                    if (groupIndex == groups.length)
                        groups.push({
                            name: groupName,
                            things: []
                        });
                    groups[groupIndex].things.push({
                        meta: thingMeta,
                        ...definitions[groupName],
                    });
                }
            }
        }

        return groups;
    }

    renderGroup(group: GroupType) {
        var blocksPerRow = PanelParams.getBlocksPerRow();
        var rows: Array<Array<RenderedThing>> = [[]];
        var curRowBlocks = 0;
        for (var i = 0; i < group.things.length; i++) {
            const thing = group.things[i];
            const panels = thing.render(thing);
            for (var p = 0; p < panels.length; p++) {
                const curPanelBlockSize = thing.blockSize[p];
                if (curRowBlocks + curPanelBlockSize > blocksPerRow) {
                    rows.push([]);
                    curRowBlocks = 0;
                }
                rows[rows.length-1].push(panels[p]);
                curRowBlocks += curPanelBlockSize;
            }
        }

        return (
            <View key={'group-' + group.name} style={groupStyles.container}>
                <Text style={groupStyles.headerText}>{I18n.t(group.name)}</Text>
                <View style={groupStyles.thingsContainer}>
                    {rows.map((rowPanels, index) =>
                        <View key={'group-'+group.name+'-'+index} style={[groupStyles.thingsContainerRow, I18n.r2l() ? {justifyContent: 'flex-end'} : {}]}>
                            {rowPanels}
                        </View>
                    )}
                </View>
            </View>
        );
    }

    render() {
        const { ids, width, height } = this.props;
        const { cardIn } = this.state;

        var groups = this.getGroups();

        return (
            <SafeAreaView style={styles.container}>
                <Image style={[styles.background, {width, height}]} resizeMode={"cover"} source={require('../assets/images/room-lights.png')} />
                <ScrollView style={[styles.container]}>
                    {<RoomControlsHeader />}
                    {cardIn !== 0 ? groups.map(g => this.renderGroup(g)) : null}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
    }
});

const groupStyles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 20,
    },
    headerText: {
        ...TypeFaces.regular,
        fontSize: 18,
        paddingLeft: 20,
        color: '#FFFFFF',
    },
    thingsContainer: {
        paddingLeft: 15,
        flexDirection: 'column',
    },
    thingsContainerRow: {
        flexDirection: 'row',
    }
});

const RoomControlsPanel = connect(mapStateToProps, mapDispatchToProps) (RoomControlsPanelClass);
export default RoomControlsPanel;
