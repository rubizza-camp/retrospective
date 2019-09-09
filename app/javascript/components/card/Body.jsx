import React from "react"

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: this.props.body };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit happened');
  }

  render () {
    const { body, editable } = this.props;

    return (
      <>
        {/*<div onClick={ ()=> { editable ? console.log('editable') : console.log('non-editable') }}>{body}</div>*/}
        
        <div>{this.state.body}</div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' defaultValue={this.state.body} />
        </form>
      </>
    );
  }
}

export default Body
