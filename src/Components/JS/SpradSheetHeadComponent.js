import React, { Component } from 'react';

class SpreadsheetHead extends Component {

    render() {
        let head=this.props.head_data.map((item)=><th key={item} onClick={()=>this.props.addColumn(item)}>{item}</th>)
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