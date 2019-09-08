import React from "react"

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
        {/*editable && <Edit />*/}
      </div>
    );
  }
}

export default Card
