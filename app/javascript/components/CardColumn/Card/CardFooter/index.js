import React from 'react';
import Likes from '../Likes';
// Import CommentsDropdown from '../CommentsDropdown';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from '@fortawesome/free-regular-svg-icons';
import './CardFooter.css';

const CardFooter = ({
  author,
  avatar,
  id,
  likes,
  type,
  commentsNumber,
  onCommentButtonClick
}) => {
  // Const [showComments, setShowComments] = useState(false);

  return (
    <div>
      <hr style={{margin: '0.5rem'}} />
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <Likes id={id} likes={likes} type={type} />
        </div>
        <div className="column is-one-quarter">
          <a
            className="has-text-info"
            // OnClick={() => setShowComments(prev => !prev)}
            onClick={onCommentButtonClick}
          >
            <FontAwesomeIcon fixedWidth icon={faCommentAlt} />
          </a>
          <span>{commentsNumber}</span>
        </div>
        <div className="column is-half">
          <img src={avatar} className="avatar" />
          <span> by {author}</span>
        </div>
        {/* <CommentsDropdown visible={false} id={id} comments={comments} /> */}
      </div>
    </div>
  );
};

export default CardFooter;
