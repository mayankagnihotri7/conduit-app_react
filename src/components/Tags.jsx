import React from "react";
import uuid from "react-uuid";

function Tags(props) {
  return (
    <div className="tags-border">
      <h1 className="text-align">Popular Tags:</h1>
      <div className="section-grid">
        {props.tags.map((tag) => {
          return (
            <button
              className="section-border heading-section"
              onClick={() => props.tagChange(tag)}
              key={uuid()}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Tags;
