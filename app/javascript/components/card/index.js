import React from "react"
//import PropTypes from "prop-types"

import Delete from "./Delete"

class Card extends React.Component {
  render () {
    const { body, deletable, editable } = this.props;

    return (
      <React.Fragment>
        {body}
        {deletable && <Delete />}
        {/*editable && <div>edit</div>*/}
      </React.Fragment>
    );
  }
}

//Card.propTypes = {
//  greeting: PropTypes.string
//};

export default Card
