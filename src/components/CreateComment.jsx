import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import Comment from "./Comment";
// import Loader from "./Loader";

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }

  handleInput = (event) => {
    if (event.target.name === "body") {
      this.setState({ body: event.target.value });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch(
      `https://conduit.productionready.io/api/articles/${this.props.slug}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
        body: JSON.stringify({ comment: { body: this.state.body } }),
      }
    );
    let data = await response.json();
    if (!data.error) {
      this.setState({ body: "" });
      this.props.handleUpdate(true);
    }
  };

  render() {
    let { body, comments } = this.state;
    if (comments) {
      comments.map((comment) => console.log(comment));
    }
    return (
      <>
        <div className="text-align">
          <h1 className="register-head">Let's create Comment..</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="text-align">
              <textarea
                rows="10"
                cols="45"
                placeholder="Can't wait to publish!"
                name="body"
                onChange={this.handleInput}
                className="margin-textarea"
                value={body}
              />
              <button>Create</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(CreateComment);
