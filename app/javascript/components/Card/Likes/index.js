import React from "react"

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes
    };
  }
  
  handleClick = () => {
    this.addLike()
  }

  addLike () {
    fetch(`/api/${window.location.pathname}/cards/${this.props.id}/like`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      }
    }).then((result) => {
      if (result.status == 200) {
        result.json()
        .then((resultHash) => {
          this.setState({likes: resultHash.likes});
        })
      }
      else { 
        throw result
      }
    }).catch((error) => {
        error.json()
        .then((errorHash) => {
          console.log(errorHash.error)
        })
    });
  }
  render () {
    const likes = this.state.likes
    return (
      <React.Fragment>
        <a className='button has-text-info' onClick={this.handleClick}>
          <i className="fa fa-heart is-info"></i>
          <span> {likes} </span>
        </a>
      </React.Fragment>
    );
  }
}

export default Likes
