/**
 *
 * LeftMenuLinkContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get, snakeCase, isEmpty, map, sortBy } from 'lodash';
import LeftMenuLink from '../LeftMenuLink';
import Wrapper from './Wrapper';
import messages from './messages.json';

/* eslint-disable */

function LeftMenuLinkContainer({ plugins, ...rest }) {
  // Generate the list of sections
  const pluginsSections = Object.keys(plugins).reduce((acc, current) => {
    plugins[current].leftMenuSections.forEach((section = {}) => {
      if (!isEmpty(section.links)) {
        acc[snakeCase(section.name)] = {
          name: section.name,
          links: get(acc[snakeCase(section.name)], 'links', []).concat(
            section.links
              .filter(link => link.isDisplayed !== false)
              .map(link => {
                link.plugin = !isEmpty(plugins[link.plugin])
                  ? link.plugin
                  : plugins[current].id;

                return link;
              })
          ),
        };
      }
    });

    return acc;
  }, {});

  const linkSections = Object.keys(pluginsSections).map((current, j) => {
    const contentTypes = pluginsSections[current].links;

    return (
      <div key={j}>
        <p className="title">
          <FormattedMessage {...messages.contentTypes}>
            {title => title}
          </FormattedMessage>
        </p>
        <div className="addWrapper">
          <a className="addNew" href={`http://localhost:8080/admin/plugins/content-type-builder/content-types/application::contents.contents?modalType=contentType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_name_1=contentType&header_icon_isCustom_1=false&header_label_1=null`}></a>
        </div>
        <ul className="list  models-list">
          {sortBy(contentTypes, 'label').map((link, i) => (
            <LeftMenuLink
              {...rest}
              key={`${i}-${link.label}`}
              icon={link.icon || 'circle'}
              label={link.label}
              destination={`/plugins/${link.plugin}/${link.destination ||
                link.uid}`}
            />
          ))}
        </ul>
      </div>
    );
  });

  return (
    <Wrapper>
      {linkSections}
    </Wrapper>
  );
}

LeftMenuLinkContainer.propTypes = {
  plugins: PropTypes.object.isRequired,
};

export default LeftMenuLinkContainer;
