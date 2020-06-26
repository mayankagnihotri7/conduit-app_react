import React from "react";

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      description: "",
      tagList: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/articles";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ article: this.state }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    let { title, body, description, tagList } = this.state;

    return (
      <>
        <div className="register-border text-align">
          <h1 className="register-head">Let's create Article..</h1>

          <div className="text-align">
            <input
              type="text"
              placeholder="Let's start with a title"
              name="title"
              onChange={this.handleInput}
              value={title}
            />
            <input
              type="text"
              placeholder="Tell us what it's about"
              name="description"
              onChange={this.handleInput}
              value={description}
            />
            <textarea
              rows="10"
              cols="55"
              placeholder="Can't wait to publish!"
              name="body"
              onChange={this.handleInput}
              className='margin-textarea'
              value={body}
            />
            <input
              type="text"
              placeholder="Let's tag it.."
              name="tagList"
              onChange={this.handleInput}
              value={tagList}
            />
            <button onClick={this.handleSubmit}>Publish</button>
          </div>
        </div>
      </>
    );
  }
}

export default CreateArticle;
