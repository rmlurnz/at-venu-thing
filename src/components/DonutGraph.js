import React, { Component } from 'react';

class DonutGraph extends Component {
    render() {
        const halfsize = (this.props.size * 0.5);
        const radius = halfsize - (this.props.strokewidth * 0.5);
        const circumference = 2 * Math.PI * radius;
        const strokeval = ((this.props.totalSold * circumference) / this.props.totalIn);
        const dashval = (strokeval + ' ' + circumference);

        const trackstyle = {strokeWidth: this.props.strokewidth};
        const indicatorstyle = {strokeWidth: this.props.strokewidth, strokeDasharray: dashval}
        const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';

        return (
            <div>
                <svg width={this.props.size} height={this.props.size} className="donutchart">
                    <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track"/>
                    <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
                    <text className="donutchart-text" x={halfsize-1} y={halfsize+7} style={{textAnchor:'middle'}} >
                        <tspan className="donutchart-text-val">
                            {this.props.totalSold}
                        </tspan>
                        <tspan className="donutchart-text-label" x={halfsize} y={halfsize+25}>
                            {this.props.label}
                        </tspan>
                    </text>
                </svg>
            </div>
        )
    }
}

export default DonutGraph;
