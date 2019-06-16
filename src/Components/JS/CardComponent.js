import { Card, CardImg, CardTitle, CardBody, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import React from 'react';
const CardComponent=function(props){
    return(
        <Col xs="6" sm="4" md="3" lg="2">
            <Link to={`/spreadsheet/${props.item}`}>
            <Card>
                <CardImg top width="20%" src="/assets/sheets.png" alt="Card image cap" />
                <CardBody>
                    <CardTitle>Card title</CardTitle>
                </CardBody>
            </Card>
            </Link>
        </Col>
    )
}
export default CardComponent