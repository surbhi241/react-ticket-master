//day -35 implementation of ticket master the react app.
import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import TicketsTable from './TicketsTable.js';
import TicketForm from './TicketForm.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Container, Row, Col, Button, ButtonGroup } from 'reactstrap';



class App extends Component {
  constructor(){
    super()
    this.state = { 
        value: '',
        tickets: [],
        allTickets: [],
        priority: [],
        high: []
    }
    this.handleAddTicket = this.handleAddTicket.bind(this);
  }

  componentDidMount(){
   axios.get('https://dct-api-data.herokuapp.com/tickets?api_key=fcf288fccfbad724')
      .then(response => {
          console.log("array:", response.data);
          this.setState(() => ({tickets: response.data, allTickets: response.data}))
      })
      .catch(err => {
          console.log(err);
      })
  }
  
  handleSearch = (e) =>{
    const value = e.target.value.toUpperCase();
    console.log(value);
    this.setState((prevState) => ({value: value, allTickets: prevState.tickets.filter(ticket => ticket.ticket_code.toUpperCase().indexOf(value) > -1)}))
  }
 
  handleAddTicket(ticketsData){
     this.setState((prevState) => ({
      tickets: [...prevState.allTickets, ticketsData]
     }))
  }

  handleChart = () => {
    this.setState((prevState) => ({high: prevState.tickets.filter(ticket => ticket.priority === "high")}))
    console.log("Priority high data:",this.state.high);
  }

  render() {
    return (
      <div className="App">
        <Container>
          <h1 className="Heading"> Ticket Master</h1>
            <div className="clearfix">
              <Input type="text" id="Search-Input" placeholder="Search by Code" value={this.state.value} onChange={this.handleSearch} />
            </div>
            <Container>
              <Row className="priority-wrapper">
                <Col md="4">
                    <h2 className="listing">Listing tickets - {this.state.tickets.length}</h2>
                </Col>
                <Col md="4">
                    <ButtonGroup>
                      <Button>All</Button>
                      <Button>High</Button>
                      <Button>Medium</Button>
                      <Button>Low</Button>
                    </ButtonGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                    <TicketsTable tickets={this.state.allTickets} handleAddTicket={this.handleAddTicket}/>
                </Col>
                <Col md="4">
                    <TicketForm {...this.state.tickets} handleAddTicket={this.handleAddTicket}/>
                </Col>
              </Row>
              <Row>
                <Button onClick={this.handleChart}>Get chart</Button>
                <Col md="4">
                   <Chart
                    width={'400px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Priority', 'Task'],
                      ['High', 2],
                      ['Medium', 2],
                      ['Low', 2],
                    ]}
                    options={{
                      title: 'Ticket Priority %',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                  />
                </Col>
              </Row>
            </Container>
        </Container>
      </div>
    )
  }
}

/*{//fcf288fccfbad724}*/
export default App;

/*
{this.state.allTickets.map(ticket => ({ticket.})}
 }
*/