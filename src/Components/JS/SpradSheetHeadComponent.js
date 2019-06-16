import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SpreadsheetHead extends Component {

    render() {
        let head = this.props.head_data.map((item) => (<th key={item} onClick={()=>this.props.selectField(item)}>
            <span id="heading">{item}</span>
            <span className={`column-icon ${item==='index' ? "hide-menu" : "visible-menu"}`}>
                <FontAwesomeIcon icon="caret-down" />
                <ul className={`column-heading ${this.props.field_selected.toUpperCase().includes(item) ? "visible-menu" : "hide-menu"}`} >
                    <li onClick={this.props.addColumnLeft}>Add a column Left</li>
                    <li onClick={this.props.addColumnRight}>Add a column Right</li>
                    <li onClick={this.props.sortAtoZ}>Sort A-Z</li>
                    <li onClick={this.props.sortZtoA}>Sort Z-A</li>
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

export default SpreadsheetHead