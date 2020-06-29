import React, { Component } from "react";
import Loader from "./Loader";

class EditArticle extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      article: null,
      slug: props.match.params.slug,
    };
  }

  componentDidMount() {
    let { slug } = this.state;
    const url = `https://conduit.productionready.io/api/articles/${slug}`;
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      authorization: `Token ${localStorage.authToken}`,
    })
      .then((res) => res.json())
      .then((data) => this.setState({ article: data.article }));
  }

  handleInput = ({ target: { name, value } }) => {
    if (this.state.article) {
      let article = this.state.article;
      if (name !== "tagList") {
        article[name] = value;
        this.setState({ article });
      } else {
          value = value.split(',').map(tag => tag.trim());
          article[name] = value;
          this.setState({article})
      }
    }
  };

  handleSubmit = () => {
    let { slug } = this.state;
    const url = `https://conduit.productionready.io/api/articles/${slug}`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: `Token ${localStorage.authToken}` },
      body: JSON.stringify({article: this.state.article})
    }).then(res => {
        console.log(res, 'inside res')
        if (res.status === 200) {
            this.props.history.push(`/articles/${slug}`)
        }
    })
  };

  render() {
    if (!this.state.article) {
      return <Loader />;
    }
    let { title, description, body, tagList } = this.state.article;

    return (
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
            className="margin-textarea"
            value={body}
          />
          <input
            type="text"
            placeholder="Let's tag it.."
            name="tagList"
            onChange={this.handleInput}
            value={tagList.join(', ')}
          />
          <button onClick={this.handleSubmit}>Update</button>
        </div>
      </div>
    );
  }
}

export default EditArticle;
