import React from "react";
import { Route, Switch } from "react-router-dom";
import Error from "./components/Error";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Main from "./components/Main";
import Articles from "./components/Articles";
import CreateArticle from "./components/CreateArticle";
import SingleArticle from "./components/SingleArticle";
import EditArticle from './components/EditArticle';
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      tags: [],
      filtered: "all",
      isLoggedIn: localStorage.getItem("authToken") ? true : false,
      userInfo: null,
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

    if (localStorage.authToken) {
      let url = "https://conduit.productionready.io/api/user";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then(({ user }) => {
          this.setState({ isLoggedIn: true, userInfo: user });
        })
        .catch((err) => this.setState({ isLoggedIn: false }));
    }
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

  updateLoggedIn = (status) => {
    this.setState({ isLoggedIn: status });
  };

  render() {
    let { isLoggedIn, userInfo } = this.state;

    if (!(isLoggedIn && userInfo)) {
      return <Loader />;
    }

    return (
      <>
        <Header click={() => this.handleTags("all")} isLoggedIn={isLoggedIn} />
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
                  username={userInfo}
                />
              )}
              exact
            />
            <Route
              path="/signIn"
              render={() => <SignIn updateLoggedIn={this.updateLoggedIn} />}
            />
            <Route path="/create" component={CreateArticle} />
            <Route path="/signUp" component={SignUp} />
            <Route
              path="/profile"
              render={() => <Profile username={userInfo} />}
            />
            <Route path='/articles/edit/:slug' component={EditArticle} />
            <Route path="/articles/:slug" render={() => <SingleArticle userInfo={this.state.userInfo}/>} />
            <Route component={Error} />
          </Switch>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
