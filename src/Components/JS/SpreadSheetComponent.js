import React, { Component } from 'react';
import { Table } from 'reactstrap';
import SpreadsheetHead from './SpradSheetHeadComponent';
import SpreadsheetBody from './SpreadSheetBodyComponent';
import {Link} from 'react-router-dom';
import {logoutAction} from '../../Redux/Actions/logoutAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../CSS/SpreadSheet.css';
import { CSVLink } from "react-csv";
import {addRowsAction,addRowCountAction,getSheetDataAction,updateSheetDataAction} from '../../Redux/Actions/spreadsheetActions'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
const mapStateToProps = state => {
    return (
        {
            spread_data:state.spreadsheetReducer.spread_data,
            headers:state.spreadsheetReducer.headers,
            add_row_count:state.spreadsheetReducer.add_row_count,
            sheet_id:state.router.location.pathname.split('/')[2],
            user:state.loginReducer.username
        }
    )
}
const mapDispatchToProps = dispatch => {
    return {
        action: bindActionCreators({addRowsAction,addRowCountAction,logoutAction,getSheetDataAction,updateSheetDataAction}, dispatch)
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

    
    logout=()=>{
        this.props.action.logoutAction()
    }
    updateSheet=()=>{
        this.props.action.updateSheetDataAction({id:this.props.sheet_id,user:this.props.user,data:{spread_data:this.props.spread_data,headers:this.props.headers}})
    }

    componentDidMount(){
        console.log(this.props)
        this.props.action.getSheetDataAction({id:this.props.sheet_id,user:this.props.user})
    }
    
    render() {
        return (
            <div className="spreadsheet">
                <div className="spradsheet-header">
                    <Link className="arrow-left" to="/dashboard"><FontAwesomeIcon icon="arrow-left" size="3x" color="#57b846"/></Link>
                    <button className="logout-spreadsheet" onClick={this.logout}>
                        Logout
                    </button>
                </div>
                <Table bordered striped>
                    <SpreadsheetHead />
                    <SpreadsheetBody />
                </Table>
                <CSVLink data={this.props.spread_data} headers={this.props.headers}>
                    <img className="download" src="/assets/download.png" alt="download"/>
                </CSVLink>
                <button className="saveicon" onClick={this.updateSheet}>Save</button>
                <div className="add-row" >
                    <span>Add row</span>
                    <input type="text" value={this.props.add_row_count} onChange={this.addRowCountChange}></input>
                    <button className="addicon"onClick={() => this.addRows(parseInt(this.props.add_row_count))}>Add</button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SpreadSheet)