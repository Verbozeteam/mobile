/* @flow */

import React, { Component } from 'react';
import { AsyncStorage, Animated, Dimensions, Image, View, Text, TextInput,
  SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { setUsersName } from '../actions/ConfigurationActions';

import LinearGradient from 'react-native-linear-gradient';

import { Colors, Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object,
  users_name: string,

  setUsersName: (users_name: string) => null
};

type StateType = {
  show_welcome_input: boolean
};

const mapStateToProps = (state: Object) => {
  return {};
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setUsersName: (users_name: string) =>
      dispatch(setUsersName(users_name))
  };
};

class WelcomeView extends Component<PropsType, StateType> {

  _logo: number = require('../assets/images/logo/verboze_logo.png')
  _animation_delay: number = 500;
  _animation_duration: number = 1500;

  _welcome_input_flex: Object;
  _welcome_input_opacity: Object;

  state = {
    show_welcome_input: false
  };

  componentWillMount() {
    /* initialize animation variables */
    this._welcome_input_flex = new Animated.Value(0);
    this._welcome_input_opacity = new Animated.Value(0);
  }

  componentDidMount() {
    /* begin animation sequence by animating logo */
    this.animateLogo();
  }

  animateLogo() {
    /* animate logo to move up by increasing flex value of view below,
      animation occurs after some initial delay */
    Animated.timing(this._welcome_input_flex, {
      toValue: 2,
      duration: this._animation_duration / 2,
      delay: this._animation_delay
    }).start(() => this.animateWelcomeAndInput())
  }

  animateWelcomeAndInput() {
    /* show welcome and input view so keyboard autofocus applies */
    this.setState({
      show_welcome_input: true
    });

    /* animate welcome and input view to fade in */
    Animated.timing(this._welcome_input_opacity, {
      toValue: 1,
      duration: this._animation_duration / 2
    }).start();
  }

  submitName(evt: Object) {
    const { navigation, setUsersName } = this.props;

    const users_name = evt.nativeEvent.text;

    /* save name to AsyncStorage */
    try {
      AsyncStorage.setItem('users_name', users_name, () => {
        setUsersName(users_name);
        navigation.navigate('Configure');
      });
    } catch (err) {
      console.error(err);
    }
  }

  renderWelcomeAndInput() {
    const { show_welcome_input } = this.state;

    const flex = this._welcome_input_flex;
    const opacity = this._welcome_input_opacity;

    var content = null;
    if (show_welcome_input) {
      content = (
        <Animated.View style={{opacity}}>
          <Text style={TypeFaces.centered_header}>Welcome</Text>
          <TextInput style={styles.name_input}
            autoFocus={true}
            autoCapitalize={'words'}
            autoCorrect={false}
            spellCheck={false}
            placeholder={'your name'}
            placeholderTextColor={Colors.light_gray}
            underlineColorAndroid={'transparent'}
            disableFullscreenUI={true}
            keyboardAppearance={'dark'}
            returnKeyType={'next'}
            onSubmitEditing={this.submitName.bind(this)} />
        </Animated.View>
      )
    }

    return (
      <Animated.View style={[styles.welcome_input_container, {flex}]}>
        {content}
      </Animated.View>
    );
  }

  renderLogo() {
    return (
      <View style={styles.logo_container}>
        <Image source={this._logo}
          resizeMode={'contain'} />
      </View>
    )
  }

  render() {
    const { navigation } = this.props;

    // TODO: height and width are set to prevent keyboard popping views up
    // when keyboard shows, this needs to be handled better for smaller screens
    const { height, width } = Dimensions.get('screen');

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          {this.renderLogo()}
          {this.renderWelcomeAndInput()}
        </SafeAreaView>
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
  welcome_input_container: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20
  },
  name_input: {
    ...TypeFaces.centered_large_input,
    marginTop: 20,
    width: '100%',
    height: 55,
    color: Colors.white,
    backgroundColor: Colors.transparent_white
  }
});

WelcomeView = connect(mapStateToProps, mapDispatchToProps) (WelcomeView);
export default WelcomeView;
