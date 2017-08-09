import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ParallaxImage} from 'react-native-snap-carousel';
import {Container, Content, Card, CardItem, Thumbnail, Text, Button} from 'native-base';
import IconThermometer from 'react-native-vector-icons/FontAwesome';
import IconWeight from 'react-native-vector-icons/MaterialCommunityIcons';
import IconWater from 'react-native-vector-icons/Entypo';

import {
    View,
    StyleSheet,
    Platform, Dimensions, Image, TouchableOpacity, TouchableHighlight
} from 'react-native'

import ScalableText from 'react-native-text'

const entryBorderRadius = 8;
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.5;
const slideWidth = wp(65);
const itemHorizontalMargin = wp(2);
const imageHeight = slideHeight * 0.1;
const elevation = 3;
const elevationPadding = elevation * 0.5;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth;

export default class HiveCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calc_height: 0
        }
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
    };

    get image() {
        return (
            <Image
                source={{uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg'}}
                containerStyle={styles.imageContainer}
                style={[styles.image, {position: 'relative'}]}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={'rgba(0, 0, 0, 0.25)'}/>);
    }

    render() {
        const {data: {hive}} = this.props;

        //alert(JSON.stringify(this.props.navigation, null ,4));

        return (
            <Card
                style={styles.container}>
                {/*<CardItem>
                    <Text>Instrumental Songs</Text>
                    <Text note>Guitar</Text>
                </CardItem>*/}
                <TouchableHighlight
                    style={{flex: 1}}
                    onPress={() => {
                        this.props.navigation.navigate('HiveDetail')
                    }}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Image style={[styles.imageContainer, {flex: 0.7}]}
                               source={{uri: 'http://www.protecttheplanet.co.uk/user/products/large/beehive-wooden-composter.jpg'}}/>
                        <View style={[styles.contentContainer, {flex: 0.3}]}>
                            <Text style={[styles.header, styles.bordered]}>{hive.name.toUpperCase()}</Text>
                            <View style={styles.statisticsContainer}>
                                <View style={styles.statisticsItem}>
                                    <IconThermometer size={20} name="thermometer" color="#e74c3c"/>
                                    <Text style={styles.txtItem}>36</Text>
                                </View>
                                <View style={styles.statisticsItem}>
                                    <IconWeight size={20} name="weight" color="black"/>
                                    <Text style={styles.txtItem}>36</Text>
                                </View>
                                <View style={styles.statisticsItem}>
                                    <IconWater size={20} name="water" color="#3498db"/>
                                    <Text style={styles.txtItem}>36</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*<TouchableOpacity
                activeOpacity={1}
                style={[styles.container]}>
                <View style={[styles.container]}>
                    {this.image}
                </View>
                <View style={[styles.textContainer]}>
                    <ScalableText
                        style={[styles.title]}
                        numberOfLines={2}
                    >
                        { hive.name }
                    </ScalableText>
                </View>
            </TouchableOpacity>*/}
                </TouchableHighlight>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: itemWidth,
        height: slideHeight,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
        borderRadius: entryBorderRadius,
        shadowOpacity: 90,
        shadowRadius: 40,
        shadowColor: 'black',
        elevation: elevation,
        marginBottom: elevation,
        marginLeft: elevation,
        marginRight: elevation,
        paddingLeft: 0,
        shadowOffset: {height: 50, width: 20},
    },
    /*container: {
        width: itemWidth,
        height: slideHeight,
        flex: 0,
        paddingHorizontal: itemHorizontalMargin,
        ...Platform.select({
            ios: {
                paddingBottom: 18, // needed for shadow
                shadowColor: "#000000",
                shadowOpacity: 0.3,
                shadowRadius: 1,
                shadowOffset: {
                    height: 1,
                    width: 0.3,
                },
            },
            android: {
                elevation: 10
            },
        }),

    },*/
    bordered: {
        borderBottomWidth: 1,
        borderColor: '#696969'
    },
    card: {
        backgroundColor: "red",
        borderRadius: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.3,
        }
    },
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    imageContainer: {
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        marginHorizontal: -1,
        marginTop: -1,
    },
    contentContainer: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 10,
        paddingBottom: 5,
    },
    statisticsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    statisticsItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    cardContent: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    header: {
        color: '#696969',
        fontWeight: '200',
        fontSize: 25,
        fontFamily: 'VarelaRound-Regular',
    },
    txtItem: {
        marginLeft: 5,
        fontFamily: 'VarelaRound-Regular',
        fontSize: 15,
        fontWeight: '400'
    },
    position: {
        marginRight: 10,
        width: 35,
        textAlign: 'center'
    },
    name: {
        flex: 1
    },
    wins: {
        width: 45,
        textAlign: 'center'
    },
    title: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    points: {
        width: 50,
        textAlign: 'right'
    }
})