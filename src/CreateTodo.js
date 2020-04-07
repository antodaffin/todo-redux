import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "./actions/actionCreators";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todotext: "",
      error:false
    };
    this.onChangeTodoText = this.onChangeTodoText.bind(this);
    this.keyPress = this.keyPress.bind(this);
 
  }

  onChangeTodoText(e) {
    this.setState({
      todotext: e.target.value,
      error:false
    });
  }
  addTodo = () => {
    if (this.state.todotext == "") {
        this.setState({
           error:true
        });
      return null
    
    } else {
      this.props.addTodo(this.state.todotext);
      this.setState({ todotext: "",
      error:false
     });
    }
  };
  keyPress(e){
    if(e.keyCode == 13){
        this.addTodo()
       console.log('value', e.target.value);
       // put the login here
    }
 }

  render() {
    return (
      <div>
        {/* <Grid container spacing={3}>
          <Grid item xs={12}>
          */}
          <p style={{color:"red"}}>{this.state.error?'Error!!! Please add the task':null}</p>
            <TextField
              onChange={this.onChangeTodoText}
              value={this.state.todotext}
              type="text"
              id="standard-basic"
              label="Add Todo"
              onKeyDown={this.keyPress} 
            />
            
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => this.setState({ todotext: "" })}
              style={{ marginTop: "25px", marginRight: "15px",marginLeft:"15px" }}
             
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => this.addTodo()}
              style={{ marginTop: "25px" }}
              
            >
              Add Todo
            </Button>
         
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTodo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(CreateTodo);
