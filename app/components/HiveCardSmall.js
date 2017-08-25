import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import HiveCard from "./HiveCard";

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 2, rows = 2;

export default class HiveCardSmall extends Component {
    render() {
        const { hive } = this.props;
        //alert(JSON.stringify(hive.hive.name, null, 4));
        return (
            <TouchableOpacity style={styles.container} onPress={() => alert("aklik")}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: 'http://www.protecttheplanet.co.uk/user/products/large/beehive-wooden-composter.jpg'}} style={styles.image} />
                </View>
                <Text style={styles.title} numberOfLines={1}>{hive.hive.name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginBottom: 10,
        height: (height - 20 - 20) / rows - 10,
        width: (width - 10) / cols - 10,
    },
    imageContainer: {
        flex: 1,                          // take up all available space
    },
    image: {
        borderRadius: 10,                 // rounded corners
        ...StyleSheet.absoluteFillObject, // fill up all space in a container
    },
    title: {
        fontFamily: 'Raleway-Medium',
        fontSize: 14,
        marginTop: 4,
    },
    genre: {
        fontFamily: 'Raleway-Medium',
        color: '#BBBBBB',
        fontSize: 12,
        lineHeight: 14,
    },
});

HiveCardSmall.propTypes = {
    hive: PropTypes.object.isRequired,
}