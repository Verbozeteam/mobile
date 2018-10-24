/* @flow */

import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../js-api-utils/i18n/i18n';
import { TypeFaces, Colors } from '../constants/styles';

import DigitalClock from './DigitalClock';

type StateType = {
};

type PropsType = {
    reduxRoomStatus: Object,
};

function mapStateToProps(state) {
    return {
        reduxRoomStatus: state.configuration.roomStatus,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class RoomControlsHeaderClass extends React.Component<PropsType, StateType> {
    render() {
        const { reduxRoomStatus } = this.props;

        var welcomeView = (
            <View key={'welcome-view'} style={{flex: 1}}>
                <Text style={styles.welcomeText}>{I18n.t("Welcome")}</Text>
            </View>
        );

        var timeView = (
            null
            // <View key={'time-view'} style={{flex: 1}}>
            //     <DigitalClock
            //         extraTimeStyle={{textAlign: I18n.l2r() ? 'right' : 'left', color: '#FFFFFF', fontSize: 32,}}
            //         extraDateStyle={{textAlign: I18n.l2r() ? 'right' : 'left'}} />
            // </View>
        );

        return (
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    {I18n.l2r() ? [welcomeView, timeView] : [timeView, welcomeView]}
                </View>
                {reduxRoomStatus.temperature !== null && reduxRoomStatus.temperature !== undefined ?
                    <Text style={styles.comment}>{I18n.t("The temperature in the room is") + " " + reduxRoomStatus.temperature.toFixed(1) + " °C"}</Text>
                : null}
                {(reduxRoomStatus.cardIn === 0 || reduxRoomStatus.cardIn === false) ?
                    <Text style={[styles.warning, {color: Colors.red}]}>{I18n.t("Please insert the room's key card")}</Text>
                : null}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        flexDirection: 'column',
        marginBottom: 80,
    },
    headingContainer: {
        flexDirection: 'row',
    },
    welcomeText: {
        ...TypeFaces.regular,
        fontSize: 38,
        marginBottom: 10,
        color: '#FFFFFF',
    },
    comment: {
        ...TypeFaces.regular,
        fontSize: 24,
        color: '#FFFFFF',
    },
    warning: {
        ...TypeFaces.regular,
        fontSize: 24,
    }
});

const RoomControlsHeader = connect(mapStateToProps, mapDispatchToProps) (RoomControlsHeaderClass);
export default RoomControlsHeader;
