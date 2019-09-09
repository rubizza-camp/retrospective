import React from "react"

import Delete from "./Delete"
import CardBody from "./CardBody/CardBody"

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
    const { id, body, deletable, editable, author, avatar } = this.props;

    return (
      <div className='box' style={this.state.cardStyle}>
        
        <CardBody editable={editable} body={body}/>


        <hr style={{margin: '0.5rem'}} />
        <span>by {author}</span>
        {deletable && <Delete id={id} hideCard={this.hideCard}/>}
      </div>
    );
  }
}

export default Card
