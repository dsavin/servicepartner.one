import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class WorkForceForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      rooms: [{ value: '' }],
    };
  }

  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }

  handleRoomValueChange = (idx) => (evt) => {
    const newRooms = this.state.rooms.map((room, sidx) => {
      if (idx !== sidx) return room;
      return { ...room, value: evt.target.value };
    });

    this.setState({ rooms: newRooms });
  }

  handleSubmit = (evt) => {
    const { name, rooms } = this.state;

    const roomsToSend = rooms.map(room => room.value);

    const payLoad = { rooms: roomsToSend }


    axios.post('http://localhost:3000/api/optimize', payLoad)
      .then(function(response){
        console.log(response);
        //Perform action based on response
      })
      .catch(function(error){
        console.log(error);
        //Perform action based on error
      });
  }

  handleAddRoom = () => {
    this.setState({ rooms: this.state.rooms.concat([{ value: '' }]) });
  }

  handleRemoveRoom = (idx) => () => {
    this.setState({ rooms: this.state.rooms.filter((s, sidx) => idx !== sidx) });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
  <input
    type="text"
    placeholder="Company name, e.g. Magic Everywhere LLC"
    value={this.state.name}
    onChange={this.handleNameChange}
    />

    <h4>Rooms</h4>

    {this.state.rooms.map((room, idx) => (
      <div className="room">
      <input
      type="number"
      placeholder={``}
      value={room.value}
      onChange={this.handleRoomValueChange(idx)}
      />
      <button type="button" onClick={this.handleRemoveRoom(idx)} className="small">-</button>
      </div>
    ))}
  <button type="button" onClick={this.handleAddRoom} className="small">Add Room</button>
    <button>Optimize</button>
    </form>
  )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">WorkForce Optimizator</h1>
        </header>
        <WorkForceForm />

      </div>
    );
  }
}

export default App;
