import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import CommentList from './CommentsList';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../ui/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params;
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  let comments;
  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && loadedComments.length > 0) {
    comments = <CommentList comments={loadedComments} />;
  }

  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    comments = <p className='centered'>No comments were added yet</p>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
