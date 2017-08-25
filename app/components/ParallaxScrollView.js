import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Animated,
    ScrollView,
    StyleSheet,
    Dimensions, TouchableHighlight
} from 'react-native';

import CustomIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {DrawerNavigator} from "react-navigation";
import SlideMenu from "./SlideMenu";

const ScrollViewPropTypes = ScrollView.propTypes;
import PropTypes from 'prop-types'

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_SCALE = Dimensions.get('window').scale;

export const DEFAULT_WINDOW_MULTIPLIER = 0.20;
export const DEFAULT_NAVBAR_HEIGHT = 50;



export default class ParallaxScrollView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0)
        };
    }

    renderBackground() {
        var {windowHeight, backgroundSource} = this.props;
        var {scrollY} = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }

        return (
            <Animated.View
                style={[
                    styles.background,
                    {
                        height: windowHeight,
                        /*transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-windowHeight, 0, windowHeight],
                                    outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-windowHeight, 0, windowHeight],
                                    outputRange: [1, 1, 1]
                                })
                            }
                        ],*/
                        backgroundColor: 'transparent'
                    }
                ]}

            >
            </Animated.View>
        );
    }

    renderHeaderView() {
        var {windowHeight, backgroundSource, userImage, userName, userTitle} = this.props;
        var {scrollY} = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }

        const newWindowHeight = windowHeight;

        return (
            <View style={{height: newWindowHeight, justifyContent: 'center', alignItems: 'center'}}>
                {this.props.headerView ||
                (
                    <View>
                        <View style={{paddingVertical: 10}}>
                            <Animated.View
                                style={{
                                    opacity: scrollY.interpolate({
                                        inputRange: [-windowHeight, 0, windowHeight * DEFAULT_WINDOW_MULTIPLIER + DEFAULT_NAVBAR_HEIGHT],
                                        outputRange: [1, 1, -1]
                                    })
                                }}>
                                <Text style={styles.text}>Witaj w aplikacji monitorującej</Text>
                            </Animated.View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Animated.View
                                    style={{
                                        opacity: scrollY.interpolate({
                                            inputRange: [-windowHeight, 0, windowHeight * DEFAULT_WINDOW_MULTIPLIER + DEFAULT_NAVBAR_HEIGHT],
                                            outputRange: [1, 1, -1]
                                        })
                                    }}>
                                    <Text style={styles.text}>Twoją pasiekę - </Text>
                                </Animated.View>
                                <Animated.View
                                    style={{
                                        opacity: scrollY.interpolate({
                                            inputRange: [-windowHeight, 0, windowHeight * DEFAULT_WINDOW_MULTIPLIER + DEFAULT_NAVBAR_HEIGHT],
                                            outputRange: [1, 2, 0]
                                        }),
                                        transform: [
                                            {
                                                translateY: scrollY.interpolate({
                                                    inputRange: [-windowHeight, 0, windowHeight * DEFAULT_WINDOW_MULTIPLIER + DEFAULT_NAVBAR_HEIGHT],
                                                    outputRange: [windowHeight / 2, 0, (windowHeight * DEFAULT_WINDOW_MULTIPLIER + DEFAULT_NAVBAR_HEIGHT) / 3]
                                                })
                                            }
                                        ],
                                    }}>
                                    <Text style={[styles.text, {
                                        fontSize: 25,
                                        fontFamily: 'Raleway-SemiBold',
                                        color: '#FFE066'
                                    }]}>SMARTULA</Text>
                                </Animated.View>
                            </View>
                        </View>
                    </View>
                )
                }
            </View>
        );
    }

    renderNavBarTitle() {
        var {windowHeight, backgroundSource, navBarTitleColor} = this.props;
        var {scrollY} = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        //console.log(scrollY);

        return (
            <Animated.View
                style={{
                    opacity: scrollY.interpolate({
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

    rendernavBar() {
        var {
            windowHeight, backgroundSource, leftIcon,
            rightIcon, leftIconOnPress, rightIconOnPress, navBarColor
        } = this.props;
        var {scrollY} = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }


        return (
            <Animated.View
                style={{
                    height: DEFAULT_NAVBAR_HEIGHT,
                    width: SCREEN_WIDTH,
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableHighlight
                        underlayColor='transparent'
                        onPress={ () => {this.props.navigation.navigate("DrawerOpen")
                        } }>
                    <CustomIcon size={30} name="pentagon-outline" color="#FFE066"/>
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        flex: 5,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'transparent',
                    }}
                >
                    {this.renderNavBarTitle()}
                </View>
                <View
                    style={{
                        flex: 1,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent'
                    }}
                >
                </View>
            </Animated.View>
        );
    }



    onScroll(event){
        this.props.action.updateScrollPos(this.state.scrollY);

        Animated.event( [
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}}
        ])(event)
    }

    render() {
        var {style, ...props} = this.props;

        return (
            <View style={[styles.container, style]}>
                {this.renderBackground()}
                <ScrollView
                    ref={component => {
                        this._scrollView = component;
                    }}
                    {...props}
                    style={styles.scrollView}
                    onScroll={this.onScroll.bind(this)}
                    scrollEventThrottle={16}
                >
                    {this.renderHeaderView()}
                    <View>
                        {this.props.children}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

ParallaxScrollView.defaultProps = {
    windowHeight: SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER,
};

ParallaxScrollView.propTypes = {
    ...ScrollViewPropTypes,
    backgroundSource: Image.propTypes.source,
    windowHeight: React.PropTypes.number,
    navBarTitle: React.PropTypes.string,
    navBarTitleColor: React.PropTypes.string,
    navBarColor: React.PropTypes.string,
    userImage: React.PropTypes.string,
    userName: React.PropTypes.string,
    userTitle: React.PropTypes.string,
    headerView: React.PropTypes.node,
    leftIcon: React.PropTypes.object,
    rightIcon: React.PropTypes.object,
    navigation: PropTypes.object.isRequired,
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'transparent'
    },
    scrollView: {
        backgroundColor: 'transparent'
    },
    background: {
        position: 'absolute',
        backgroundColor: '#2e2f31',
        width: SCREEN_WIDTH,
    },
    content: {
        shadowColor: '#222',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        flex: 1,
        flexDirection: 'column'
    },
    text: {
        flex: 0,
        fontFamily: 'Raleway-Medium',
        fontSize: 20,
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listView: {
        backgroundColor: 'rgba(247,247, 250, 1)'
    },
    logoutText: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});