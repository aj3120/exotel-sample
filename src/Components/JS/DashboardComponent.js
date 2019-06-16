import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../CSS/Dashboard.css";
import { CardDeck,Row } from 'reactstrap';

import CardComponent from './CardComponent'
const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
        action: bindActionCreators({}, dispatch)
    };
};
class Content extends Component {

    render() {
        return (
            <div className="dashboard">
                <CardDeck>
                    <Row>
                    {
                        [1,2,3,4,5,6,7,8,9,10,11,12].map((item)=>
                            <CardComponent key={item} item={item}/>
                        )
                    }
                    </Row> 
                </CardDeck>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
