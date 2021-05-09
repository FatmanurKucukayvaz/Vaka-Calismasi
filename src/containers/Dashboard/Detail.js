import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, ListGroup, Row, FormText } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Detail() {

    const {id} = useParams();
    const [node, setNode] = useState({});

    useEffect(() => {
        axios.get(`http://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2`).then(res=>{
            res.data.nodes.map((node)=>{
                if(node.accountId === parseInt(id)){
                    setNode(node)
                }
            })
        }).catch(err=> alert("Bir hata oluştu."))
    }, [id, setNode]);
    return (
        <Container style={{marginTop:20}}>
            <Row style={{  backgroundColor:"black", height: '3rem',  alignItems:"center", borderRadius:10, marginTop: 10, marginBottom:10 }}>
                <FormText style={{color: 'white', fontWeight:"600", fontSize:15}}>Detay</FormText>
            </Row>
            <Row>
                {node ? 
                <ListGroup>
                    <ListGroup.Item>Display Name: {node.displayName}</ListGroup.Item>
                    <ListGroup.Item>Accepted Trade Quantity: {node.acceptedTradeQuantity}</ListGroup.Item>
                    <ListGroup.Item>Trade Date: {node.tradeDate}</ListGroup.Item>
                    <ListGroup.Item>Price: {node.price}</ListGroup.Item>
                    <ListGroup.Item>Volume: {node.volume}</ListGroup.Item>
                    <ListGroup.Item>Role: {node.role}</ListGroup.Item>
                    <ListGroup.Item>Account Type: {node.accountType}</ListGroup.Item>
                    <ListGroup.Item>Quantity: {node.quantity}</ListGroup.Item>
                    <ListGroup.Item>Id: {node.id}</ListGroup.Item>
                </ListGroup>
                : null}
            </Row>
        </Container>
    );
}

export default Detail;
