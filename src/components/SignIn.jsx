import React from "react";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/users/login";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: this.state }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    let { email, password } = this.state;

    return (
      <div className="register-border text-align">
        <h1 className="register-head">Let's Login!</h1>
        <div className="text-align">
          <input
            type="email"
            onChange={this.handleInput}
            name="email"
            placeholder="Enter E-mail..."
            value={email}
          />
          <input
            type="password"
            name="password"
            onChange={this.handleInput}
            placeholder="Enter password..."
            value={password}
          />
          <input type="submit" value="Sign In" onClick={this.handleSubmit} />
        </div>
        <div className="signed-in">
          <h3>
            Not registered.? <Link to="signUp"> Sign Up </Link>
          </h3>
        </div>
      </div>
    );
  }
}

export default SignIn;
