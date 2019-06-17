import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {cellChangeAction} from '../../Redux/Actions/spreadsheetActions'
const mapStateToProps = state => {
    return (
        {
            spread_data:state.spreadsheetReducer.spread_data,
        }
    )
}
const mapDispatchToProps = dispatch => {
    return {
        action: bindActionCreators({cellChangeAction}, dispatch)
    };
};
class SpreadsheetBody extends Component {
    onCellChange = (event, index_tochange, key_tochange) => {
        let temp_sheet = [...this.props.spread_data]
        temp_sheet.find((element) => element.index === index_tochange.index)[key_tochange] = event.target.value;
        this.props.action.cellChangeAction(temp_sheet)
    }
    render() {
        var body=this.props.spread_data.map((item)=>{
            return(
                <tr key={item.index}>
                            <th scope="row">{item.index}</th>
                            {   
                                Object.keys(item).filter((key)=>key!=='index').map((key)=><td key={key}><input className="cell" value={item[key]} onChange={(event)=>this.onCellChange(event,item,key)}></input></td>)
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

export default connect(mapStateToProps,mapDispatchToProps)(SpreadsheetBody)