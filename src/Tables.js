import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  setVisibilityFilter,
} from "./actions/actionCreators";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "./actions/actionTypes";
import { bindActionCreators } from "redux";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

class Tables extends Component {
  constructor(props){
    super(props)
    this.state={
     
    }
  }
  render() {
   
  
    return (
      <div>
        <Breadcrumbs
          style={{ marginLeft: "20px", marginTop: "10px" }}
          aria-label="breadcrumb"
        >
          <span
            style={{
              cursor: "pointer",
              color: this.props.visibilityFilter === SHOW_ALL ? "green" : "",
            }}
            onClick={() => this.props.setVisibilityFilter(SHOW_ALL)}
          >
            All
          </span>
          <span
            style={{
              cursor: "pointer",
              color:
                this.props.visibilityFilter === SHOW_COMPLETED ? "green" : "",
            }}
            onClick={() => this.props.setVisibilityFilter(SHOW_COMPLETED)}
          >
            Completed
          </span>
          <span
            style={{
              cursor: "pointer",
              height: "40px",
              color:
                this.props.visibilityFilter === SHOW_ACTIVE ? "green" : null,
            }}
            onClick={() => this.props.setVisibilityFilter(SHOW_ACTIVE)}
          >
            Active
          </span>
        </Breadcrumbs>
        <br />
        <br />
        {this.props.todos.length !== 0 ? (
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Todos</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.id}</TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        style={{
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {todo.text}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      
                    <DeleteIcon
                        style={{cursor:"pointer"}}
                        onClick={() => this.props.deleteTodo(todo.id)}
                      />
                      <CheckCircleOutlineIcon
                      style={{marginLeft:"20px",cursor:"pointer", color:todo.completed?"green":null}}

                        onClick={() => this.props.toggleTodo(todo.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
         
          <div
            style={{ marginTop: "50px" }}
            className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1"
          >
            <div className="alert alert-danger" role="alert">
              Todo List is empty or filter results show no results
            </div>
          </div>
        )}{" "}
      </div>
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter((t) => t.completed);
    case SHOW_ACTIVE:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteTodo,
      toggleTodo,
      setVisibilityFilter,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
