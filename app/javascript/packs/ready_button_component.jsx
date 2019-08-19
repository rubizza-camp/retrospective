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
    fetch(`http://localhost:3000/boards/1/memberships/new`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          ready : result
        });
      },
    )
  }
  
  /*
  componentDidMount() {
    const response = fetch(`http://localhost:5000/memberships/toggle_ready`).then(res => res.json()); 
      this.setState({
      ready: fetch(`http://localhost:5000/memberships/toggle_ready`)
    });
  }
  */

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
        