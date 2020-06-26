import React from "react";

class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.match.params.slug,
    };
  }

  componentDidMount() {
    fetch(`https://conduit.productionready.io/api/articles/${this.state.slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      authorization: `Token ${localStorage.authToken}`,
    });
  }

  render() {
    return(<h1>Hello</h1>)
  }
}

export default SingleArticle;
