import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class AddStudent extends Component{
    constructor(props) {
        super(props);
        this.state = {email: '', name:''};
      };
      //assigns name
      handleChange_name = (event) => {
        this.setState({name: event.target.value});
        console.log(this.state.name);
      }
      //assigns email
      handleChange_email = (event) => {
        this.setState({email: event.target.value});
        console.log(this.state.email);
      }

      //Adds student
      handleAdd = () => {
        console.log(this.state.name + " space " + this.state.email);

        const token = Cookies.get('XSRF-TOKEN');

        fetch(`${SERVER_URL}student`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'X-XRSF-TOKEN': token  },
          body: JSON.stringify({email: this.state.email, name: this.state.name})
        } )
        .then(res => {
          if(res.ok) {
            toast.success("Student successfully added", {
                position: toast.POSITION.BOTTOM_LEFT
            });
          } else {
            toast.error("Error when adding", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Post http status =' + res.status);
          }})
        .catch(err =>{
          toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        })
      }

    render()  {
        return(
            <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit" position="center">
                  Add Student
               </Typography>
            </Toolbar>
         </AppBar>
        <div>
            <TextField position="center" style={{marginTop: 15}} label="Student Name" name="student_name" onChange={this.handleChange_name}  />
        </div>
        <div>
            <TextField position="center" style={{marginTop: 15}} label="Student Email" name="student_email" onChange={this.handleChange_email}  />
        </div>
        <div position="center" style={{marginTop: 10}}>
            <Button variant="outlined" style={{marginRight: 10}} color="secondary" onClick={this.handleClose}>
                Cancel
            </Button>
            <Button variant="outlined" style={{marginLeft: 10}} color="primary" onClick={this.handleAdd}>
                Add
            </Button>                    
        </div>
            </div>
        );
    }


}
export default AddStudent;