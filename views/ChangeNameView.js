/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { setUsersName } from '../actions/ConfigurationActions';

import LinearGradient from 'react-native-linear-gradient';

import { Gradients, TypeFaces } from '../constants/styles';

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

  render() {
    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>

        <SafeAreaView style={styles.container}>
        <Text>Change Name</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

ChangeNameView = connect(mapStateToProps, mapDispatchToProps) (ChangeNameView);
export default ChangeNameView;
