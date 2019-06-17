import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {createNewSheetAction} from '../../Redux/Actions/createNewSheetAction'
import { connect } from "react-redux";
import "../CSS/Dashboard.css";
import { CardDeck,Row } from 'reactstrap';
import {logoutAction} from '../../Redux/Actions/logoutAction'
import CardComponent from './CardComponent'
const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
        action: bindActionCreators({createNewSheetAction,logoutAction}, dispatch)
    };
};
class Content extends Component {

    createSheet=()=>{
        this.props.action.createNewSheetAction()
    }

    logout=()=>{
        this.props.action.logoutAction()
    }

    render() {
        return (
            <div className="dashboard">
                <div className="header">
                    <span onClick={this.logout}>Logout</span>
                </div>
                <CardDeck>
                    <Row>
                    {
                        [1,2,3,4,5,6,7,8,9,10,11,12].map((item)=>
                            <CardComponent key={item} item={item}/>
                        )
                    }
                    </Row> 
                </CardDeck>
                <button onClick={this.createSheet}>Add</button>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
