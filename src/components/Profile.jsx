import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  componentDidMount() {
    let { username } = this.props;
    let url = `https://conduit.productionready.io/api/profiles/${username}`;
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      authorization: `Token ${localStorage.authToken}`,
    }).then(res => res.json()).then(data => this.setState({profile: data}));
  }

  render() {
    console.log(this.state, 'profile here');
    return <div></div>;
  }
}

export default Profile;
