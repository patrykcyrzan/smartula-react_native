import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
    View,
    StyleSheet
} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../../components/SliderEntry'
import HiveCard from '../../../components/HiveCard'
import {sliderWidth, itemWidth, itemHorizontalMargin} from '../../../styles/SliderEntry.style'
import ScalableText from "react-native-text";

const ENTRIES1 = [
    {
        name: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'http://i.imgur.com/UYiroysl.jpg'
    },
    {
        name: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        name: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'http://i.imgur.com/MABUbpDl.jpg'
    },
    {
        name: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'http://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        name: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        name: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
    },
    {
        name: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
    },
    {
        name: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
    },
    {
        name: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
    },
    {
        name: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
    },
    {
        name: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
    }
];

const ENTRIES2 = [
    {
        id: 3,
        name: "HiveNo3",
        sn: 44000002,
        active: false,
        accessPoint: {
            serviceNumber: 4400,
            location: "Starogard"
        }
    },
    {
        id: 3,
        name: "HiveNo3",
        sn: 44000002,
        active: false,
        accessPoint: {
            serviceNumber: 4400,
            location: "Starogard"
        }
    },
    {
        id: 3,
        name: "HiveNo3",
        sn: 44000002,
        active: false,
        accessPoint: {
            serviceNumber: 4400,
            location: "Starogard"
        }
    },
    {
        id: 3,
        name: "HiveNo3",
        sn: 44000002,
        active: false,
        accessPoint: {
            serviceNumber: 4400,
            location: "Starogard"
        }
    }
];

export default class SingleAccessPoint extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {hives, accesspoint} = this.props

        return (
            <View style={styles.accesspointContainer}>
                <ScalableText style={styles.accesspointName}>{accesspoint}</ScalableText>
            <Carousel
                data={hives}
                renderItem={this._renderItem}
                ref={(carousel) => {
                    this._carousel = carousel;
                }}
                itemWidth={itemWidth}
                sliderHeight={300}
                enableMomentum={false}
                decelerationRate={0.1}
                activeSlideOffset={1}
                scrollEndDragDebounceValue={150}
                removeClippedSubviews={false}
                hasParallaxImages={true}
                //onSnapToItem={(index)=>this.onSnapToItem(index)}
                sliderWidth={sliderWidth}
                showsHorizontalScrollIndicator={false}
                containerCustomStyle={styles.sliderContainer}
                animationFunc={'timing'}
                animationOptions={{
                    friction: 4,
                    tension: 40,
                    isInteraction: false,
                    useNativeDriver: true
                }}/>
            </View>
        )
    }

    /*_renderItem({item, index}) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
            />
            {/!*<HiveCard
                data={item}/>*!/}
        )
    }*/

    _renderItem({item, index}, parallaxProps) {
        return (
        <HiveCard
            data={item}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 20,
        alignSelf: 'center',
        width: 150,
    },
    hives: {
        flex: 1
    },
    accesspointName: {
      flex: 0,
        fontFamily: 'VarelaRound-Regular',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 30,
        marginTop: 30,
    },
    accesspointContainer: {
      flex: 1,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    errMsg: {
        flexDirection: 'row',
        backgroundColor: '#f94057',
        alignItems: 'center',
        justifyContent: 'center',
        height: 16
    },
    errMsgTxt: {
        fontSize: 10,
        color: '#fff'
    },
    raceName: {
        fontSize: 16,
        lineHeight: 20,
        color: '#444'
    },
    raceContent: {
        flex: 1,
        justifyContent: 'center'
    },
});

SingleAccessPoint.propTypes = {
    hives: PropTypes.array.isRequired,
    accesspoint: PropTypes.string.isRequired
}