import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    TouchableHighlight, View,
    StyleSheet, Animated,
    Dimensions, Text, Easing, Platform,
    BackHandler
} from "react-native";
import { NavigationActions } from 'react-navigation'
import CustomIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from "react-redux";
import NavigatorService from '../../../services/navigator';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const DEFAULT_WINDOW_MULTIPLIER = 0.20;
export const DEFAULT_NAVBAR_HEIGHT = 50;
export const windowHeight = SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER;

const mapStateToProps = state => ({
    dashboardStackNavigation: state.header,
    navigation: state.headerNav
})

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(0),
            leftElement: 'pentagon-outline',
            spinValue: new Animated.Value(0),
            isMenu: true,
            tab: 'DashboardTab',
            stack: null,
            goBack: null,
        };
    }

    onMenuPressed = () => {

    }

    renderNavBarTitle() {
        this.state.scrollY = this.props.dashboardStackNavigation.event;

        return (
            <Animated.View
                style={{
                    opacity: this.state.scrollY.interpolate({
                        inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.9],
                        outputRange: [0, 0, 1]
                    }),
                    backgroundColor: 'transparent'
                }}
            >
                <Text style={[styles.text, {
                    fontSize: 25,
                    fontFamily: 'Raleway-SemiBold',
                    color: '#CDD5DF'
                }]}>SMARTULA</Text>
            </Animated.View>
        );
    }

    /*componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            console.log("BACK")
            /!*if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
                this.navigator.pop();
                return true;
            }*!/
            return false;
        });
    }

    // some more code

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {
            console.log("BACK")
            /!*if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
                this.navigator.pop();
                return true;
            }*!/
            return false;
        });
    }*/

    componentDidUpdate(){
        const {dashboardStackNavigation, dashboardTabNavigation} = this.props.navigation;
        /*console.log("NAvBarUpdate")
        console.log(dashboardStackNavigation);
        console.log(dashboardTabNavigation);
        console.log("-----------")*/

        if(dashboardTabNavigation.dispatch !== "undefined" && this.state.goBack === null){
            this.setState({goBack: dashboardTabNavigation})
        }

        if(!dashboardStackNavigation || !dashboardTabNavigation){
            return
        }

        if(dashboardTabNavigation.state.routeName === 'Dashboard' && dashboardStackNavigation.routeName !== 'Dashboard' && this.state.leftElement === 'pentagon-outline'){
            console.log("should rotate")
            this.animate({toValue: 0, leftElement: 'arrow-left'});
        }

        if(this.state.leftElement === 'arrow-left' && dashboardStackNavigation.routeName === 'Dashboard'){
            console.log("should rotate2")
            this.animate({toValue: 1, leftElement: 'pentagon-outline'});
        }

    }

    componentWillMount() {

    }

    onClick() {
        const {dashboardStackNavigation, dashboardTabNavigation} = this.props.navigation;
        //console.log(dashboardStackNavigation);
        //console.log(dashboardTabNavigation);
        console.log(this.props)

        if(!dashboardStackNavigation){
            return;
        } else if (dashboardStackNavigation.routeName !== 'Dashboard'){
            if(this.state.goBack !== "undefined"){
                //console.log("BACK")
                //console.log(this.state)
                //console.log(dashboardTabNavigation)
                this.state.goBack.dispatch(NavigationActions.back())
            }
        } else {
            this.props.screenProps.rootNavigation.navigate('DrawerOpen')
        }
        //this.props.navigation.event.dispatch(NavigationActions.back())
        //this.props.navigation.event.navigate('AllHives')
    }

    animate = ({ toValue, leftElement }) => {
        Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.setState({ leftElement });

            Animated.timing(this.state.spinValue, {
                toValue,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: Platform.OS === 'android',
            }).start();
        });
    }

    render() {
        const { leftElement, spinValue } = this.state;
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '144deg'],
        });

        return(
            <View style={styles.container}>
                <Animated.View style={[styles.leftContent, { transform: [{ rotate: spin }] }]} >
                    <TouchableHighlight
                        name=''
                        underlayColor='transparent'
                        onPress={ () => {this.onClick() }}
                        /*onPress={ () => {this.props.screenProps.rootNavigation.navigate("DrawerOpen")
                        } }*/
                        /*onPress={ () => {this.props.navigation.event.dispatch(NavigationActions.back())
                        } }*/>
                        <CustomIcon size={30} name={leftElement} color="#FFE066"/>
                    </TouchableHighlight>
                </Animated.View>
                <View style={styles.centerContent}>
                    {this.renderNavBarTitle()}
                </View>
                <View style={styles.rightContent}>
                </View>
            </View>
        )
    }
}

export default connect(
    mapStateToProps
)(NavBar)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: DEFAULT_NAVBAR_HEIGHT
    },
    leftContent: {
        flex: 1,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerContent: {
        flex: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    rightContent: {
        flex: 1,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
})