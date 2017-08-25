import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet, View,
} from 'react-native';
import {bindActionCreators, dispatch} from 'redux'
import { connect } from 'react-redux'
import * as HeaderActions from '../../../actions'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import Dashboard from '../Dashboard';
import Dashboard2 from '../Dashboard2';
import Dashboard3 from '../Dashboard3';
import HiveDetail from '../Dashboard/HiveDetail'
import AllHives from '../Dashboard/AllHives'
import HiveDetailChart from '../Dashboard/HiveDetailChart'
import {StackNavigator, TabNavigator, addNavigationHelpers} from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconChartSettings from 'react-native-vector-icons/SimpleLineIcons'
import PropTypes from 'prop-types'
import NavBar from "../Dashboard/NavBar";
import NavigatorService from "../../../services/navigator";


const DashboardStackNavigator = StackNavigator({
    Dashboard: {
        screen: Dashboard,
    },
    HiveDetail: {
        screen: HiveDetail,
    },
    AllHives: {
        screen: AllHives,
    }
},{ headerMode: 'none' })


const MainNavigator = TabNavigator(    {
    DashboardTab: { screen: ({ screenProps, navigationOptions}) => <DashboardStackNavigator
         screenProps={screenProps}
         navigationOptions={navigationOptions}
         onNavigationStateChange={(prevState, currentState) => {
             const getCurrentRouteName = (navigationState) => {
                 if (!navigationState) return null;
                 const route = navigationState.routes[navigationState.index];
                 if (route.routes) return getCurrentRouteName(route);
                 return route.routeName;
             };
             const getCurrentNavigation = (navigationState) => {
                 if (!navigationState) return null;
                 const route = navigationState.routes[navigationState.index];
                 console.log(this.state)
                 return route;
             };
             screenProps.actions.updateStackNav(getCurrentNavigation(currentState))
         }}/>,
        navigationOptions: {tabBarLabel: "Dashboard", tabBarIcon: () => <Icon size={24} name="dashboard" color="#CDD5DF"/>}},
    AlertsTab: { screen: Dashboard2 },
    SettingsTab: { screen: Dashboard3 }
}, {
    navigationOptions: {
      headerMode: 'screen'
    },
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
        bottomNavigationOptions: {
            labelColor: 'white',
            rippleColor: '#FFE066',
            onTabChange: (newTabIndex) => alert(`New Tab at position ${newTabIndex}`),
            tabs: {
                DashboardTab: {
                    backgroundColor: '#FAFAFA',
                    labelColor: '#CDD5DF',
                    tabBarLabel: "Dashboard",
                    activeLabelColor: '#FFE066',
                    activeIcon: <Icon size={24} color="#FFE066" name="dashboard" />
                },
                AlertsTab: {
                    barBackgroundColor: '#FAFAFA',
                    labelColor: '#CDD5DF',
                    activeLabelColor: '#FFE066',
                    activeIcon: <IconChartSettings size={24} color="#FFE066" name="bell" />
                },
                SettingsTab: {
                    barBackgroundColor: '#FAFAFA',
                    labelColor: '#CDD5DF',
                    activeLabelColor: '#FFE066',
                    activeIcon: <IconChartSettings size={24} color="#FFE066" name="settings" />
                }
            }
        }
    }
});

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent

                {...params} {...this.props} />
        }
    }
}

const paramsToProps = (SomeComponent) => {
// turns this.props.navigation.state.params into this.params.<x>
    return class extends React.Component {
        static navigationOptions = SomeComponent.navigationOptions;
        // everything else, call as SomeComponent
        render() {
            const {navigation, ...otherProps} = this.props
            const {state: {params}} = navigation
            return <SomeComponent
                onNavigationStateChange={(prevState, currentState) => {
                    const getCurrentRouteName = (navigationState) => {
                        if (!navigationState) return null;
                        const route = navigationState.routes[navigationState.index];
                        if (route.routes) return getCurrentRouteName(route);
                        return route.routeName;
                    };
                    global.currentRoute = getCurrentRouteName(currentState);
                }}
                {...this.props} {...params} />
        }
    }
}

/*function mapStateToProps(state) {
    //console.log(state)
    return {
        events: state.header
    };



        onNavigationStateChange={(prevState, currentState) => {
            const getCurrentRouteName = (navigationState) => {
                if (!navigationState) return null;
                const route = navigationState.routes[navigationState.index];
                if (route.routes) return getCurrentRouteName(route);
                return route.routeName;
            };
            global.currentRoute = getCurrentRouteName(currentState);
        }}
}*/

const mapStateToProps = state => ({
    events: state.header
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(HeaderActions, dispatch)
})

/*const MainScreen = ({headerAction, actions}) => (
    <View style={{ flex: 1 }}>
        <NavBar/>
        <MainNavigator
            screenProps={{rootNavigation: this.props.screenProps.rootNavigation,
            actions: actions}}/>
    </View>
)*/

class MainScreen extends Component {

    constructor(props) {
        super(props)

        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(newTabIndex, oldTabIndex) {
        console.log("onTabChange")
    }

    _onNavigationStateChange = (prevState, newState) => {
        this.setState({...this.state, route_index: newState.index});
    }

    render() {
        const {screenProps, navigationOptions} = this.props;
        /*this.props.screenProps.setParams({
            rootNavigation: this.props.screenProps.rootNavigation,
        });*/
        //const { navigation } = this.props
        //alert(JSON.stringify(screenProps.rootNavigation, null, 4));
        //screenProps.rootNavigation.navigate("DrawerOpen");
        console.log("PROPS")
        console.log(this.props)
        console.log("--------")

        return (
            <View style={{ flex: 1, backgroundColor: '#FAFAFA', }}>
                <NavBar screenProps={{rootNavigation: this.props.screenProps.rootNavigation}}/>
                <MainNavigator
                    onNavigationStateChange={this._onNavigationStateChange}
                    ref={navigatorRef => {
                    NavigatorService.setContainer(navigatorRef);
                }} screenProps={{rootNavigation: this.props.screenProps.rootNavigation, actions: this.props.actions, navigation: this.state}}/>
            </View>
        )
    }
}

export default connect(
    null,
    mapDispatchToProps
)(MainScreen)

MainScreen.propTypes = {
    actions: PropTypes.object.isRequired
}

/*export default class MainScreen extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {screenProps, navigationOptions} = this.props;
        //alert(JSON.stringify(screenProps.rootNavigation, null, 4));
        /!*alert(JSON.stringify(this.props.screenProps, null ,4));
        this.props.screenProps.setParams({
            rootNavigation: screenProps.rootNavigation
        })*!/
    }

    render() {
        const {screenProps, navigationOptions} = this.props;
        /!*this.props.screenProps.setParams({
            rootNavigation: this.props.screenProps.rootNavigation,
        });*!/
        //const { navigation } = this.props
        //alert(JSON.stringify(screenProps.rootNavigation, null, 4));
        //screenProps.rootNavigation.navigate("DrawerOpen");

        return (
            <View style={{ flex: 1 }}>
                <NavBar/>
                <MainNavigator
                    screenProps={{rootNavigation: this.props.screenProps.rootNavigation}}/>
            </View>
        )
    }
}*/
/*



MainScreen.propTypes = {
    rootNavigation: PropTypes.object.isRequired
}*/
