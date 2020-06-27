import React from "react";
import CreateComment from './CreateComment';
import Loader from "./Loader";

class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleInfo: null,
      slug: props.match.params.slug,
    };
  }

  componentDidMount() {
    fetch(
      `https://conduit.productionready.io/api/articles/${this.state.slug}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        authorization: `Token ${localStorage.authToken}`,
      }
    )
      .then((res) => res.json())
      .then(({ article }) => {
        this.setState({ articleInfo: article });
      });
  }

  render() {
    console.log(this.state, "inside the render function");
    let { articleInfo } = this.state;

    if (!articleInfo) {
      return <Loader />;
    }

    let { author } = articleInfo;

    console.log(author, "hello");

    return (
      <>
        <div className="max-width">
          <div className="flex">
            <div className="border text-align flex">
              <img
                src={author.image}
                alt="coming-soon"
                className="section-img"
              />
              <div className="margin-left">
                <h3 className="section-user">{articleInfo.author.username}</h3>
                <h5 className="section-date">
                  {articleInfo.updatedAt.split("T")[0]}
                </h5>
                <h3 className="section-head">{articleInfo.title}</h3>
                <p className="section-para">{articleInfo.body}</p>
                <p>{articleInfo.tagList.map((tag) => tag)}</p>
              </div>
            </div>
          </div>
          <CreateComment slug={this.state.slug} />
        </div>
      </>
    );
  }
}

export default SingleArticle;
