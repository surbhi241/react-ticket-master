import React from 'react';
import TicketRow from './TicketRow.js';
import { Table } from 'reactstrap';

function TicketsTable(props) {
    const { tickets } = props; 
  return (
    <div>           
       <Table responsive striped size="sm">
        <thead className="table-head" >
          <tr>
            <th> Code </th>
            <th> Name </th>
            <th> Department </th>
            <th> Priority </th>
            <th> Message </th>
            <th> Status </th>
          </tr>
        </thead>
        <tbody className="table-body">
          {tickets.map(tickets => {
              return (
                <TicketRow key={tickets.ticket_code}
                  {...tickets}
                 />
              ) 
          })}
        </tbody>
      </Table>
    </div>    
        )
}

export default TicketsTable;