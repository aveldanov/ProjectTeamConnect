import React, { Component } from 'react'

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
          {this.state.names.map((item, index) => {
            return <li key={index}>{item.name} <button onClick={() => this.handleDelete(index)}>Delete</button></li>
          })}
        </ul>



        <h3>{this.state.value}</h3>

        <input onChange={this.handleChange} value={this.state.value} />
        <button onClick={this.handleAdd}>Add item</button>
      </div>
    )
  }
}

export default form
