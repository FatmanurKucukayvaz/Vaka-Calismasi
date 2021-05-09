import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import { Line } from 'react-chartjs-2';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import { Row, Col, Container, FormText } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboards() {

    const [graphData, setData] = useState({});
    const [nodes, setNodes] = useState({});
    const history = useHistory();
    
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
    };

    useEffect(() => {
        axios.get(`http://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2`).then(res=>{
            let graphData = {
                labels: res.data.graphData.map(data => moment(data.date).format('DD-MM-YYYY')),
                datasets: [
                    {
                        label: 'equity',
                        data: res.data.graphData.map(data => data.equity),
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            };
            setData(graphData)
            setNodes(res.data.nodes)
        }).catch(err=> alert("Bir hata oluştu."))
    }, [setData, setNodes]);

    return (
        <Container>
            <Col>
                <Row style={{  backgroundColor:"black", height: '3rem',  alignItems:"center", borderRadius:10, marginTop: 10 }}>
                    <FormText style={{color: 'white', fontWeight:"600", fontSize:15}}>Vaka Çalışması</FormText>
                </Row>
                <Row className="justify-content-md-center">
                    <div style={{width:"60%"}}><Line data={graphData} options={options} /></div>
                </Row>
                <Row className="justify-content-md-center">
                <Table style={{marginTop: 100}} virtualized data={nodes} width={700} height={500} 
                    onRowClick={data => {
                    return history.push('/detail/'+data.accountId)
                }}>
                    <Column width={100} align="center" fixed>
                        <HeaderCell>#</HeaderCell>
                        <Cell dataKey="accountId" />
                    </Column>

                    <Column width={200}>
                        <HeaderCell>Account Display Name</HeaderCell>
                        <Cell dataKey="displayName" />
                    </Column>

                    <Column width={200}>
                        <HeaderCell>Account Type</HeaderCell>
                        <Cell dataKey="accountType" />
                    </Column>

                    <Column width={200}>
                        <HeaderCell>Direction</HeaderCell>
                        <Cell dataKey="role" />
                    </Column>
                </Table>
                </Row>
            </Col>
        </Container>
    );
}

export default Dashboards;
