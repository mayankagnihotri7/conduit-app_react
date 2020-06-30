import React, { Component } from "react";
import Loader from "./Loader";

class EditProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const url = `https://conduit.productionready.io/api/user`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ user }) => this.setState({ user }));
  }

  handleInput = ({ target: { name, value } }) => {
    if (this.state.user) {
      let user = this.state.user;
      user[name] = value;
      this.setState({ user });
    }
  };

  handleUpdate = () => {
    alert("click");
    const url = `https://conduit.productionready.io/api/user`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ user: this.state.user }),
    }).then(res => {
      if (res.status === 200) {
        this.props.history.push('/')
      }
    });
  };

  render() {
    if (!this.state.user) {
      return <Loader />;
    }
    let { image, username, bio, email } = this.state.user;
    console.log(email, "inside state");
    return (
      <div className="register-border text-align">
        <h1 className="register-head">Let's edit Profile..</h1>

        <div className="text-align">
          <input
            type="text"
            placeholder="Let's start with a title"
            name="image"
            onChange={this.handleInput}
            value={image}
          />
          <input
            type="text"
            placeholder="Tell us what it's about"
            name="username"
            onChange={this.handleInput}
            value={username}
          />
          <input
            type="email"
            placeholder="Tell us what it's about"
            name="email"
            onChange={this.handleInput}
            value={email}
          />
          <textarea
            // rows="10"
            cols="55"
            placeholder="Can't wait to publish!"
            name="bio"
            onChange={this.handleInput}
            className="margin-textarea"
            value={bio}
          />
        </div>
        <button onClick={this.handleUpdate}>Update</button>
      </div>
    );
  }
}

export default EditProfileSettings;
