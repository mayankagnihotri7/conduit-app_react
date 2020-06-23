import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Articles from "./components/Articles";
import Tags from "./components/Tags";
import Footer from "./components/Footer";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      tags: [],
      filtered: "all",
    };
  }

  componentDidMount() {
    //   Articles
    fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=0`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ articles: data.articles });
      });

    //   Tags
    fetch(`https://conduit.productionready.io/api/tags`)
      .then((res) => res.json())
      .then((data) => this.setState({ tags: data.tags }));
  }

  handleTags = (tagName) => {
    if (tagName === "all") {
      fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=0`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "hi");
          this.setState({ articles: data.articles, filtered: tagName });
        });
    } else {
      fetch(
        `https://conduit.productionready.io/api/articles?tag=${tagName}&limit=10&offset=0`
      )
        .then((res) => res.json())
        .then((data) =>
          this.setState({ articles: data.articles, filtered: tagName })
        );
    }
  };

  render() {
    console.log(this.state.articles);
    console.log(this.state.tags);
    return (
      <>
        <Header click={() => this.handleTags("all")} />
        <Main />
        <div className="container section-flex">
          <Articles
            articles={this.state.articles}
            handleTags={this.handleTags}
            filtered={this.state.filtered}
          />
          <Tags
            tags={this.state.tags}
            tagChange={(tagName) => this.handleTags(tagName)}
          />
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
