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
    TouchableOpacity
} from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import SplashScreen from 'react-native-splash-screen'

const { width, height } = Dimensions.get("window");

import * as session from '../../../services/session';
import * as api from '../../../services/api';

const background = require("./login1_bg.png");
const mark = require("./login1_mark.png");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

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
    }

    onPressLogin() {
        this.setState({
            isLoading: true,
            error: '',
        });
        dismissKeyboard();

        session.authenticate(this.state.username, this.state.password)
            .then(() => {
                console.log("jumpTO");
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
        SplashScreen.hide()
    }

    onPressBack() {
        const routeStack = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(routeStack[0]);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={background} style={styles.background} resizeMode="cover">
                    <View style={styles.markWrap}>
                        <Image source={mark} style={styles.mark} resizeMode="contain" />
                    </View>
                    <View style={styles.wrapper}>
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
                    </View>
                </Image>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    markWrap: {
        flex: 1,
        paddingVertical: 30,
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    background: {
        width,
        height,
    },
    wrapper: {
        paddingVertical: 30,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
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
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#FF3366",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5,
    }
});