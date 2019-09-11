import React from "react"
import './CardBody.css'

class CardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                   dbValue: this.props.body,
                   inputValue: this.props.body
                 };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleSubmit() {
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

  onKeyPress(e) {
    if(e.key === 'Enter'){
      //this.handleSubmit()
      e.target.blur()
      e.preventDefault()
    }
  }

  render () {
    const { inputValue } = this.state;
    const { editable } = this.props;

    return (
      <>           
        {/*<div>{dbValue}</div>*/}
        <textarea value={inputValue} onChange={this.handleChange} onKeyPress={this.onKeyPress} onBlur={this.handleSubmit} disabled={!editable}/>
      </>
    );
  }
}

export default CardBody
