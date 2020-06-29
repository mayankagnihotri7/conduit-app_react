import React from "react";
import Loader from "./Loader";
import CreateComment from "./CreateComment";
import { withRouter } from "react-router-dom";
import uuid from "react-uuid";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
    };
  }

  componentDidMount() {
    let url = `https://conduit.productionready.io/api/articles/${this.props.slug}/comments`;
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ comments }) => {
        this.setState({ comments: comments });
      });
  }

  handleDelete = (commentId) => {
    let url = `https://conduit.productionready.io/api/articles/${this.props.slug}/comments/${commentId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push(`/`);
      }
    });
  };

  render() {
    let { comments } = this.state;

    let { username } = this.props.userInfo;

    if (!comments) {
      return <Loader />;
    } else
      return (
        <>
          <h1 className="comment-heading">Comments:</h1>
          <CreateComment
            slug={this.props.slug}
            handleUpdate={this.props.handleUpdate}
          />
          {comments.map((comment) => {
            return (
              <div className="max-width" key={uuid()}>
                <div className="flex">
                  <div className="border flex">
                    <img
                      src={comment.author.image}
                      alt="coming-soon"
                      className="comment-image"
                    />
                    <div className="margin-left">
                      <h3 className="section-user">
                        {comment.author.username}
                      </h3>
                      <h5 className="section-date">
                        {comment.updatedAt.split("T")[0]}
                      </h5>
                      <p className="section-para">{comment.body}</p>
                    </div>
                    {comment.author.username === username ? (
                      <div>
                        <button onClick={() => this.handleDelete(comment.id)}>
                          Delete
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
  }
}

export default withRouter(Comment);
