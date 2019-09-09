import React from "react"

class Body extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { body, editable } = this.props;

    return (
      <>
        {/*<div onClick={ ()=> { editable ? console.log('editable') : console.log('non-editable') }}>{body}</div>*/}
        <div>{body}</div>
        <input></input>
      </>
    );
  }
}

export default Body
