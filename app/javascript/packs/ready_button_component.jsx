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

  }
  
  componentDidMount() {
    fetch(`http://localhost:3000/boards/1/memberships/ready`)
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
        