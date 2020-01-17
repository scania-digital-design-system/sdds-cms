import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import pluginId from '../../pluginId';
import EditView from '../../containers/EditView';

function List({
  currentEnvironment,
  data,
  emitEvent,
  match: {
    params: { slug },
  },
  groups,
  groupsAndModelsMainPossibleMainFields,
  models,
  plugins,
  layouts
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

  return (
    <div className="row">
      <ul className="col-md-3">
        {data.map(row =>
          <li key={row.id}>
            <NavLink 
              to={`/plugins/${pluginId}/${slug}/${row.id}`}>
                { row.title || row.name || row.url || row.username }
            </NavLink>
          </li>
        )}
      </ul>
      <div className="col-md-6">
        <Switch>
          <Route
            path={`/plugins/${pluginId}/:slug/:id`}
            render={props => renderRoute(props)}/>
          )} 
        </Switch>
      </div>
    </div>
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
