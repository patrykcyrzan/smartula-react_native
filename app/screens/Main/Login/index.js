/**
 * Created by Patryk on 01.07.2017.
 */
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    Button,
    TouchableOpacity,
    Animated, Keyboard, KeyboardAvoidingView
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

const { width, height } = Dimensions.get("window");

import * as session from '../../../services/session';
import * as api from '../../../services/api';
//import * as DeviceEventEmitter from "react-native";

const background = require("./login1_bg.png");
const logo = require("./login1_mark.png");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

export const IMAGE_HEIGHT = width / 2;
export const IMAGE_HEIGHT_SMALL = width / 5;

export default class LoginScreen extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            getCurrentRoutes: PropTypes.func,
            jumpTo: PropTypes.func,
        }),
    }

    constructor(props) {
        super(props);

        this.initialState = {
            isLoading: false,
            error: null,
            username: 'user1@facebook.com',
            password: '12345678',
        };
        this.state = this.initialState;

        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
        console.log("keyboardWillShow");
    }

    onPressLogin() {
        this.setState({
            isLoading: true,
            error: '',
        });
        //dismissKeyboard();

        session.authenticate(this.state.username, this.state.password)
            .then(() => {
                this.setState(this.initialState);
                //const routeStack = this.props.navigator.getCurrentRoutes();
                this.props.navigation.navigate('Main');
            })
            .catch((exception) => {
                // Displays only the first error message
                const error = api.exceptionExtractError(exception);
                alert(error);
                this.setState({
                    isLoading: false,
                    ...(error ? { error } : {}),
                });

                if (!error) {
                    throw exception;
                }
            });
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardDidShow = (event) => {
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: IMAGE_HEIGHT_SMALL,
        }).start();

        this.setState({
            keyboardHeight: new Animated.Value(event.endCoordinates.height),
        });
    };

    keyboardDidHide = (event) => {

        Animated.parallel([
            Animated.timing(this.state.keyboardHeight, {
                toValue: 0,
            }),
            Animated.timing(this.imageHeight, {
                toValue: IMAGE_HEIGHT,
            }),
        ]).start();
    };

    /*onPressBack() {
        const routeStack = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(routeStack[0]);
    }*/

    render() {
        return (
            <Image source={background} style={styles.background} resizeMode="cover">
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior="padding"
                    >
                            <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                                </View>
                                <TextInput
                                    placeholder="Nazwa"
                                    placeholderTextColor="#FFF"
                                    style={styles.input}
                                    onChangeText={username => this.setState({username})}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                                </View>
                                <TextInput
                                    placeholderTextColor="#FFF"
                                    placeholder="Hasło"
                                    style={styles.input}
                                    onChangeText={password => this.setState({password})}
                                    secureTextEntry
                                />
                            </View>
                            <TouchableOpacity activeOpacity={.5}>
                                <View style={styles.button}>
                                    <Button
                                        style={styles.buttonText}
                                        styleDisabled={{color: 'red'}}
                                        title="Zaloguj się"
                                        onPress={() => {
                                            console.log('onPress'+this.state.username);
                                            console.log('onPress'+this.state.password);
                                            this.onPressLogin()
                                            }
                                        }
                                        />
                                </View>
                            </TouchableOpacity>
                    </KeyboardAvoidingView>
            </Image>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    markWrap: {
        flex: 1,
        paddingVertical: 30,
    },
    logo: {
        height: IMAGE_HEIGHT,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    background: {
        width,
        height,
    },
    inputWrap: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 5,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        width: window.width - 30,
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
    },
    button: {
        backgroundColor: "#FF3366",/*
        paddingVertical: 20,*/
        width: window.width - 30,
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    }
});