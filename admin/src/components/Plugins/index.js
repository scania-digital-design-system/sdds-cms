/**
 *
 * Logout
 *
 */

/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { get, isEmpty, map, sortBy } from 'lodash';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { auth } from 'strapi-helper-plugin';
import Wrapper from './components';
import messages from './messages.json';

const Plugin = ({ plugins, history: { push } }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prev => !prev);
  
  const handleGoTo = (path) => {
    const id = get(auth.getUserInfo(), 'id');
    const location = { pathname: path } || {
      pathname: `plugins/content-manager/strapi::administrator/${id}`,
      search:
        '?redirectUrl=/plugins/content-manager/strapi::administrator/&_page=0&_limit=0&_sort=id',
    };

    push(location);
  };

  // Check if the plugins list is empty or not and display plugins by name
  const pluginsLinks = !isEmpty(plugins) ? (
    map(sortBy(plugins, 'name'), plugin => {
      if (plugin.id !== 'email' && plugin.id !== 'content-manager') {
        const pluginSuffixUrl = plugin.suffixUrl
          ? plugin.suffixUrl(plugins)
          : '';

        const destination = `/plugins/${get(plugin, 'id')}${pluginSuffixUrl}`;

        return (
          <DropdownItem onClick={() => handleGoTo(destination)} className="item" key={plugin.id}>
          {get(plugin, 'name')}
          </DropdownItem>
        );
      }
    })
  ) : (
    <DropdownItem onClick={handleGoTo} className="item">
      <FormattedMessage {...messages.noPluginsInstalled} key="noPlugins" />
    </DropdownItem>
  );

  const staticLinks = [
    {
      icon: 'list',
      label: messages.listPlugins.id,
      destination: '/list-plugins',
    },
    {
      icon: 'shopping-basket',
      label: messages.installNewPlugin.id,
      destination: '/marketplace',
    },
    {
      icon: 'cog',
      label: messages.settings.id,
      destination: '/settings/webhooks',
    },
  ];
  return (
    <Wrapper>
      <ButtonDropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle>
          <FormattedMessage {...messages.plugins} key="chosePlugins" />
          <i className="fa fa-caret-down" alt={`${isOpen}`} />
        </DropdownToggle>
        <DropdownMenu className="dropDownContent">
          {pluginsLinks}
        </DropdownMenu>
      </ButtonDropdown>
      {/* <ButtonDropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle>
          <FormattedMessage {...messages.general} key="choseGeneral" />
          <i className="fa fa-caret-down" alt={`${isOpen}`} />
        </DropdownToggle>
        <DropdownMenu className="dropDownContent">
          {staticLinks.map(link => (
            // <LeftMenuLink {...rest} key={link.destination} {...link} />
            // <FormattedMessage values={{ label: `${link.label}` }} />
            <DropdownItem onClick={() => handleGoTo(link.destination)} className="item" key={link.destination}>
              {get(link, 'label')}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown> */}
    </Wrapper>
  );
};

Plugin.propTypes = {
  plugins: PropTypes.object.isRequired,
};

export default withRouter(Plugin);
