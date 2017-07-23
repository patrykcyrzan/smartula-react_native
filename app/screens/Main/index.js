import React, { PropTypes } from 'react';
import {
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

export default Main;
