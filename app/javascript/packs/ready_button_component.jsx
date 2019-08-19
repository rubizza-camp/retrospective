import React from 'react'
import ReactDOM from 'react-dom'

export class ReadyButton extends React.Component {
  constructor(props) {
    super(props);
  }
render() {
  return (
    <button className='button is-large'>React Ready Button</button>
    );
  }
};



document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <ReadyButton />,
      document.getElementById('ready-button'))
})
        