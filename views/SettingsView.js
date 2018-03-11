/* @flow */

import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, SectionList,
  TouchableHighlight, Platform, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';

import LocalStorage from '../js-api-utils/LocalStorage';
import { WebSocketCommunication } from '../js-api-utils/WebSocketCommunication';
import { ConfigManager } from '../js-api-utils/ConfigManager';
import { resetConfiguration } from '../actions/ConfigurationActions';

import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Header } from 'react-navigation';

import ConfigureView from './ConfigureView';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from 'react-native-elements';

import { Colors, Gradients, TypeFaces } from '../constants/styles';

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
          }, {
            key: 'configure',
            title: 'Configure',
            action: () => navigation.navigate('Configure', {shouldNavigateToHome: true})
          }
        ]
      }, {
        data: [
          {
            key: 'reset',
            title: 'Reset',
            action: this.showResetAlert.bind(this)
          }
        ]
      }
    ];

    this.setState({
      sections
    });
  }

  reset() {
    console.log('Settings reset');
    const { resetConfiguration } = this.props;

    /* reset Redux configurations state */
    resetConfiguration();

    /* reset WebSocket and disconnect */
    WebSocketCommunication.reset();

    /* reset configuration manager to remove config */
    ConfigManager.reset();

    /* reset user data stored locally */
    LocalStorage.reset();
  }

  showResetAlert() {
    Alert.alert('Reset',
      'Are you sure you want to reset?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Reset', onPress: this.reset.bind(this), style: 'destructive'}
      ],
      {
        onDismiss: () => {}
      });
  }

  renderSectionHeader(something) {
    return <View style={styles.section_padding}></View>;
  }

  renderListItem(item: Object) {
    const wrapper_style = {};
    if (item.index === 0) {
      /* top margin as react-navigation header doesn't cause SafeAreaView to
       * be pushed down because it has position = absolute */
      wrapper_style.marginTop = Platform.OS === 'ios' ?
        Header.HEIGHT + ifIphoneX(24, 0) : 0;
    }

    /* reset button has unique styling */
    if (item.item.key === 'reset') {
      return (
        <ListItem key={'settings-list-item-' + item.item.key}
          title={item.item.title}
          containerStyle={[styles.list_item,
            {marginTop: Dimensions.get('screen').height/3}]}
          underlayColor={Colors.dark_gray}
          titleStyle={styles.reset_button_text}
          hideChevron={true}
          onPress={item.item.action} />
      );
    }

    return (
      <ListItem key={'settings-list-item-' + item.item.key}
        title={item.item.title}
        hideChevron={!('action' in item.item)}
        containerStyle={[styles.list_item, wrapper_style]}
        underlayColor={Colors.dark_gray}
        titleStyle={TypeFaces.regular}
        onPress={item.item.action} />
    );
  }

  render() {
    const { navigation } = this.props;
    const { sections } = this.state;

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>

        <SafeAreaView>

          <SectionList style={styles.section_list}
            renderItem={this.renderListItem.bind(this)}
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
  section_list: {
    height: '100%',
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    backgroundColor: Colors.blackish,
    marginTop: -1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.dark_gray,
    borderBottomColor: Colors.dark_gray
  },
  list_item_text: {
    flex: 1,
    color: Colors.white,
    ...TypeFaces.regular
  },
  reset_button_text: {
    ...TypeFaces.regular,
    color: Colors.red,
    textAlign: 'center'
  },
  section_padding: {
    height: 20
  }
});

SettingsView = connect(mapStateToProps, mapDispatchToProps) (SettingsView);
export default SettingsView;
