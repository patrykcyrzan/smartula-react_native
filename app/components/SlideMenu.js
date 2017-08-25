/**
 * Created by Patryk on 21.07.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    Platform
} from 'react-native'

import ScalableText from 'react-native-text'

class SlideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pressed: ''
        }
    }

    render() {
        const { state } = this.props.navigation;
        function icon(index) {
            if (index == 0) {
                return <Image source={ require('../../assets/images/icon-standings.png') } style={ styles.btnIcon } />
            } else if (index == 1) {
                return <Image source={ require('../../assets/images/icon-calendar.png') } style={ styles.btnIcon } />
            }
        }

        function title(index) {
            if (index == 0) {
                return(
                <View style={ styles.btnBox }>
                    { icon(index) }
                    <ScalableText style={[ styles.btnTxt, state.index === index ? styles.btnTxtActive : {} ]}>
                        EKRAN GŁÓWNY
                    </ScalableText>
                </View>
                )
            } else if (index == 1) {
                return(
                <View style={ styles.btnBox }>
                    { icon(index) }
                    <ScalableText style={[ styles.btnTxt, state.index === index ? styles.btnTxtActive : {} ]}>
                        O NAS
                    </ScalableText>
                </View>
                )
            }
        }

        //alert(JSON.stringify(this.props.navigation, null, 4));
        return (
            <View style={ styles.content }>
                {this.props.navigation.state.routes.map((route, index) => (
                    <TouchableHighlight
                        onPress={ () => this.props.navigation.navigate(route.routeName) }
                        onHideUnderlay={ () => { this.setState({ pressed: '' }) } }
                        onShowUnderlay={ () => { this.setState({ pressed: route.routeName }) } }
                        style={[ styles.btn, this.state.pressed === route.routeName ? styles.tabPress : {} ]}
                        underlayColor="transparent"
                        key={ route.routeName }>
                        {title(index)}
                    </TouchableHighlight>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
    menuImg: {
        position: 'relative',
        width: null,
        height: 150
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    btnBox: {
        flexDirection: 'row'
    },
    btnIcon: {
        height: 16,
        width: 16
    },
    btnTxt: {
        paddingLeft: 20,
        color: '#CDD5DF',
        fontSize: 16,
        lineHeight: 17,
        fontFamily: 'Raleway-Medium'
    },
    btnTxtActive: {
        color: '#FFE066'
    }
})

SlideMenu.propTypes = {
    navigation: PropTypes.object.isRequired
}

export default SlideMenu