import React, { Component } from 'react';
import CountItem from './CountItem';
import DonutGraph from './DonutGraph'

class CountSection extends Component {
    constructor() {
        super();

        this.state = {
            settled: false,
        }
    }

    settleCountSection() {
        this.setState({
            settled: true
        });
    }

    updateCountSection(toUpdate) {
        this.props.updateCountsWith(toUpdate)
    }

    calcTotals(field) {
        let total = 0

        this.props.counts.forEach(function(count) {
            total += count[field]
        })

        return total
    }

    dollarize(input) {
        if (input === 0) {
            return "N/A"
        } else {
            let monefied = "$"+input+".00"
            return monefied
        }
    }

    render() {
        if (this.props.counts.length > 0) {
            return (
                <div>
                    <div className="row">
                        {this.props.counts.map(i => {
                            return <CountItem
                                key={i.id}
                                item={i}
                                updateCountItem={this.updateCountSection.bind(this)}
                                settled={this.state.settled}
                                />
                        })}
                    </div>

                    {!this.state.settled ? (
                        <div>
                            <button
                                type='button'
                                className='btn btn-primary add-another-button'
                                onClick={() => this.props.addCountItem()}>
                                Add Another Count Item
                            </button>
                            <div className="total-donut">
                                <h3 className="total-title">TOTAL</h3>
                                <DonutGraph
                                    totalIn={this.calcTotals('totalIn')}
                                    totalSold={this.calcTotals('totalSold')}
                                    size={150}
                                    strokewidth={16}
                                    label="UNITS SOLD">
                                </DonutGraph>
                                <h3 className="total-dollars">
                                    {this.dollarize(this.calcTotals('gross'))}
                                </h3>
                            </div>
                            <button
                                type='button'
                                className='btn btn-outline-secondary settle-button'
                                onClick={() => this.settleCountSection()}>
                                SETTLE
                            </button>
                        </div>
                        ) :
                        <div>
                            <div className="total-donut">
                                <h3 className="total-title">TOTAL</h3>
                                <DonutGraph
                                    totalIn={this.calcTotals('totalIn')}
                                    totalSold={this.calcTotals('totalSold')}
                                    size={150}
                                    strokewidth={16}
                                    label="UNITS SOLD">
                                </DonutGraph>
                                <h3 className="total-dollars">
                                    {this.dollarize(this.calcTotals('gross'))}
                                </h3>
                            </div>
                            <button
                                type='button'
                                className='btn btn-outline-secondary settle-button disabled'
                                onClick={() => this.settleCountSection()}
                                disabled={true}>
                                Count Report has been Settled
                            </button>
                        </div>
                    }
                </div>
            );
        } else {
            return (
                <div>
                    <div className="row">
                        <button
                            type='button'
                            className='btn btn-primary add-another-button'
                            onClick={() => this.props.addCountItem()}>
                            Add Count Item
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default CountSection;
