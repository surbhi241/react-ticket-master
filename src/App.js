//day -35 implementation of ticket master the react app.
import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from 'axios';
import { MDBProgress } from 'mdbreact';
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
        high: [],
        medium: [],
        low: [],
        sales: [],
        technical: [],
        hr: [],
        progress: []
    }
    this.handleAddTicket = this.handleAddTicket.bind(this);
  }

  componentDidMount(){
   axios.get('https://dct-api-data.herokuapp.com/tickets?api_key=fcf288fccfbad724')
      .then(response => {
          console.log("array:", response.data);
          this.setState(() => ({tickets: response.data, allTickets: response.data}))
          this.setState((prevState) => ({high: prevState.tickets.filter(ticket => ticket.priority === "high"||ticket.priority === "High")}))
          this.setState((prevState) => ({medium: prevState.tickets.filter(ticket => ticket.priority === "Medium" )}))
          this.setState((prevState) => ({low: prevState.tickets.filter(ticket => ticket.priority === "low" )}))
          this.setState((prevState) => ({sales: prevState.tickets.filter(ticket => ticket.department === "technical"||ticket.department === "Technical" )}))
          this.setState((prevState) => ({technical: prevState.tickets.filter(ticket => ticket.department === "Sales" )}))
          this.setState((prevState) => ({hr: prevState.tickets.filter(ticket => ticket.department === "Hr")}))
          this.setState((prevState) => ({progress: prevState.tickets.filter(ticket => ticket.status === "completed")}))
          console.log("Priority high data:",this.state.high, this.state.medium, this.state.low, this.state.progress);
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

  handleProgressBar = (progress) => {
    this.setState((prevState) => ({progress: prevState.tickets.filter(ticket => ticket.status === "completed")}))
  }

  render() {
    const progressPercentage = this.state.progress.length/this.state.tickets.length * 100
    console.log(progressPercentage, this.state.progress.length , this.state.tickets.length);
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
                      <Button color="blue-grey">All</Button>
                      <Button color="blue-grey">High</Button>
                      <Button color="blue-grey">Medium</Button>
                      <Button color="blue-grey">Low</Button>
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
                <Col md="8">
                  <MDBProgress color="success" value={progressPercentage}> {progressPercentage}% </MDBProgress>
                </Col>
              </Row>
              <Row>
                <Col md="4" className="chart">
                   <Chart
                    width={'340px'}
                    height={'300px'}
                    margin={'10px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Priority', 'Task'],
                      ['High', this.state.high.length],
                      ['Medium', this.state.medium.length],
                      ['Low', this.state.low.length]
                    ]}
                    options={{
                      title: 'Ticket Priority %',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                  />
                </Col>
                <Col md="4" className="chart">
                  <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Department', 'Count'],
                      ['Sales', this.state.sales.length],
                      ['Technical', this.state.technical.length],
                      ['Hr', this.state.hr.length],
                    ]}
                    options={{
                      chart: {
                        title: 'Tickets By Department',
                      },
                    }}
                    rootProps={{ 'data-testid': '2' }}
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