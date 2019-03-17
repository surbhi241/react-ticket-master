import React from 'react';
import './App.css';

function TicketRow(props){
    const {name, department, ticket_code, priority, status, message } = props
   return (
     <tr className="table-body-row">
        <td> { ticket_code } </td>
        <td> { name } </td>
        <td> { department } </td>
        <td> { priority } </td>
        <td> { message } </td>
        <td><input type="checkbox" />{ status } </td>
     </tr>
    )
} 

export default TicketRow;