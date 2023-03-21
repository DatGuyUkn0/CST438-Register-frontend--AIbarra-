import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class AddStudent extends Component{
    constructor(props) {
        super(props);
        this.state = {open: false, name:{ }, email:{ }};
      };

      handleClickOpen = () => {
        this.setState( {open:true} );
      };
  
      handleClose = () => {
        this.setState( {open:false} );
      };
      handleChange_name = (event) => {
        this.setState({name:{student_name: event.target.value}});
      }
      handleChange_email = (event) => {
        this.setState({email:{student_email: event.target.value}});
      }
      handleAdd = () => {
        this.props.AddStudent(this.state.name,this.state.email);
        this.handleClose();
      }
    render()  {
        return(
            <div>
                <Button variant="outlined" color='primary' style={{margin: 10}} onClick={this.handleClickOpen}>
                    Add Student
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add Student</DialogTitle>
                    <DialogContent style={{paddingTop: 20}}>
                        <TextField autoFocus fullWidth label="Student Name" name="student_name" onChange={this.handleChange_name}  />
                    </DialogContent>
                    <DialogContent style={{paddingTop: 20}}>
                        <TextField autoFocus fullWidth label="Student Email" name="student_email" onChange={this.handleChange_email}  />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.handleAdd}>
                            Add Student
                        </Button>                    
                    </DialogActions>
                </Dialog>
            </div>
        );

    }


}
    AddStudent.propTypes = {
    addStudent : PropTypes.func.isRequired
    }

export default AddStudent;