import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      comments: "",
      topic: "raect",
    };
  }
  handleUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleComments = (event) => {
    this.setState({
      comments: event.target.value,
    });
  };

  handleTopic = (event) => {
    this.setState({
      topic: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert(`${this.state.username} ${this.state.comments} ${this.state.topic}`);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsername}
            />
          </div>
          <div>
            <label>Comments</label>
            <textarea
              value={this.state.comments}
              onChange={this.handleComments}
            />
          </div>
          <div>
            <label>Topic</label>
            <select value={this.state.topic} onChange={this.handleTopic}>
              <option value="react">React</option>
              <option value="angular">Angular</option>
              <option value="vue">Vue</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
        <h1>{this.state.username}</h1>
      </div>
    );
  }
}

export default Form;
