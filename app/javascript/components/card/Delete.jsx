import React from "react"
//import PropTypes from "prop-types"

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {

    console.log(`I send delete request to ${window.location.pathname}/cards/1`)
    
    fetch(`${window.location.pathname}/cards/1`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      },
      body: JSON.stringify({
        mainKey: {
        innerKey: 'innerValue'
        }
      })
    })
    
  }

  render () {
    //const {} = this.props;

    return (
      <div><a href='' onClick={this.handleClick}>delete react</a></div>
    );
  }
}

//Delete.propTypes = {
//  greeting: PropTypes.string
//};

export default Delete
