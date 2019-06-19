import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Card, CardImg, CardTitle, CardBody, Col } from 'reactstrap';
import {createNewSheetAction} from '../../Redux/Actions/createNewSheetAction'
import { connect } from "react-redux";
import "../CSS/Dashboard.css";
import { CardDeck,Row } from 'reactstrap';
import {logoutAction} from '../../Redux/Actions/logoutAction'
import CardComponent from './CardComponent'
const mapStateToProps = state => {
    return {
        spreadsheet_array:state.loginReducer.spreadsheet_array
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
                <img width="100%" src="/assets/timeline.jpg" alt="timeline"/>
                    <button className="logout" onClick={this.logout}>Logout</button>
                </div>
                <div className="main-section">                
                    <CardDeck>
                    <Row>
                    {
                        this.props.spreadsheet_array.map((item)=>
                            <CardComponent key={item._id} item={item._id}/>
                        )
                        

                    }
                    <Col  onClick={this.createSheet} xs="6" sm="4" md="3" lg="2">
                            <Card>
                                <CardImg top width="20%" src="/assets/add.png" alt="add" />
                                <CardBody>
                                    <CardTitle>Add New</CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row> 
                </CardDeck>
                </div>

                
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
