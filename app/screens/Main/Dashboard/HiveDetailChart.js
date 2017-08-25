import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';

export default class HiveDetailChart extends Component {

    constructor() {
        super();

        this.state = {
            animation: {
                durationX: 500,
                durationY: 1000,
                easingX: 'Linear'
        }
        };
    }

    componentDidMount() {
        this.setState(
            update(this.state, {
                data: {
                    $set: {
                        dataSets: [{
                            values: [{y: 36.5}, {y: 37.5}, {y: 37}, {y: 37.2}],
                            label: 'Company X',
                            config: {
                                lineWidth: 3,
                                drawCircles: false,
                                drawHighlightIndicators: false,
                                highlightColor: processColor('red'),
                                color: processColor('red'),
                                drawFilled: false,
                                fillColor: processColor('red'),
                                fillAlpha: 60,
                                drawValues: false,
                                mode: 'CUBIC_BEZIER',
                                valueFormatter: "##.000",
                            }
                        }],
                    }
                },
                legend: {
                    $set: {
                        enabled: false,
                    }
                },
                xAxis: {
                    $set: {
                        valueFormatter: ['2017-04-06T10:15:30', '2017-04-06T10:18:30', '2017-04-06T10:18:30', '2017-04-06T10:18:30'],
                        drawGridLines: false,
                        drawAxisLine: false,
                        position: 'BOTTOM'
                    }
                },
                yAxis: {
                    $set: {
                        left: {
                            drawGridLines: false,
                            drawAxisLine: false},
                        right: {enabled: false}
                    }
                }
            })
        );
    }

    render() {
        return (
                    <LineChart
                        style={styles.chart}
                        data={this.state.data}
                        legend={this.state.legend}
                        marker={{enabled: false}}
                        xAxis={this.state.xAxis}
                        yAxis={this.state.yAxis}
                        animation={this.state.animation}
                        drawGridBackground={false}
                        drawBorders={false}
                        touchEnabled={true}
                        dragEnabled={true}
                        scaleEnabled={true}
                        scaleXEnabled={true}
                        scaleYEnabled={false}
                        pinchZoom={false}
                        doubleTapToZoomEnabled={true}
                        description={false}
                        dragDecelerationEnabled={true}
                        dragDecelerationFrictionCoef={0.99}
                        keepPositionOnRotation={false}
                    />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chart: {
        flex: 1,
        height: 200
    }
});