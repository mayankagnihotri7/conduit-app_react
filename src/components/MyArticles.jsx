import React, { Component } from "react";
import FavArticles from "./FavArticles";
import uuid from "react-uuid";
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
    let { username } = this.props.username;

    let url = `https://conduit.productionready.io/api/articles?author=${username}&limit=5&offset=0`;
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
    console.log(articles, "articles here...");
    if (!articles) {
      return <Loader />;
    }
    return (
      <>
        {/* <div className="flex-2">
          {articles.map((article) => {
            return (
              <div key={uuid()}>
                <div className="border text-align">
                  <img
                    src={article.author.image}
                    alt="coming-soon"
                    className="my-article_image margin-top"
                  />
                  <h3 className="section-user">{article.author.username}</h3>
                  <h5 className="section-date">
                    {article.updatedAt.split("T")[0]}
                  </h5>
                  <h3 className="section-head">{article.title}</h3>
                  <p className="section-para">{article.description}</p>
                  <p>{article.tagList.map((tag) => tag)}</p>
                </div>
              </div>
            );
          })}
        </div> */}
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
