import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { capitalize, get, sortBy } from 'lodash';
import { PluginHeader } from 'strapi-helper-plugin';
import pluginId from '../../pluginId';
import EditView from '../../containers/EditView';
import { ListWrapper } from './components';
import Footer from './Footer'

function List({
  count,
  currentEnvironment,
  data,
  emitEvent,
  groups,
  groupsAndModelsMainPossibleMainFields,
  history: { push },
  isLoading,
  layouts,
  location: { pathname, search },
  match: {
    params: { slug },
  },
  models,
  plugins,
}) {

  const renderRoute = (props) => (
    <EditView
      currentEnvironment={currentEnvironment}
      emitEvent={emitEvent}
      groups={groups}
      groupsAndModelsMainPossibleMainFields={
        groupsAndModelsMainPossibleMainFields
      }
      layouts={layouts}
      models={models}
      plugins={plugins}
      {...props}
    />
  );

  const getPath = ( path ) => {
    const fullPath = path.split('/');
    const ends = fullPath.pop();
    if(ends !== slug) {
      return fullPath.join('/');
    } else {
      return path;
    }
    
  }

  return (
    <ListWrapper className="row">
      <div className="col-md-3">
        <div className="title">
          <h1>
            {slug || 'Content Manager'}          
            <br/>
            <span className="info">
              { count } 
              {
                count > 1
                ? ` entries found`
                : ` entry found `
              }
            </span>
          </h1>
          <NavLink 
            to={`${getPath(pathname)}/create`}
            className="addNew">
          </NavLink>
        </div>
        
        <ul>
          {data.map(row =>
            <li key={row.id}>
              <NavLink 
                to={`/plugins/${pluginId}/${slug}/${row.id}`}>
                  { row.title || row.name || row.url || row.username }
              </NavLink>
            </li>
          )}
        </ul>
        <Footer />
      </div>

      <div className="col-md-6">
        <Switch>
          <Route
            path={`/plugins/${pluginId}/:slug/:id`}
            render={props => renderRoute(props)}/>
          )} 
        </Switch>
      </div>
    </ListWrapper>
  );
}

List.defaultProps = {
  data: [],
  headers: [],
  isBulkable: true,
  slug: '',
};

List.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    }),
  }),
  slug: PropTypes.string,
};

export default withRouter(memo(List));
