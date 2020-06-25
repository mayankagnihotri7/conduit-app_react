import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Header from "./components/Header";
import Main from "./components/Main";
import Articles from "./components/Articles";
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
    return (
      <>
        <Header click={() => this.handleTags("all")} />
        <Main />
        <div className="container section-flex">
          <Switch>
            <Route
              path="/"
              render={() => (
                <Articles
                  articles={this.state.articles}
                  handleTags={this.handleTags}
                  filtered={this.state.filtered}
                  tags={this.state.tags}
                  tagChange={(tagName) => this.handleTags(tagName)}
                />
              )}
              exact
            />
            <Route path="/signIn" component={SignIn} exact />
            <Route path="/signUp" component={SignUp} exact />
          </Switch>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
