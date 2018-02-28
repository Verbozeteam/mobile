/* @flow */

import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, AsyncStorage,
  SectionList } from 'react-native';
import { connect } from 'react-redux';

import { resetConfiguration } from '../actions/ConfigurationActions';
import { WebSocketCommunication } from '../js-api-utils/WebSocketCommunication';
import { ConfigManager } from '../js-api-utils/ConfigManager';

import ConfigureView from './ConfigureView';
import LinearGradient from 'react-native-linear-gradient';

import { Gradients, TypeFaces } from '../constants/styles';

type ListElementType = {
  title: string,
  action: () => void
};

type PropsType = {
  navigation: Object,

  users_name: string,
  resetConfiguration: () => null
};

type StateType = {
  sections: Array<{data: Array<ListElementType>}>
};

const mapStateToProps = (state: Object) => {
  return {
    users_name: state.configuration.users_name
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    resetConfiguration: () => dispatch(resetConfiguration())
  };
};

class SettingsView extends Component<PropsType, StateType> {

  state = {
    sections: []
  };

  componentWillMount() {
    const { navigation, users_name } = this.props;

    const sections = [
      {
        data: [
          {
            key: 'users_name',
            title: users_name,
            action: () => navigation.navigate('ChangeName')
          }
        ]
      }, {
        data: [
          {
            key: 'configure',
            title: 'Configure',
            action: () => navigation.navigate('Configure')
          }, {
            key: 'reset',
            title: 'Reset',
            action: this.reset.bind(this)
          }
        ]
      }
    ];

    this.setState({
      sections
    });
  }

  reset() {
    const { resetConfiguration } = this.props;

    /* reset Redux configurations state */
    resetConfiguration();

    /* reset WebSocket and disconnect */
    WebSocketCommunication.reset();

    /* reset configuration manager to remove config */
    ConfigManager.reset();

    /* reset user data stored locally */
    AsyncStorage.clear();
  }

  renderSectionHeader(something) {

    return <View style={styles.section_padding}></View>;
  }

  renderListItem(item: Object) {
    return <Button
      title={item.item.title}
      onPress={item.item.action} />
  }

  render() {
    const { navigation } = this.props;
    const { sections } = this.state;

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>

        <SafeAreaView>

          <SectionList renderItem={this.renderListItem.bind(this)}
            renderSectionHeader={this.renderSectionHeader.bind(this)}
            sections={sections} />

          </SafeAreaView>

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section_padding: {
    height: 50
  }
});

SettingsView = connect(mapStateToProps, mapDispatchToProps) (SettingsView);
export default SettingsView;
