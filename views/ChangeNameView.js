/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { connect } from 'react-redux';

import { setUsersName } from '../actions/ConfigurationActions';

import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Header } from 'react-navigation';

import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from 'react-native-elements';

import { Colors, Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object,

  users_name: string,
  setUsersName: (users_name: string) => void
};

type StateType = {};

const mapStateToProps = (state: Object) => {
  return {
    users_name: state.configuration.users_name
  };
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setUsersName: (users_name: string) =>
      dispatch(setUsersName(users_name))
  };
};

class ChangeNameView extends Component<PropsType, StateType> {

  changeName(users_name: string) {
    const { setUsersName } = this.props;

    // setUsersName(users_name);
  }

  render() {
    const { users_name } = this.props;

    /* top margin as react-navigation header doesn't cause SafeAreaView to
     * be pushed down because it has position = absolute */
    const top_margin = Platform.OS === 'ios' ?
      Header.HEIGHT + ifIphoneX(24, 0) : 0;

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>

        <SafeAreaView style={styles.container}>
          <View style={{height: top_margin}} />

          <ListItem textInput={true}
            hideChevron={true}
            containerStyle={styles.name_input}
            textInputContainerStyle={{height: '100%', width: '100%'}}
            textInputStyle={TypeFaces.regular}
            textInputValue={users_name}
            textInputPlaceholder={'Your name'}
            textInputAutoCapitalize={'words'}
            textInputAutoCorrect={false}
            textInputAutoFocus={true}
            textInputOnChangeText={this.changeName.bind(this)}
            textInputReturnKeyType={'done'} />
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name_input: {
    height: 55,
    backgroundColor: Colors.blackish,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.dark_gray,
    borderBottomColor: Colors.dark_gray
  }
});

ChangeNameView = connect(mapStateToProps, mapDispatchToProps) (ChangeNameView);
export default ChangeNameView;
