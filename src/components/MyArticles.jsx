import React, { Component } from "react";
import FavArticles from "./FavArticles";
import Loader from "./Loader";

class MyArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      filtered: "myArticles",
    };
  }

  componentDidMount() {

    let url = `https://conduit.productionready.io/api/articles?author=${this.props.username}&limit=5&offset=0`;
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      authorization: `Token ${localStorage.authToken}`,
    })
      .then((res) => res.json())
      .then((data) => this.setState({ articles: data.articles }));
  }

  handleArticles = (username) => {
    if (username === "myArticles") {
      let { username } = this.props.username;

      let url = `https://conduit.productionready.io/api/articles?author=${username}&limit=5&offset=0`;
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        authorization: `Token ${localStorage.authToken}`,
      })
        .then((res) => res.json())
        .then((data) => this.setState({ articles: data.articles }));
    } else {
      let { username } = this.props.username;
      let url = `https://conduit.productionready.io/api/articles?favorited=${username}&limit=5&offset=0`;
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        authorization: `Token ${localStorage.authToken}`,
      })
        .then((res) => res.json())
        .then((data) => this.setState({ articles: data.articles }));
    }
  };

  render() {
    let { articles } = this.state;
    if (!articles) {
      return <Loader />;
    }
    return (
      <>
        <FavArticles
          username={this.props.username}
          articles={this.state.articles}
          handleArticles={(username) => this.handleArticles(username)}
        />
      </>
    );
  }
}

export default MyArticles;
