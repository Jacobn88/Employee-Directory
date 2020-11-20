import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    dropDownValue: "Select an item"
  };
  filterByName = (event) => {
    const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(event.target.value.toLowerCase()));
    this.setState({ friends: filteredFriends });
  }
  sortByProperty = (event, property) => {
    this.changeValue(event.target.textContent);
    const sortedFriends = this.state.friends.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.setState({ sortedFriends });
  }
  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };
  changeValue(text) {
    this.setState({ dropDownValue: text })
  }
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <DropdownButton id="dropdown-basic-button" title={this.state.dropDownValue}>
          <Dropdown.Item onClick={event => this.sortByProperty(event, "name")}>Name</Dropdown.Item>
          <Dropdown.Item onClick={event => this.sortByProperty(event, "occupation")}>Occupation</Dropdown.Item>
          <Dropdown.Item onClick={event => this.sortByProperty(event, "location")}>Location</Dropdown.Item>
        </DropdownButton>

        <label>
          Name Filter: <input type="text" name="name" onInput={this.filterByName} />
        </label>

        <Title>Employee List</Title>

        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
