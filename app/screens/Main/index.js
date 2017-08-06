import React, { PropTypes } from 'react';
import {
    StatusBar,
    StyleSheet,
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Button,
    View,
} from 'native-base';
import SplashScreen from 'react-native-splash-screen'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import Dashboard from './Dashboard';
import Dashboard2 from './Dashboard2';
import Dashboard3 from './Dashboard3';
import {TabNavigator} from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconChartSettings from 'react-native-vector-icons/SimpleLineIcons'

const MainNavigator = TabNavigator({
    MoviesAndTV: { screen: Dashboard },
    Music: { screen: Dashboard2 },
    Newsstand: { screen: Dashboard3 }
}, {
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        bottomNavigationOptions: {
            labelColor: 'white',
            rippleColor: '#FFE066',
            tabs: {
                MoviesAndTV: {
                    backgroundColor: '#FAFAFA',
                    labelColor: '#CDD5DF',
                    activeLabelColor: '#FFE066',
                    activeIcon: <Icon size={24} color="#FFE066" name="dashboard" />
                },
                Music: {
                    barBackgroundColor: '#FAFAFA',
                    labelColor: '#CDD5DF',
                    activeLabelColor: '#FFE066',
                    activeIcon: <IconChartSettings size={24} color="#FFE066" name="chart" />
                },
                Newsstand: {
                    barBackgroundColor: '#FAFAFA',
                    labelColor: '#CDD5DF',
                    activeLabelColor: '#FFE066',
                    activeIcon: <IconChartSettings size={24} color="#FFE066" name="settings" />
                }
            }
        }
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 20,
        alignSelf: 'center',
        width: 150,
    },
});

const Main = (props) => {
    //const routeStack = props.navigator.getCurrentRoutes();
    SplashScreen.hide();
    return (
        <Container>
            <View style={styles.container}>
                <Header>
                    <Title>Welcome</Title>
                </Header>
                <View>
                    <Button
                        style={styles.button}
                        onPress={() => {
                            console.log('Main onPress')
                        }
                        }
                        title="Login"
                    />
                </View>
            </View>
        </Container>
    );
};

Main.propTypes = {
    navigator: PropTypes.shape({
        //getCurrentRoutes: PropTypes.func,
        //jumpTo: PropTypes.func,
    }),
};

export default () => (
    <View style={{ flex: 1 }}>
        <StatusBar
            barStyle="light-content"
            backgroundColor={'#202930'} />
        <MainNavigator />
    </View>
)
