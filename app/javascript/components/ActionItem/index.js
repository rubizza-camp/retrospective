import React from "react"

import ActionItemBody from "./ActionItemBody"
import ActionItemFooter from "./ActionItemFooter"
import "./ActionItem.css"

class ActionItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  hideActionItem = () => {
    this.setState({ActionItemStyle: {display: 'none'}});
  }
  
  render () {
    const { id, body, deletable, editable } = this.props;

    return (
      <div className='box' style={this.state.ActionItemStyle}>
        <ActionItemBody id={id} 
                  editable={editable}
                  body={body}/>
        <ActionItemFooter id={id} 
                    deletable={deletable} 
                    hideActionItem={this.hideActionItem}/>
      </div>
    );
  }
}

export default ActionItem
