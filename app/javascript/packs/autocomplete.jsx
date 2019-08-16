// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


export class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      showSuggestions: false,
      userInput: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };



  onChange = e => {
    const userInput = e.currentTarget.value;

    fetch(`http://localhost:5000/users/suggestions?autocomplete=${userInput}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
    	      suggestions: result,
            showSuggestions: true,
            userInput: userInput
          });
        },
      )  
  };
  
  onClick = (e) => {
    this.setState({
      ...this.state,
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  handleSubmit = (e) => {
    this.setState({
    	...this.state,
      showSuggestions: false,
      userInput: 'your request submited'
    });
    console.log('submited')
  };

  render() {
  	const {
      suggestions,
      showSuggestions,
      userInput
    } = this.state;
    let suggestionsListComponent;
      if (showSuggestions && userInput) {
          suggestionsListComponent = (
            <ul>
              {suggestions.map((suggestion, index) => {
                return (
                  <li  key={suggestion} onClick={this.onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          );
      }
    return (
    	<React.Fragment>
        <form action="/boards/1/memberships" method="post" onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.onChange}
          value={userInput}
          name='membership[email]'
        />
        {suggestionsListComponent}
        <input type="submit" value="Invite" />
        </form>
      </React.Fragment>
      );
  };
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Autocomplete />,
    document.getElementById('autocomplete'));

})