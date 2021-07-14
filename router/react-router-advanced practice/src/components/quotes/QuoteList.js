import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = props => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);

  const queryParams = new URLSearchParams(location.search); /* js 提供的一個取得 query parameter 的 Web API */
  console.log(queryParams);
  const isSortingAscending = queryParams.get('sorting') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    /* 會觸發 rerender，重新 render 一個 component */
    history.push({
      pathname: location.pathname,
      search: `?sorting=${isSortingAscending ? 'desc' : 'asc'}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map(quote => (
          <QuoteItem key={quote.id} id={quote.id} author={quote.author} text={quote.text} />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
