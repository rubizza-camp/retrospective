import React from "react"
//import PropTypes from "prop-types"

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    
    e.preventDefault()
    
    fetch(`${window.location.pathname}/cards/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      }
    }).then((result) => {
      if (result.status == 200) {
        console.log('All good!')
      }
      else { console.log('Error!') }
    })

  }

  render () {
    //const {} = this.props;

    return (
      <div><a href='' onClick={this.handleClick}>delete</a></div>
    );
  }
}

//Delete.propTypes = {
//  greeting: PropTypes.string
//};

export default Delete
