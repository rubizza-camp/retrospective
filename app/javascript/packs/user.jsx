import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.ready = this.props.membership.ready
    this.email = this.props.membership.user.email
    this.id = this.props.membership.id
    this.state = {
      displayUser: {}
    }
  };
  
  hideUser(e) {
    this.setState({
      ...this.state,
      displayUser: {display: 'none'}
    })
  }

  deleteUser = (e) =>  {
    fetch(`/api/${window.location.pathname}/memberships/${this.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      }
    }).then((result) => {
      if (result.status == 200) {
        this.hideUser()
      }
      else { throw result }
    }).catch((error) => {
      error.json().then( errorHash => {
        console.log(errorHash.error)
      })
    });
  }


  render () {
    return (
      <React.Fragment>
        <div className={this.ready ? 'tag is-success' : 'tag is-info'} key={this.email} style={this.state.displayUser}>
          <p>{this.email}</p>
           <p>{this.id}</p>
          <a className='delete is-small' onClick={this.deleteUser}></a>
        </div>  
      </React.Fragment>
    );
  }
};

export default User