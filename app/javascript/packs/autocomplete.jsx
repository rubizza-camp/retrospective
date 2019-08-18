// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.props.onClick.bind(this);
    this.suggestion = this.props.suggestion
  };
  render () {
    return (
      <li key={this.suggestion} onClick={this.onClick}>
        {this.suggestion}
      </li>
    );
  }


};

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
      userInput: e.currentTarget.innerText
    });
  	
    fetch(`http://localhost:5000/${window.location.pathname}/memberships`, {
		  method: 'POST',
		  headers: {
		  	Accept: 'application/json',
		    'Content-Type': 'application/json',
		    'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
		  },
		  body: JSON.stringify({
		    membership: {
		   		email: this.state.userInput
		    }
		  }),
		});
  };

  render() {
  	const {
      suggestions,
      showSuggestions,
      userInput
    } = this.state;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      suggestionsListComponent =
        suggestions.map((suggestion, index) => {
	        return <Suggestion suggestion ={suggestion} onClick = {this.onClick}/>
        })
    };

    return (
    	<React.Fragment>
        <form  onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.onChange}
          value={userInput}
          name='membership[email]'
        />
        <input type="submit" value="Invite" />
        </form>
        <ul>
          {suggestionsListComponent}
        </ul>
      </React.Fragment>
      );
  };
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Autocomplete />,
    document.getElementById('autocomplete'));
})