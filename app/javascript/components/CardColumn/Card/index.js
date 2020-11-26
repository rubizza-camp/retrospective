import React from 'react';

import CardBody from './CardBody';
import CardFooter from './CardFooter';
import './Card.css';
// Class Card extends React.Component {
//   render() {
//     const {
//       id,
//       body,
//       deletable,
//       editable,
//       author,
//       avatar,
//       likes,
//       type,
//       comments
//     } = this.props;

//     return (
//       <div className="box">
//         <CardBody
//           id={id}
//           editable={editable}
//           deletable={deletable}
//           body={body}
//         />
//         <CardFooter
//           id={id}
//           author={author}
//           avatar={avatar}
//           likes={likes}
//           type={type}
//           comments={comments}
//         />
//       </div>
//     );
//   }
// }

const Card = props => {
  const {
    id,
    body,
    deletable,
    editable,
    author,
    avatar,
    commentsNumber,
    likes,
    type,
    onCommentButtonClick
  } = props;
  // Const [isPopupShown, setIsPopupShown] = useState(false);

  // const handleCommentClick = () => {
  //   setIsPopupShown(!isPopupShown);
  // }

  return (
    <div className="box">
      <CardBody id={id} editable={editable} deletable={deletable} body={body} />
      <CardFooter
        id={id}
        author={author}
        avatar={avatar}
        likes={likes}
        type={type}
        commentsNumber={commentsNumber}
        // OnCommentsButtonClick={handleCommentClick}
        onCommentButtonClick={onCommentButtonClick}
      />
      {/* {isPopupShown && <Popup {...props}/>} */}
    </div>
  );
};

export default Card;
