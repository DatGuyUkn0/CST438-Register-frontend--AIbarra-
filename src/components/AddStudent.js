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

      handleChange_name = (event) => {
        this.setState({name:{student_name: event.target.value}});
      }
      handleChange_email = (event) => {
        this.setState({email:{student_email: event.target.value}});
      }

      handleAdd = () => {
        console.log(this.state.name + " space " + this.state.email);

        const token = Cookies.get('XSRF-TOKEN');

        fetch(`${SERVER_URL}student`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'X-XRSF-TOKEN': token  },
          body: JSON.stringify({email: this.state.email, name: this.state.name})
        })
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

        <TextField autoFocus fullWidth label="Student Name" name="student_name" onChange={this.handleChange_name}  />

        <TextField autoFocus fullWidth label="Student Email" name="student_email" onChange={this.handleChange_email}  />

        <Button color="secondary" onClick={this.handleClose}>
            Cancel
        </Button>
        <Button color="primary" onClick={this.handleAdd}>
            Add
        </Button>                    

            </div>
        );
    }


}
    AddStudent.propTypes = {
    addStudent : PropTypes.func.isRequired
    }

export default AddStudent;