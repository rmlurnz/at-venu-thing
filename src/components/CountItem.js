import React, { Component } from 'react';
import ActiveCell from './ActiveCell';
import MoreButton from './MoreButton';
import DonutGraph from './DonutGraph';

class CountItem extends Component {
    constructor() {
        super();

        this.state = {
            hovered: false,
        }
    }

    updateField(id, field, value) {
        this.props.updateCountItem([id, field, value])
    }

    dollarize(input) {
        if (input === 0) {
            return "N/A"
        } else {
            let monefied = "$"+input+".00"
            return monefied
        }
    }

    showNote() {
        this.setState({
            hovered: true
        });
    }

    hideNote() {
        this.setState({
            hovered: false
        });
    }

    render() {
        return (
            <div className="col-sm-12">
                <div className="item-section">
                    <div className="item-description">
                        <div className="item-name">
                            <h5>
                                {this.props.item.itemName}
                            </h5>
                        </div>
                        <img
                            src={require('../doge.jpg')}
                            className="item-image"
                            alt="specified product"
                        />
                        {this.props.item.notes ? (
                                <img
                                    src={require('../exclamation-mark.svg')}
                                    className="item-note-warning"
                                    alt="item note warning"
                                    onMouseOver={this.showNote.bind(this)}
                                    onMouseLeave={this.hideNote.bind(this)}
                                />
                            ) : (null)}
                        {this.state.hovered ? (
                                <div className="hovered-note">
                                    Notes: {this.props.item.notes}
                                </div>
                            ) : (null)}
                        <div className="item-price">
                            <span>
                                {this.dollarize(this.props.item.price)}
                            </span>
                        </div>
                    </div>
                    <div className="item-fields">
                        <table className="item-fields-table">
                            <thead>
                                <tr>
                                    <th>Qty Avail.</th>
                                    <th>Count In</th>
                                    <th>Add</th>
                                    <th>Total In</th>
                                    <th>Comp</th>
                                    <th>Count Out</th>
                                    <th>Total Sold</th>
                                    <th>Gross</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="table-cell">
                                        <p>
                                            {this.props.item.available}
                                        </p>
                                    </td>
                                    <td className="table-cell border">
                                        <ActiveCell
                                            value={this.props.item.countIn}
                                            updateValue={this.updateField.bind(this, this.props.item.id, 'countIn')}
                                            inputType="number"
                                            disabled={this.props.settled}
                                        />
                                    </td>
                                    <td className="table-cell border">
                                        <ActiveCell
                                            value={this.props.item.add}
                                            updateValue={this.updateField.bind(this, this.props.item.id, 'add')}
                                            inputType="number"
                                            colour="darkturquoise"
                                            disabled={this.props.settled}
                                        />
                                    </td>
                                    <td className="table-cell border">
                                        <p style={{ color: "deepskyblue" }}>
                                            {this.props.item.totalIn}
                                        </p>
                                    </td>
                                    <td className="table-cell border">
                                        <ActiveCell
                                            value={this.props.item.comp}
                                            updateValue={this.updateField.bind(this, this.props.item.id, 'comp')}
                                            inputType="number"
                                            colour="red"
                                            disabled={this.props.settled}
                                        />
                                    </td>
                                    <td className="table-cell border">
                                        <ActiveCell
                                            value={this.props.item.countOut}
                                            updateValue={this.updateField.bind(this, this.props.item.id, 'countOut')}
                                            inputType="number"
                                            disabled={this.props.settled}
                                        />
                                    </td>
                                    <td className="table-cell border">
                                        <p style={{ color: "deepskyblue" }}>
                                            {this.props.item.totalSold}
                                        </p>
                                    </td>
                                    <td className="table-cell border right-edge">
                                        <p style={{ color: "deepskyblue" }}>
                                            {this.dollarize(this.props.item.gross)}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <MoreButton
                                            item={this.props.item}
                                            updateValue={this.updateField.bind(this)}
                                            settled={this.props.settled}>
                                        </MoreButton>
                                    </td>
                                    <td></td>
                                    <td className="table-total">
                                        <p style={{ color: "deepskyblue" }}>
                                            {this.props.item.totalIn}
                                        </p>
                                    </td>
                                    <td className="table-total">
                                        <p style={{ color: "red" }}>
                                            {this.props.item.comp}
                                        </p>
                                    </td>
                                    <td className="table-total">
                                        <p>
                                            {this.props.item.countOut}
                                        </p>
                                    </td>
                                    <td className="table-total">
                                        <DonutGraph
                                            totalIn={this.props.item.totalIn}
                                            totalSold={this.props.item.totalSold}
                                            size={60}
                                            strokewidth={5}>
                                        </DonutGraph>

                                    </td>
                                    <td className="table-total">
                                        <p style={{ color: "deepskyblue" }}>
                                            {this.dollarize(this.props.item.gross)}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default CountItem;

// <table className="table ">
//     <thead>
//         <tr>
//             <th width="30%">Item</th>
//             <th>Price</th>
//             <th>Qty Avail.</th>
//             <th>Count In</th>
//             <th>Add</th>
//             <th>Total In</th>
//             <th>Comp</th>
//             <th>Count Out</th>
//             <th>Total Sold</th>
//             <th>Gross</th>
//         </tr>
//     </thead>
//
//     <tbody>
//         <tr>
//             <div className="item-description">
//                 <ActiveCell
//                     value={this.props.item.item}
//                     updateValue={this.updateField.bind(this, this.props.item.id, 'item')}
//                     inputType="text"
//                 />
//                 <img
//                     src={require('../doge.jpg')}
//                     className="item-image"
//                 />
//                 <div className="item-price">
//                     <p>
//                         {this.dollarize(this.props.item.price)}
//                     </p>
//                 </div>
//             </div>
//
//
//             <ActiveCell
//                 value={this.props.item.price}
//                 updateValue={this.updateField.bind(this, this.props.item.id, 'price')}
//                 inputType="number"
//             />
//             <td>{this.props.item.available}</td>
//             <ActiveCell
//                 value={this.props.item.countIn}
//                 updateValue={this.updateField.bind(this, this.props.item.id, 'countIn')}
//                 inputType="number"
//             />
//             <ActiveCell
//                 value={this.props.item.add}
//                 updateValue={this.updateField.bind(this, this.props.item.id, 'add')}
//                 inputType="number"
//                 colour="darkturquoise"
//             />
//             <td>
//                 <p style={{ color: "deepskyblue" }}>
//                     {this.props.item.totalIn}
//                 </p>
//             </td>
//             <ActiveCell
//                 value={this.props.item.comp}
//                 updateValue={this.updateField.bind(this, this.props.item.id, 'comp')}
//                 inputType="number"
//                 colour="red"
//             />
//             <ActiveCell
//                 value={this.props.item.countOut}
//                 updateValue={this.updateField.bind(this, this.props.item.id, 'countOut')}
//                 inputType="number"
//             />
//             <td>
//                 <p style={{ color: "deepskyblue" }}>
//                     {this.props.item.totalSold}
//                 </p>
//             </td>
//             <td>
//                 <p style={{ color: "deepskyblue" }}>
//                     {this.dollarize(this.props.item.gross)}
//                 </p>
//             </td>
//         </tr>
//     </tbody>
//
//     <tfoot>
//     </tfoot>
// </table>

// <ActiveCell
//     value={this.props.item.price}
//     updateValue={this.updateField.bind(this, this.props.item.id, 'price')}
//     inputType="number"
// />
