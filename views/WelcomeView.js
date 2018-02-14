/* @flow */

import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Platform, LayoutAnimation,
  UIManager } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Colors, Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object
};

type StateType = {
  name: string,
  animation_stage: number
};

export default class WelcomeView extends Component<PropsType, StateType> {

  _logo: number = require('../assets/images/logo/verboze_logo.png');
  _animation_start_delay: number = 2500;
  _animation_duration: number = 1000;

  static defaultProps = {

  };

  state = {
    name: '',
    animation_stage: 0
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    setTimeout(() => this.animateLogo(), this._animation_start_delay);
  }

  animateLogo() {
    LayoutAnimation.configureNext({
      duration: this._animation_duration,
      update: {
        type: 'easeInEaseOut'
      }
    }, () => this.animateInput());

    this.setState({
      animation_stage: 1
    });
  }

  animateInput() {
    LayoutAnimation.configureNext({
      duration: this._animation_duration / 2,
      create: {
        type: 'easeInEaseOut',
        property: 'opacity'
      }
    });

    this.setState({
      animation_stage: 2
    });
  }

  _renderInput() {
    const { navigation } = this.props;

    return (
      <View>
        <Text style={TypeFaces.centered_header}>Welcome</Text>
        <View style={styles.input_container}>
          <TextInput style={styles.input}
            placeholderTextColor={Colors.light_gray}
            autoFocus={true}
            autoCapitalize={'words'}
            returnKeyType={'next'}
            onSubmitEditing={() => navigation.navigate('Configure')}
            keyboardAppearance={'dark'}
            placeholder={'your name'} />
        </View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;

    var flex_height: number = 0;
    if (this.state.animation_stage > 0) {
      flex_height = 2;
    }

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <View style={styles.logo_container}>
          <Image style={styles.logo}
            source={this._logo} resizeMode={'contain'} />
        </View>
        <View style={{flex: flex_height}}>
          {(this.state.animation_stage == 2) ? this._renderInput() : null}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {

  },
  input_container: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 2
  },
  input: {
    color: Colors.white,
    fontSize: 27,
    textAlign: 'center',
    fontFamily: 'CeraPRO-Medium',
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
})
