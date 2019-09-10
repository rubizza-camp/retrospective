import React from "react"
import './CardBody.css'

class CardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                   bodyValue: this.props.body,
                   inputValue: this.props.body
                 };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

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
                          bodyValue: resultHash.updated_body
                        });
        })
      }
      else { 
        this.setState({
                        ...this.state,
                        inputValue: this.state.bodyValue
                      });
        throw result
      }
    }).catch((error) => {
        error.json()
          .then((errorHash) => {
            console.log(errorHash.error)
          })
    });

    console.log('submit happened');
  }

  onKeyPress(e) {
    if(e.key === 'Enter'){
      console.log('enter press!')
      e.target.blur()
      e.preventDefault()
    }
  }

  render () {
    const { bodyValue, inputValue } = this.state;

    return (
      <>
        {/*<div onClick={ ()=> { editable ? console.log('editable') : console.log('non-editable') }}>{body}</div>*/}
        
        <div contentEditable={true} onKeyPress={this.onKeyPress}>this is an editable div test!</div>
      

        <div>{bodyValue}</div>
        <form onSubmit={this.handleSubmit}>
          <input value={inputValue} onChange={this.handleChange} />
        </form>
      </>
    );
  }
}

export default CardBody
