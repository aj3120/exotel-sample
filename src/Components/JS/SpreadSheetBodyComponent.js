import React, { Component } from 'react';

class SpreadsheetBody extends Component {

    render() {
        let body=this.props.body_data.map((item)=>{
            return(
                <tr key={item.index}>
                            <th scope="row">{item.index}</th>
                            {   
                                Object.keys(item).filter((key)=>key!=='index').map((key)=><td key={key}><input className="cell" value={item[key]} onChange={(event)=>this.props.onCellChange(event,item,key)}></input></td>)
                            }
                </tr>
            )
        })
        return(
            <tbody>
                {body}
            </tbody>
        );
    }
}

export default SpreadsheetBody