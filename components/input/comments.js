import { useEffect, useState } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      getCommentsHandler();
    }

  }, [showComments])


  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    console.log(commentData);
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then( async response => {
      if (response.ok) {
        commentData.id = Math.random().toString();
        setComments((prevComments) => {
          return [commentData, ...prevComments];
        });
        // getCommentsHandler();
      }
    });
  }

  function getCommentsHandler() {
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.comments) {
          setComments(data.comments);
        }
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
