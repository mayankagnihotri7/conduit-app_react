import React from "react";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/users";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: this.state }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/signIn");
      }
    });
  };

  render() {
    let { username, email, password } = this.state;

    return (
      <div className="register-border text-align">
        <h1 className="register-head">Register here</h1>

        <div className="text-align">
          <input
            type="text"
            name="username"
            onChange={this.handleInput}
            placeholder="Enter username..."
            value={username}
          />
          <input
            type="email"
            name="email"
            onChange={this.handleInput}
            placeholder="Enter E-mail..."
            value={email}
          />
          <input
            type="password"
            name="password"
            onChange={this.handleInput}
            placeholder="Enter desired password..."
            value={password}
          />
          <button onClick={this.handleSubmit}>Sign Up</button>
        </div>

        <div className="signed-in">
          <h3>
            Already registered.? <Link to="signIn"> Sign In </Link>
          </h3>
        </div>
      </div>
    );
  }
}

export default SignUp;
