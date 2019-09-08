import React from "react"
//import PropTypes from "prop-types"

import Delete from "./Delete"

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardStyle: {marginBottom: '1.5rem'}
    }

    this.hideCard = this.hideCard.bind(this);
  }

  hideCard() {
    this.setState({cardStyle: {display: 'none'}});
  }
  
  render () {
    const { id, body, deletable, editable } = this.props;

    return (
      <div className='box' style={this.state.cardStyle}>
        {body}
        {deletable && <Delete id={id} hideCard={this.hideCard}/>}
        {/*editable && <div>edit</div>*/}
      </div>
    );
  }
}

//Card.propTypes = {
//  greeting: PropTypes.string
//};

export default Card
