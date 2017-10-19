import React, { Component } from 'react';
import Markdown from 'react-markdown';

class ViewArticle extends Component {
  render() {
    const { article } = this.props.location.state;
    return (
      <div>
        <Markdown source={article.content} />
      </div>
    );
  }
}

export default ViewArticle;
