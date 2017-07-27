import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool
    };

    render () {
        const { data: { hive }, even } = this.props;

        const uppercaseTitle = hive.name ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}
            >
                { hive.name.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => { alert(`You've clicked '${hive.name}'`); }}
            >
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    <Image
                        source={{uri: 'http://i.imgur.com/UYiroysl.jpg'}}
                        style={styles.image}
                    />
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                        style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                        numberOfLines={2}
                    >
                        uahsiuash
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}