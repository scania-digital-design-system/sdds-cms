import React, { memo, useCallback, useEffect, useRef, useState, lazy } from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { capitalize, get, sortBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Header } from '@buffetjs/custom';
import {
  PopUpWarning,
  getQueryParameters,
  useGlobalContext,
} from 'strapi-helper-plugin';

import pluginId from '../../pluginId';
import List from '../../components/List';
import FilterPicker from '../../components/FilterPicker';
import Container from '../../components/Container';
import {
  generateFiltersFromSearch,
  generateSearchFromFilters,
} from '../../utils/search';
import ListViewProvider from '../ListViewProvider';
import EditViewProvider from '../EditViewDataManagerProvider';
import { onChangeListLabels, resetListLabels } from '../Main/actions';
import { Wrapper } from './components';
import Footer from './Footer';
import {
  getData,
  onChangeBulk,
  onChangeBulkSelectall,
  onDeleteData,
  onDeleteSeveralData,
  resetProps,
  toggleModalDelete,
  toggleModalDeleteAll,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectListView from './selectors';

const EditView = lazy(() => import('../EditView'));

/* eslint-disable react/no-array-index-key */

function ListView({
  components,
  count,
  data,
  emitEvent,
  entriesToDelete,
  location: { pathname, search },
  getData,
  layouts,
  history: { push },
  onChangeBulk,
  onChangeBulkSelectall,
  onChangeListLabels,
  onDeleteData,
  onDeleteSeveralData,
  resetListLabels,
  resetProps,
  shouldRefetchData,
  showWarningDelete,
  slug,
  toggleModalDelete,
  showWarningDeleteAll,
  toggleModalDeleteAll,
}) {
  strapi.useInjectReducer({ key: 'listView', reducer, pluginId });
  strapi.useInjectSaga({ key: 'listView', saga, pluginId });
  // const { formatMessage } = useGlobalContext();
  const getLayoutSettingRef = useRef();
  const [isLabelPickerOpen, setLabelPickerState] = useState(false);
  const [isFilterPickerOpen, setFilterPickerState] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const contentTypePath = [slug, 'contentType'];

  getLayoutSettingRef.current = settingName =>
    get(layouts, [...contentTypePath, 'settings', settingName], '');

  const getSearchParams = useCallback(
    (updatedParams = {}) => {
      return {
        _limit:
          getQueryParameters(search, '_limit') || 20,
        _page: getQueryParameters(search, '_page') || 1,
        _q: getQueryParameters(search, '_q') || '',
        _sort:
          getQueryParameters(search, '_sort') ||
          `${getLayoutSettingRef.current(
            'defaultSortBy'
          )}:${getLayoutSettingRef.current('defaultSortOrder')}`,
        filters: generateFiltersFromSearch(search),
        ...updatedParams,
      };
    },
    [getLayoutSettingRef, search]
  );
  useEffect(() => {
    getData(slug, getSearchParams());

    return () => {
      resetProps();
      setFilterPickerState(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, shouldRefetchData]);

  const toggleLabelPickerState = () => {
    if (!isLabelPickerOpen) {
      emitEvent('willChangeListFieldsSettings');
    }

    setLabelPickerState(prevState => !prevState);
  };
  const toggleFilterPickerState = () => {
    if (!isFilterPickerOpen) {
      emitEvent('willFilterEntries');
    }

    setFilterPickerState(prevState => !prevState);
  };

  // Helpers
  const getMetaDatas = (path = []) =>
    get(layouts, [...contentTypePath, 'metadatas', ...path], {});

  const getListLayout = () =>
    get(layouts, [...contentTypePath, 'layouts', 'list'], []);

  const getListSchema = () => get(layouts, [...contentTypePath, 'schema'], {});

  const getName = () => {
    return get(getListSchema(), ['info', 'name'], '');
  };

  const getFirstSortableElement = (name = '') => {
    return get(
      getListLayout().filter(h => {
        return h !== name && getMetaDatas([h, 'list', 'sortable']) === true;
      }),
      ['0'],
      'id'
    );
  };

  const handleChangeParams = ({ target: { name, value } }) => {
    const updatedSearch = getSearchParams({ [name]: value });
    const newSearch = generateSearchFromFilters(updatedSearch);

    if (name === '_limit') {
      emitEvent('willChangeNumberOfEntriesPerPage');
    }

    push({ search: newSearch });
    resetProps();
    getData(slug, updatedSearch);
  };
  const handleClickDelete = id => {
    setIdToDelete(id);
    toggleModalDelete();
  };
  const handleSubmit = (filters = []) => {
    emitEvent('didFilterEntries');
    toggleFilterPickerState();
    handleChangeParams({ target: { name: 'filters', value: filters } });
  };

  const filterPickerActions = [
    {
      label: `${pluginId}.components.FiltersPickWrapper.PluginHeader.actions.clearAll`,
      kind: 'secondary',
      onClick: () => {
        toggleFilterPickerState();
        handleChangeParams({ target: { name: 'filters', value: [] } });
      },
    },
    {
      label: `${pluginId}.components.FiltersPickWrapper.PluginHeader.actions.apply`,
      kind: 'primary',
      type: 'submit',
    },
  ];

  const headerProps = {
    title: {
      label: getName() || 'Content Manager',
    },
    content:  count > 1
              ? `${count} entries found`
              : `${count} entry found`
  };

  const { url } = useRouteMatch();

  const renderRoute = (props) => (
    <EditView
      slug={slug}
      layouts={layouts}
      components={components}
      {...props}
    />
  );

  const createLink = (path) => {
    let newPath = path.split('/');
    newPath.pop();
    return newPath.join('/');
  }

  const getPathId = (path) => {
    return path.substring(path.lastIndexOf('/') + 1)
  }

  return (
    <>
      <ListViewProvider
        data={data}
        count={count}
        entriesToDelete={entriesToDelete}
        emitEvent={emitEvent}
        firstSortableElement={getFirstSortableElement()}
        label={getName()}
        onChangeBulk={onChangeBulk}
        onChangeBulkSelectall={onChangeBulkSelectall}
        onChangeParams={handleChangeParams}
        onClickDelete={handleClickDelete}
        onDeleteSeveralData={onDeleteSeveralData}
        schema={getListSchema()}
        searchParams={getSearchParams()}
        slug={slug}
        toggleModalDeleteAll={toggleModalDeleteAll}
      >
        <FilterPicker
          actions={filterPickerActions}
          isOpen={isFilterPickerOpen}
          name={getName()}
          toggleFilterPickerState={toggleFilterPickerState}
          onSubmit={handleSubmit}
        />
        <div className="container-fluid">
          <Wrapper>
            <div className="row">
              <div className="col-3">
                <Container>
                  {!isFilterPickerOpen && <Header {...headerProps} />}
                  <div className="addWrapper">
                    <a className="addNew" onClick={() => {
                      emitEvent('willCreateEntry');
                      push({
                        pathname: `${/\d/.test(getPathId(pathname)) ? createLink(pathname) : pathname}/create`,
                        search: search.indexOf('redirectUrl') !== -1 ? '' : `redirectUrl=${pathname}${search}`,
                      });
                    }}></a>
                  </div>
                  <List
                    data={data}
                    isBulkable={getLayoutSettingRef.current('bulkable')}
                    onChangeParams={handleChangeParams}
                  />
                  <Footer />
                </Container>
              </div>
              <div className="col-9">
                <Switch>
                  <Route
                    key=':id'
                    path={`${url}/:id`}
                    render={props => renderRoute(props)}
                  />
                </Switch>
              </div>
            </div>
          </Wrapper>
        </div>
        <PopUpWarning
          isOpen={showWarningDelete}
          toggleModal={toggleModalDelete}
          content={{
            title: `${pluginId}.popUpWarning.title`,
            message: `${pluginId}.popUpWarning.bodyMessage.contentType.delete`,
            cancel: `${pluginId}.popUpWarning.button.cancel`,
            confirm: `${pluginId}.popUpWarning.button.confirm`,
          }}
          popUpWarningType="danger"
          onConfirm={() => {
            onDeleteData(idToDelete, slug, emitEvent);
          }}
        />
        <PopUpWarning
          isOpen={showWarningDeleteAll}
          toggleModal={toggleModalDeleteAll}
          content={{
            title: `${pluginId}.popUpWarning.title`,
            message: `${pluginId}.popUpWarning.bodyMessage.contentType.delete${
              entriesToDelete.length > 1 ? '.all' : ''
            }`,
            cancel: `${pluginId}.popUpWarning.button.cancel`,
            confirm: `${pluginId}.popUpWarning.button.confirm`,
          }}
          popUpWarningType="danger"
          onConfirm={() => {
            onDeleteSeveralData(entriesToDelete, slug);
          }}
        />
      </ListViewProvider>
    </>
  );
}
ListView.defaultProps = {
  layouts: {},
};

ListView.propTypes = {
  count: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  emitEvent: PropTypes.func.isRequired,
  entriesToDelete: PropTypes.array.isRequired,
  layouts: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  models: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onChangeBulk: PropTypes.func.isRequired,
  onChangeBulkSelectall: PropTypes.func.isRequired,
  onChangeListLabels: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  onDeleteSeveralData: PropTypes.func.isRequired,
  resetListLabels: PropTypes.func.isRequired,
  resetProps: PropTypes.func.isRequired,
  shouldRefetchData: PropTypes.bool.isRequired,
  showWarningDelete: PropTypes.bool.isRequired,
  showWarningDeleteAll: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  toggleModalDelete: PropTypes.func.isRequired,
  toggleModalDeleteAll: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectListView();

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getData,
      onChangeBulk,
      onChangeBulkSelectall,
      onChangeListLabels,
      onDeleteData,
      onDeleteSeveralData,
      resetListLabels,
      resetProps,
      toggleModalDelete,
      toggleModalDeleteAll,
    },
    dispatch
  );
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(ListView);
