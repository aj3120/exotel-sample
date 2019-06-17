import React, { Component } from 'react';
import { Table } from 'reactstrap';
import SpreadsheetHead from './SpradSheetHeadComponent';
import SpreadsheetBody from './SpreadSheetBodyComponent';
import '../CSS/SpreadSheet.css'
import { CSVLink } from "react-csv";
import {addRowsAction,addRowCountAction} from '../../Redux/Actions/spreadsheetActions'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
const mapStateToProps = state => {
    return (
        {
            spread_data:state.spreadsheetReducer.spread_data,
            headers:state.spreadsheetReducer.headers,
            add_row_count:state.spreadsheetReducer.add_row_count
        }
    )
}
const mapDispatchToProps = dispatch => {
    return {
        action: bindActionCreators({addRowsAction,addRowCountAction}, dispatch)
    };
};
class SpreadSheet extends Component {

    addRows = (count) => {
        var temp_sheet = [...this.props.spread_data]
        for (var i = 0; i < count; i++) {
            temp_sheet = this.addSingleRow(temp_sheet)
        }
        this.props.action.addRowsAction(temp_sheet)
    }

    addSingleRow = (temp_sheet) => {

        let newRow_initail = { index: temp_sheet.length + 1 }
        let newRow = this.props.headers.reduce((currVal, nextVal) => {
            return ({ ...currVal, [nextVal.label]: '' })
        }, newRow_initail)
        temp_sheet.push(newRow)
        return temp_sheet

    }

    addRowCountChange = (event) => {
        this.props.action.addRowCountAction(event.target.value)
    }

    

    
    render() {
        return (
            <div className="spreadsheet">
                {this.props.match.params.id}
                <Table bordered>
                    <SpreadsheetHead />
                    <SpreadsheetBody />
                </Table>
                <CSVLink data={this.props.spread_data} headers={this.props.headers}>
                    Download me
                </CSVLink>;
                <div className="add-row" >
                    <span>Add row</span>
                    <input type="text" value={this.props.add_row_count} onChange={this.addRowCountChange}></input>
                    <span onClick={() => this.addRows(parseInt(this.props.add_row_count))}>Add</span>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SpreadSheet)