import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight, TouchableWithoutFeedback,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import HiveDetailChart from './HiveDetailChart'

const SECTIONS = [
    {
        title: 'Firstasdasdasdasdasdasdas',
        content: HiveDetailChart
    },
    {
        title: 'Second',
        content: HiveDetailChart
    }
];

export default class HiveDetailContent extends Component {

    _renderHeader(section) {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
        );
    }

    _renderContent(section) {
        return (
            <View style={{flex: 1}}>
                <HiveDetailChart/>
            </View>
        );
    }

    render() {
        return (
        <Accordion
            style={{flex: 1}}
            sections={SECTIONS}
            removeClippedSubviews={false}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
        />
        );
    }
}


/*
            */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: 'transparent',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        padding: 40,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
});