/* @flow */

import * as React from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import I18n from '../../js-api-utils/i18n/i18n';

type StateType = {
};

type PropsType = {
    active?: boolean | number,
    onPress?: ?(() => any),
    onPressIn?: ?(() => any),
    onPressOut?: ?(() => any),
    children?: ?any,
    blocks?: ?number,
    style?: ?any,
};

class Panel extends React.Component<PropsType, StateType> {
    static defaultProps = {
        blocks: 1,
    };

    render() {
        const { children, active, onPress, onPressIn, onPressOut, style } = this.props;
        var { blocks } = this.props;

        if (!blocks) blocks = 1;

        var panelSize = PanelParams.getPanelSize();
        var panelStyle = [[styles.panel, active ? styles.active : {}, {height: panelSize, width: panelSize * blocks + (10*(blocks-1))}, I18n.r2l() ? {alignItems: 'flex-end'} : {}, style]];

        if (onPress || onPressIn || onPressOut) {
            return (
                <TouchableOpacity activeOpacity={0.5} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={panelStyle}>
                    {children}
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={panelStyle}>
                    {children}
                </View>
            );
        }
    }
};

class PanelParamsClass {
    _dimensions: ?{width: number, height: number} = undefined;
    _panelSize: ?number = undefined;
    _blocksPerRow: ?number = undefined;

    _computeDimensions() {
        this._dimensions = {
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height
        };
    }

    getPanelSize() {
        if (this._panelSize !== undefined) return this._panelSize;
        if (this._dimensions === undefined) this._computeDimensions();
        const generalMargin = 30; /* general 15 margin on either side of screen */
        const panelMargin = 10; /* 5 on either side */
        const targetPanelSize = 150 + panelMargin;
        var quotient = Math.floor((this._dimensions.width - generalMargin) / targetPanelSize);
        var remainder = (this._dimensions.width - generalMargin) % targetPanelSize;
        // distribute the remained on the panels to have no remainder left
        this._panelSize = Math.floor((targetPanelSize + (remainder / quotient)) - panelMargin);
        return this._panelSize;
    }

    getBlocksPerRow() {
        if (this._blocksPerRow) return this._blocksPerRow;
        if (this._panelSize === undefined) this.getPanelSize();
        this._blocksPerRow = Math.floor(this._dimensions.width / this._panelSize);
        return this._blocksPerRow;
    }
};

const PanelParams = new PanelParamsClass();

module.exports = {
    Panel,
    PanelParams,
};

const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        margin: 5,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#999999',
        opacity: 0.85,
    },
    active: {
        opacity: 1,
        backgroundColor: '#FFFFFF',
    }
});
