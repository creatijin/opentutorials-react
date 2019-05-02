import React, { Component } from 'react';

class Subject extends Component {
    render() {
      return(
        <header>
          <h1>{this.props.title}</h1>
          {this.props.subtxt}
        </header>
      );
    }
  }

export default Subject;