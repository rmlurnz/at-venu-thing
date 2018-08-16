import React, { Component } from 'react';
import uuid from 'uuid';
import CountSection from './CountSection';

class Report extends Component {
    constructor() {
        super();
        this.state = {
            report: {}
        }
    }

    componentWillMount() {
        this.setState({
            report: {
                id: uuid.v4(),
                date: new Date(),
                counts: []
            }
        });
    }

    handleAddCountItem(props) {
        let countItem = {
            id: uuid.v4(),
            itemName: '',
            price: 0,
            available: 0,
            countIn: 0,
            add: 0,
            totalIn: 0,
            comp: 0,
            countOut: 0,
            totalSold: 0,
            gross: 0,
            notes: ''
        }
        let counts = this.state.report.counts;
        counts.push(countItem);
        this.setState({counts:counts});
    }

    updateCounts(toUpdate) {
        let updatedCounts = this.state.report.counts

        let found = this.state.report.counts.find(function(item) {
            return item.id === toUpdate[0]
        })

        let index = this.state.report.counts.indexOf(found)

        found[toUpdate[1]] = toUpdate[2]

        found.totalIn = (found.countIn * 1) + (found.add * 1)
        found.totalSold = (found.totalIn * 1) - (found.countOut * 1) - (found.comp * 1)
        found.gross = found.price * found.totalSold

        updatedCounts[index] = found

        this.setState({
            counts: updatedCounts
        });
    }

    handleDeleteProject(id) {
        let projects = this.state.projects;
        let index = projects.findIndex(x => x.id === id);

        projects.splice(index, 1);

        this.setState({projects:projects});
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1>Count Report</h1>
                </div>
                <CountSection
                    counts={this.state.report.counts}
                    addCountItem={() => this.handleAddCountItem()}
                    updateCountsWith={this.updateCounts.bind(this)}>
                </CountSection>
            </div>
        );
    }
}

export default Report;
