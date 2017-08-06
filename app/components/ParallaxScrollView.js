import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Animated,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';

import {Icon, List, ListItem} from 'react-native-elements';
import CustomIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const ScrollViewPropTypes = ScrollView.propTypes;

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_SCALE = Dimensions.get('window').scale;

export const DEFAULT_WINDOW_MULTIPLIER = 0.20;
export const DEFAULT_NAVBAR_HEIGHT = 50;

export default class ParallaxScrollView extends Component {
    constructor() {
        super();

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
                    <CustomIcon size={30} name="pentagon-outline" color="#FFE066"/>
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

    render() {
        var {style, ...props} = this.props;

        return (
            <View style={[styles.container, style]}>
                {this.renderBackground()}
                {this.rendernavBar()}
                <ScrollView
                    ref={component => {
                        this._scrollView = component;
                    }}
                    {...props}
                    style={styles.scrollView}
                    onScroll={Animated.event([
                        {nativeEvent: {contentOffset: {y: this.state.scrollY}}}
                    ])}
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
    //backgroundSource: {uri: 'http://i.imgur.com/6Iej2c3.png'},
    windowHeight: SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER,
    leftIconOnPress: () => console.log('Left icon pressed'),
    rightIconOnPress: () => console.log('Right icon pressed')
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
    rightIcon: React.PropTypes.object
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
        fontFamily: 'VarelaRound-Regular',
        fontWeight: '100',
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