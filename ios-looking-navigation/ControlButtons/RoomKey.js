/* @flow */

import * as React from 'react';

import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType } from '../../js-api-utils/ConfigManager';

import { Panel } from './Panel';

import { TypeFaces, Colors } from '../../constants/styles';

const I18n = require('../../js-api-utils/i18n/i18n');

type StateType = {
    locjk: number,
};

type PropsType = {
    id: ?string,
    name: string,
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

class RoomKeyClass extends React.Component<PropsType, StateType> {
    _unsubscribe: () => any = () => null;

    state = {
        lock: 0,
    };

    _locked = require('../../assets/images/icons/locked.png');
    _unlocked = require('../../assets/images/icons/unlocked.png');

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps: PropsType) {
        this._unsubscribe();
        if (newProps.id) {
            this._unsubscribe = ConfigManager.registerThingStateChangeCallback(newProps.id, this.onLockChanged.bind(this));
            if (newProps.id && newProps.id in ConfigManager.things)
                this.onLockChanged(ConfigManager.thingMetas[newProps.id], ConfigManager.things[newProps.id]);
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    onLockChanged(meta: ThingMetadataType, lockState: ThingStateType) {
        const { lock } = this.state;

        var total_change = {};
        if (lockState.lock !== lock)
            total_change.lock = lockState.lock;

        if (Object.keys(total_change).length > 0)
            this.setState(total_change);
    }

    changeLock(lock: number) {
        if (this.props.id) {
            ConfigManager.setThingState(this.props.id, {lock}, true);
        }
    }

    render() {
        const { id, name } = this.props;
        const { lock } = this.state;

        var isLocked = lock == 1;
        var isActive = !isLocked;

        return (
            <Panel active={isActive} onPress={() => this.changeLock(1 - lock)}>
                <Image style={styles.icon} source={isLocked ? this._locked : this._unlocked} />
                <View style={I18n.l2r() ? styles.texts : styles.texts_r2l}>
                    <Text style={[styles.name, isActive ? TypeFaces.bold : {}]}>{I18n.t(name)}</Text>
                    <Text style={[styles.info, isActive ? {color: Colors.red} : {}]}>{I18n.t(isLocked ? "Locked" : "Unlocked")}</Text>
                </View>
            </Panel>
        );
    }
};


const styles = StyleSheet.create({
    icon: {
        width: 40,
        height: 40,
    },
    texts: {
        position: 'absolute',
        left: 10,
        bottom: 10,
    },
    texts_r2l: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    name: {
        ...TypeFaces.light,
        fontSize: 17,
        height: 54,
        color: '#000000',
    },
    info: {
        ...TypeFaces.light,
        fontSize: 17,
        color: '#000000',
    },
});

const RoomKey = connect(mapStateToProps, mapDispatchToProps) (RoomKeyClass);
export default RoomKey;
