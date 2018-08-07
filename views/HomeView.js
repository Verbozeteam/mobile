/* @flow */

import React, { Component } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import WelcomeBanner from '../components/home/WelcomeBanner';
import RoomsSections from '../components/home/RoomsSection';
import QuickAccessSection from '../components/home/QuickAccessSection';
import LoadingOverlay from '../components/LoadingOverlay';

import { Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object,

  users_name: string,
  connection_status: 0 | 1 | 2
};

type StateType = {};

const mapStateToProps = (state: Object) => {
  return {
    users_name: state.configuration.users_name,
    connection_status: state.configuration.connection_status
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {};
};

class HomeView extends Component<PropsType, StateType> {

  render() {
    const { users_name, connection_status } = this.props;

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <SafeAreaView style={ styles.container }>
          <WelcomeBanner name={users_name}
            connectionStatus={connection_status} />
          <RoomsSections />
          <QuickAccessSection />
          <LoadingOverlay connectionStatus={connection_status}/>
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

HomeView = connect(mapStateToProps, mapDispatchToProps) (HomeView);
export default HomeView;
