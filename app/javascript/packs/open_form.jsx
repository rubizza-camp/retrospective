// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState ({
      visibility: true
    })
  };
  
  render() {
      return (
        <div>
          <button onClick={this.toggleVisibility}>+</button>
          {this.state.visibility && <h1>Displayed!</h1>}
        </div>
      )}
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MyComponent />,
    document.body.appendChild(document.createElement('div')),
  )
})
