import React from 'react';
import './App.css';
import axios from 'axios';

class TicketForm extends React.Component{
   constructor(props){
    super()
      this.state = {
       name: "",
       department: "",
       priority: "",
       message:"",
       FormData: []
      }
   }
   
   handleSubmit = (e) =>{
      e.preventDefault();
      const formDetail ={
        name: this.state.name,
        department: this.state.department,
        priority: this.state.priority,
        message: this.state.message
      }
      this.state.FormData.push(formDetail);
      console.log(formDetail);
      console.log(this.state.FormData);

      axios.post('http://dct-api-data.herokuapp.com/tickets?api_key=fcf288fccfbad724', formDetail)
        .then(response => {
          console.log(response.data);
          this.props.handleAddTicket(response.data);
          this.setState(() => ({
            name: '',
            department: '',
            priority: '',
            message: ''   
          }))
        })
        .catch(err => {
          console.log(err);
        })
   }

   handleNameChange = (e) =>{
     const name = e.target.value;
     this.setState(() => ({name}))
   }

   handleDepartmentChange = (e) =>{
    const department = e.target.value;
    this.setState(() => ({department}))
   }

   handlePriorityChange = (e) =>{
    const priority = e.target.value;
    this.setState(() => ({priority}))
   }

   handleMessageChange = (e) =>{
    const message = e.target.value;
    this.setState(() => ({message}))
   }
   
   
   render() {
    return (
      <div className="ticket-Form">
         <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                 <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter Name" value={this.state.name} onChange={this.handleNameChange}/>
              </div>  
               <div className="form-group">
                 <label>Department</label>
                 <select className="form-control" id="Select1" placeholder="Select Department" value={this.state.department} onChange={this.handleDepartmentChange}>
                    <option>Select Department</option>
                    <option>Technical</option>
                    <option>Sales</option>
                    <option>Hr</option>
                  </select>
              </div> 
               <div className="form-group">
                <label>Priority</label>
                <select className="form-control" id="Select2" placeholder="Select priority" value={this.state.priority} onChange={this.handlePriorityChange}>
                    <option>Select priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
              </div> 
               <div className="form-group">
                 <label>Message</label>
                 <textarea className="form-control" id="TextareaMsg" row="2" value={this.state.message} onChange={this.handleMessageChange}></textarea>
              </div> 
            <input type="submit" className="btn btn-primary" />
        </form>
      </div>
      )
   }
 }

export default TicketForm;