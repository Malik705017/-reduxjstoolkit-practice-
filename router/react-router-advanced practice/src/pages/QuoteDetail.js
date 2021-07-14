import { useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote founded</p>;
  }

  return (
    <>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
