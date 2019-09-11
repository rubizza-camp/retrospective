import React from "react"
import './CardBody.css'
import Textarea from 'react-textarea-autosize';

class CardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                   dbValue: this.props.body,
                   inputValue: this.props.body,
                   editMode : false
                 };

    this.editModeToggle = this.editModeToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
  }

  editModeToggle() {
    this.setState({
      ...this.state,
      editMode: !this.state.editMode
    });
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleKeyPress(e) {
    if(e.key === 'Enter'){
      this.submitRequest()
      this.editModeToggle()
      e.preventDefault()
    }
  }

  submitRequest() {
    fetch(`/api/${window.location.pathname}/cards/${this.props.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      },
      body: JSON.stringify({
        edited_body: this.state.inputValue 
      })
    }).then((result) => {
      if (result.status == 200) {
        result.json()
        .then((resultHash) => {
          this.setState({
                          ...this.state,
                          dbValue: resultHash.updated_body
                        });
        })
      }
      else { 
        this.setState({
                        ...this.state,
                        inputValue: this.state.dbValue
                      });
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
    const { dbValue, inputValue, editMode } = this.state;
    const { editable } = this.props;

    return (
      <div> 
        <div onDoubleClick={ editable ? this.editModeToggle : null } hidden={editMode}>{dbValue}</div>
        <Textarea value={inputValue} onChange={this.handleChange} onKeyPress={this.handleKeyPress} hidden={!editMode}/>
      </div>
    );
  }
}

export default CardBody
