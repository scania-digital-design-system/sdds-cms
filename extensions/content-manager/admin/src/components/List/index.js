import React, { memo, useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { upperFirst } from 'lodash';
import pluginId from '../../pluginId';
import useListView from '../../hooks/useListView';
import { Wrapper, Search } from './components';
import SearchIcon from '../../icons/Search';

function List({
  data,
  history: {
    location: { pathname, search },
    push,
  },
  isBulkable,
}) {
  const {
    emitEvent,
    entriesToDelete,
    label,
    searchParams: { filters, _q },
    slug,
  } = useListView();

  const [filtered, setFiltered] = useState(data);
  const [emptyMsg, setEmptyMsg] = useState('withoutFilter');

  const redirectUrl = `${pathname}${search}`;

  const searchVal = () => {
    const currentSearch = search.indexOf('redirectUrl=') !== -1; //already contains redirect
    return `redirectUrl=${currentSearch ? search.split('redirectUrl=').pop() : redirectUrl}`;
  }

  const handleGoTo = id => {
    emitEvent('willEditEntryFromList');
    push({
      pathname: `/plugins/${pluginId}/${slug}/${id}`,
      search: searchVal(),
    });
  };

  const values = { contentType: upperFirst(label), search: _q };

  const activePath = (id) => {
    const pathID = pathname.substring(pathname.lastIndexOf('/') + 1);
    return parseInt(pathID) === id ? true : false;
  }
  
  useEffect(()=>{
    setFiltered(data);
  }, [data]);

  const handleChange = (e) => {
    let currentList = [];
    let newList = [];
		
    if (e.target.value !== "") {
      currentList = data;
      setEmptyMsg('withFilters');

      newList = currentList.filter(item => {
        // Convert to lowercase to search without match case
        // check if item.title exist to avoid breaking the code when item.title is null
        if(item.title) {
          const listItem = item.title.toLowerCase();
          const filter = e.target.value.toLowerCase();
          return listItem.includes(filter);
        }
      });
    } else {
      newList = data;
      setEmptyMsg('withoutFilter');
    }
		// Set the filtered state based on what our rules added to newList
    setFiltered(newList);
  }
  
  const content =
    filtered.length === 0 ? (
      <FormattedMessage
        id={`content-manager.components.TableEmpty.${emptyMsg}`}
        values={values}
      />
    ) : (
      filtered.map(row => {
        return (
          <div>
            <div
              key={row.id}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleGoTo(row.id);
              }}
            >
              <a href="" className={`${activePath(row.id) ? 'active' : ''}`}>{row.title || row.username}</a>
            </div>
          </div>
        );
      })
    );



  return (
    <Wrapper>
      <Search>
        <div>
          <SearchIcon />
        </div>
        <div>
          <input
            onChange={handleChange}
            placeholder="Search..."
            type="text"
            className="input"
          />
        </div>
      </Search>
      <div>{content}</div>
    </Wrapper>
  );
}

List.defaultProps = {
  data: [],
  headers: [],
  isBulkable: true,
};

List.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  isBulkable: PropTypes.bool,
};

export default withRouter(memo(List));
