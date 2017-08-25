import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
    Platform,
    StatusBar,
    Dimensions, Text, ScrollView
} from 'react-native'
import HiveCardSmall from "../../../components/HiveCardSmall";

export default class AllHives extends Component {

    static navigationOptions = {
        tabBarLabel: "Wszystkie"
    }

    constructor(props) {
        super(props)
    }

    render() {
        const {hives, accesspoint} = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    // Hide all scroll indicators
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {hives.map((hive, index) => <HiveCardSmall
                        hive={hive}
                        key={index}
                    />)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,                // take up all screen
        paddingTop: 20,         // start below status bar
    },
    loader: {
        flex: 1,
        alignItems: 'center',     // center horizontally
        justifyContent: 'center', // center vertically
    },
    scrollContent: {
        flexDirection: 'row',   // arrange posters in rows
        flexWrap: 'wrap',       // allow multiple rows
    },
});

AllHives.propTypes = {
    navigation: PropTypes.object.isRequired,
}