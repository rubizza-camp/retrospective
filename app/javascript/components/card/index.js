import React from "react"
//import PropTypes from "prop-types"

import Delete from "./Delete"

class Card extends React.Component {
  



  render () {
    const { id, body, deletable, editable } = this.props;

    return (
      <div className='box' style={{marginBottom: '1.5rem'}}>
        {body}
        {deletable && <Delete id={id}/>}
        {/*editable && <div>edit</div>*/}
      </div>
    );
  }
}

//Card.propTypes = {
//  greeting: PropTypes.string
//};

export default Card
