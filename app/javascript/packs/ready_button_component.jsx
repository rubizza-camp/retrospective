import React from 'react'
import ReactDOM from 'react-dom'

export class ReadyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: null
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    fetch(`http://localhost:3000/${window.location.pathname}/memberships/ready_toggle`)
    .then(result => result.json())
    .then(
      (result) => {
        this.setState({
          ready : result
        });
      },
    )
  }
  
  componentDidMount() {
    fetch(`http://localhost:3000/${window.location.pathname}/memberships/ready_status`)
    .then(result => result.json())
    .then(
      (result) => {
        this.setState({
          ready : result
        });
      },
    )
  }

  render() {
    return (
        <button className='button is-large' onClick={this.handleClick}>READY</button>
    );
  }
};

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <ReadyButton />,
      document.getElementById('ready-button'))
})
