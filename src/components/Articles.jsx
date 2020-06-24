import React from "react";
import uuid from "react-uuid";
import Tags from "./Tags";

function Articles(props) {
  return (
    <>
      <div className="section-flex article-color">
        <div>
          <ul className="section-btn">
            <button
              className="header-btn header-btn_feed"
              onClick={() => props.handleTags("all")}
            >
              News Feed
            </button>
            <li>
              {props.filtered !== "all" ? (
                <button
                  onClick={() => props.handleTags(props.filtered)}
                  className="header-btn header-switch"
                >
                  #{props.filtered}
                </button>
              ) : (
                ""
              )}
            </li>
          </ul>

          {props.articles.map((article) => {
            return (
              <div className="container" key={uuid()}>
                <div className="grid flex">
                  <div className="border text-align">
                    <img
                      src={article.author.image}
                      alt="coming-soon"
                      className="section-img"
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
              </div>
            );
          })}
        </div>
        <Tags
          tags={props.tags}
          tagChange={(tagName) => props.tagChange(tagName)}
        />
      </div>
    </>
  );
}

export default Articles;
