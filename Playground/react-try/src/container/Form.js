import React, { Component } from 'react';
import { connect } from 'react-redux';


export class form extends Component {

  state = {
    names: [{
      name: 'Anton'
    },
    { name: 'Ivan' }],
    value: 'new'
  }
    ;




  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    })

  }

  handleAdd = () => {
    this.setState({
      names: [...this.state.names,
      { name: this.state.value }
      ],
      value: ''
    })
  }


  handleDelete = (i) => {

    // console.log(i);

    this.setState({
      names: this.state.names.filter((item, j) => {
        console.log(item.name);
        console.log("i =", i);
        console.log("j =", j);
        return i !== j
      })
    })
  }


  render() {
    return (
      <div>


        <ul>
          {
            this.props.nms.map((item, index) => {
              return <li key={index}>{item.name} <button onClick={() => this.props.onDeleteName(index)}>Delete</button></li>
            })}
        </ul>



        <h3>{this.props.val}</h3>

        <input onChange={this.handleChange} value={this.props.val} />
        <button onClick={this.props.onAddName}>Add item</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);

  return {
    nms: state.names,
    val: state.value
  }
}

const mapDispatchToProps = (dispatch, index) => {
  return ({
    onAddName: () => dispatch({ type: 'ADD_NAME' }),
    onDeleteName: (index) => dispatch({ type: 'DELETE_NAME', index })
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(form);
