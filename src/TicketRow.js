import React from 'react';
import './App.css';
import { MDBSpinner } from 'mdbreact';

class TicketRow extends React.Component{
    constructor(props){
        super(props)
    }
   
   handleChange = (event) => {
      console.log(event.target.value);
   }
   render(){
       const {name, department, ticket_code, priority, status, message } = this.props
       return (
         <tr className="table-body-row">
            <td> { ticket_code } </td>
            <td> { name } </td>
            <td> { department } </td>
            <td> { priority } </td>
            <td> { message } </td>
            <td><input type="checkbox" onChange={this.handleChange}/>{ status } </td>
         </tr>
        )
    }
} 

export default TicketRow;