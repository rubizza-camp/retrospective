import React from "react"
import './CardBody.css'

class CardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                   body: this.props.body 
                 };


    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonClick = this.buttonClick.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit happened');
  }

  buttonClick() {

  }

  render () {
    const { editable } = this.props;
    const { body } = this.state;

    return (
      <>
        {/*<div onClick={ ()=> { editable ? console.log('editable') : console.log('non-editable') }}>{body}</div>*/}
        
        <div className='bordered'>{body}</div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' defaultValue={body} />
        </form>
        <button onClick={this.buttonClick}></button>
      </>
    );
  }
}

export default CardBody
