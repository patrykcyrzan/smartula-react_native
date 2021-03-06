/**
 * Created by Patryk on 01.07.2017.
 */
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Animated, Keyboard, KeyboardAvoidingView
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { Button, Text } from 'native-base'

const { width, height } = Dimensions.get("window");

import * as session from '../../../services/session';
import * as api from '../../../services/api';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Spinner from "../../../components/Spinner";
//import * as DeviceEventEmitter from "react-native";

const background = require("./meadow.jpg");
const logo = require("./logo.png");
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
            username: 'tymons',
            password: '43210',
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
                <View style={{flex: 0}}>
                    {this.state.isLoading ? (<Spinner
                        visible={true}
                        />):(<View/>)}
                </View>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior="padding"
                    >
                            <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <Icon size={20} name="user" color="#616161"/>
                                </View>
                                <TextInput
                                    placeholder="Użytkownik"
                                    placeholderTextColor="#616161"
                                    style={styles.input}
                                    onChangeText={username => this.setState({username})}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <Icon size={20} name="key" color="#616161"/>
                                </View>
                                <TextInput
                                    placeholderTextColor="#616161"
                                    placeholder="Hasło"
                                    style={styles.input}
                                    onChangeText={password => this.setState({password})}
                                    secureTextEntry
                                />
                            </View>
                            <TouchableOpacity activeOpacity={.5}>
                                <View style={styles.button}>
                                    <Button
                                        style={styles.loginButton}
                                        rounded={true}
                                        onPress={() => {
                                            console.log('onPress'+this.state.username);
                                            console.log('onPress'+this.state.password);
                                            this.onPressLogin()
                                            }
                                        }
                                        >
                                        <Text style={styles.loginText}>Zaloguj</Text>
                                    </Button>
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
        backgroundColor:'rgba(255, 255, 255, 0.7)',
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
        fontFamily: 'Raleway-SemiBold',
    },
    loginButton: {
        backgroundColor: "#FFE066",/*
        paddingVertical: 20,*/
        marginTop: 30,
    },
    loginText: {
        color: "#616161",
        fontSize: 15,
        fontFamily: 'Raleway-SemiBold',
    }
});