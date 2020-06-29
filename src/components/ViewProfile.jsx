import React, { Component } from "react";
import MyArticles from './MyArticles';
import Loader from "./Loader";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      articles: null,
      profileSlug: props.match.params.profileSlug,
      follow: false,
    };
  }

  componentDidMount() {
    const { profileSlug } = this.state;
    const url = `https://conduit.productionready.io/api/profiles/${profileSlug}`;
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ profile: data.profile }));
  }

  handleArticles = (username) => {
    if (username === "myArticles") {
      let url = `https://conduit.productionready.io/api/articles?author=${username}&limit=5&offset=0`;
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => this.setState({ articles: data.articles }));
    } else {
      let url = `https://conduit.productionready.io/api/articles?favorited=${username}&limit=5&offset=0`;
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(((data) => this.setState({articles: data.articles})));
    }
  };

  render() {
    if (!this.state.profile) {
      return <Loader />;
    }

    let { username, image, bio } = this.state.profile;

    return (
      <div className="max-width">
        <div>
          <div className="border">
            <img src={image} alt="coming-soon" className="profile-image" />
            <div className="margin-left">
              <h3 className="profile-name margin-top margin-left">
                {username}
              </h3>
              <h5 className="section-date">{bio}</h5>
            </div>
          </div>
        </div>
        <MyArticles
          username={username}
          handleArticles={(username) => this.handleArticles(username)}
        />
      </div>
    );
  }
}

export default ViewProfile;
