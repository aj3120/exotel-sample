import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {selectFieldAction,addLeftColumnAction,addRightColumnAction,sortAtoZAction,sortZtoAAction} from '../../Redux/Actions/spreadsheetActions'
const mapStateToProps = state => {
    return (
        {
            spread_data:state.spreadsheetReducer.spread_data,
            headers:state.spreadsheetReducer.headers,
            field_selected:state.spreadsheetReducer.field_selected,
            head_data:Object.keys(state.spreadsheetReducer.spread_data[0])
        }
    )
}
const mapDispatchToProps = dispatch => {
    return {
        action: bindActionCreators({selectFieldAction,addLeftColumnAction,addRightColumnAction,sortAtoZAction,sortZtoAAction}, dispatch)
    };
};

class SpreadsheetHead extends Component {
   
    selectField = (field_selected) => {
        this.props.action.selectFieldAction(field_selected)
    }

    addColumnLeft = (e) => {
        e.stopPropagation();
        let split_header_index = null
        this.props.headers.forEach((item, index) => {
            if (item.label === this.props.field_selected) {
                split_header_index = index
            }
        })

        let prev_header = this.props.headers.slice(0, split_header_index)
        let after_header = this.props.headers.slice(split_header_index, this.props.headers.length)

        let new_spread_data = this.props.spread_data.map((item) => {
            let prev_data = prev_header.reduce((currVal, nextVal) => {
                return { ...currVal, [nextVal.label]: item[nextVal.label] }
            }, { index: item.index })

            let add_empty = { ...prev_data, [this.props.field_selected]: '' }

            let after_data = after_header.reduce((currVal, nextVal) => {
                return { ...currVal, [String.fromCharCode(nextVal.label.charCodeAt() + 1)]: item[nextVal.label] }
            }, {})
            return { ...add_empty, ...after_data }
        })

        let temp_header = [...this.props.headers]
        let new_head = String.fromCharCode((temp_header[temp_header.length - 1].label.charCodeAt()) + 1)
        temp_header.push({ label: new_head, key: new_head })
        this.props.action.addLeftColumnAction(new_spread_data)
    }

    addColumnRight = (e) => {
        e.stopPropagation();
        let split_header_index = null
        this.props.headers.forEach((item, index) => {
            if (item.label === this.props.field_selected) {
                split_header_index = index
            }
        })

        let prev_header = this.props.headers.slice(0, split_header_index + 1)
        let after_header = this.props.headers.slice(split_header_index + 1, this.props.headers.length)

        let new_spread_data = this.props.spread_data.map((item) => {
            let prev_data = prev_header.reduce((currVal, nextVal) => {
                return { ...currVal, [nextVal.label]: item[nextVal.label] }
            }, { index: item.index })

            let add_empty = { ...prev_data, [String.fromCharCode(this.props.field_selected.charCodeAt() + 1)]: '' }

            let after_data = after_header.reduce((currVal, nextVal) => {
                return { ...currVal, [String.fromCharCode(nextVal.label.charCodeAt() + 1)]: item[nextVal.label] }
            }, {})
            return { ...add_empty, ...after_data }
        })

        let temp_header = [...this.props.headers]
        let new_head = String.fromCharCode((temp_header[temp_header.length - 1].label.charCodeAt()) + 1)
        temp_header.push({ label: new_head, key: new_head })
        this.props.action.addRightColumnAction(new_spread_data)
    }

    sortColumnAtoZ = (e) => {
        e.stopPropagation();
        let spread_data_temp = [...this.props.spread_data]
        spread_data_temp = spread_data_temp.sort((a, b) => {
            if (a[this.props.field_selected] !== '') {
                if (b[this.props.field_selected].toUpperCase() >= a[this.props.field_selected].toUpperCase() || b[this.props.field_selected] !== '')
                    return -1
                return 1
            }
            else {
                return 0
            }
        })
        spread_data_temp.forEach((item, index) => {
            item.index = index + 1
        })
        this.props.action.sortAtoZAction(spread_data_temp)
    }

    sortColumnZtoA = (e) => {
        e.stopPropagation();
        let spread_data_temp = [...this.props.spread_data]

        spread_data_temp = spread_data_temp.sort((a, b) => {
            if (a[this.props.field_selected] !== '') {
                if (b[this.props.field_selected].toUpperCase() <= a[this.props.field_selected].toUpperCase())
                    return -1
                return 1
            }
            else {
                return 0
            }

        })
        spread_data_temp.forEach((item, index) => {
            item.index = index + 1
        })
        this.props.action.sortZtoAAction(spread_data_temp)
    }

    render() {
        let head = this.props.head_data.map((item) => (<th key={item} onClick={() => this.selectField(item)}>
            <span id="heading">{item}</span>
            <span className={`column-icon ${item === 'index' ? "hide-menu" : "visible-menu"}`}>
                <FontAwesomeIcon icon="caret-down" />
                <ul className={`column-heading ${this.props.field_selected.toUpperCase().includes(item) ? "visible-menu" : "hide-menu"}`} >
                    <li onClick={this.addColumnLeft}>Add a column Left</li>
                    <li onClick={this.addColumnRight}>Add a column Right</li>
                    <li onClick={this.sortColumnAtoZ}>Sort A-Z</li>
                    <li onClick={this.sortColumnZtoA}>Sort Z-A</li>
                </ul>
            </span>
        </th>)
        )
        return (
            <thead>
                <tr>
                    {head}
                </tr>
            </thead>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SpreadsheetHead)