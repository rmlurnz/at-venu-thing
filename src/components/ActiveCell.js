import React, { Component } from 'react';

class ActiveCell extends Component {
    handleChange(e) {
        this.props.updateValue(e.target.value)
    }

    render() {
        return (
            <input
                name="value"
                defaultValue={this.props.value}
                onChange={this.handleChange.bind(this)}
                type={this.props.inputType}
                style={{ color: this.props.colour}}
                disabled={this.props.disabled}
            />
        )
    }
}

export default ActiveCell;
