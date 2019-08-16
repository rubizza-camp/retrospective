// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


export class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };
  static defaultProperty = {
        suggestions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    };
  }


  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };
  
  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  handleSubmit = (e) => {
    this.setState({
      showSuggestions: false,
      userInput: 'your request submited'
    });
    console.log('submited')
  };

  render() {
  	const {
      onChange,
      onClick,
      handleSubmit,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
      if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul>
              {filteredSuggestions.map((suggestion, index) => {
                return (
                  <li  key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          suggestionsListComponent = (
            <div>
              <em>No suggestions!</em>
            </div>
          );
        }
      }
    return (
    	<React.Fragment>
        <form action="/boards/1/memberships" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={onChange}
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
    <Autocomplete
          suggestions={['iris-miz@yandex.ru', 'new@mail.ru', 'test@test.com']}
        />,
    document.getElementById('autocomplete'));

})