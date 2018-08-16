import React, { Component } from 'react';
import ActiveCell from './ActiveCell';

class MoreButton extends Component {
    constructor() {
        super();

        this.state = {
            showMore: false,
        }

        this.showMore = this.showMore.bind(this)
        this.closeMore = this.closeMore.bind(this)
    }

    showMore(e) {
        e.preventDefault()

        this.setState({ showMore: true }, () => {
            document.addEventListener('click', this.closeMore);
        });
    }

    closeMore(e) {
        if (!this.moreMenu.contains(e.target)) {
            this.setState({ showMore: false }, () => {
                document.removeEventListener('click', this.closeMore);
            });
        }
    }

    updateField(e, o, u) {
        this.props.updateValue(e, o, u)
    }

    render() {
        return (
            <div>
                <button
                    onClick={this.showMore}
                    type='button'
                    className='btn btn-outline-secondary more-button'
                    disabled={this.props.settled}>
                    More
                </button>
                {
                    this.state.showMore && !this.props.settled
                    ? (
                        <div
                            className="more-button-modal"
                            ref={(element) => {
                                this.moreMenu = element
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="itemName">Item Name</label>
                                <ActiveCell
                                    name="itemName"
                                    value={this.props.item.itemName}
                                    updateValue={this.updateField.bind(this, this.props.item.id, 'itemName')}
                                    inputType="text"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Item Price ($)</label>
                                <ActiveCell
                                    name="price"
                                    value={this.props.item.price}
                                    updateValue={this.updateField.bind(this, this.props.item.id, 'price')}
                                    inputType="number"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="notes">Notes</label>
                                <ActiveCell
                                    name="notes"
                                    value={this.props.item.notes}
                                    updateValue={this.updateField.bind(this, this.props.item.id, 'notes')}
                                    inputType="text"
                                />
                            </div>
                        </div>
                    )
                    : (
                        null
                    )
                }
            </div>
        )
    }
}

export default MoreButton;
