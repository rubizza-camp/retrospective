import React from "react"
import './CardBody.css'

class CardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                   bodyValue: this.props.body
                 };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    
    //if unsuccessful edit
    this.setState({inputValue: this.props.body});
    console.log('submit happened');
  }


  render () {
    const { bodyValue, inputValue } = this.state;

    return (
      <>
        {/*<div onClick={ ()=> { editable ? console.log('editable') : console.log('non-editable') }}>{body}</div>*/}
        
        <div>{bodyValue}</div>

        <form onSubmit={this.handleSubmit}>
          <input type='text' defaultValue={bodyValue} value={inputValue} onChange={this.handleChange} />
        </form>
      </>
    );
  }
}

export default CardBody
