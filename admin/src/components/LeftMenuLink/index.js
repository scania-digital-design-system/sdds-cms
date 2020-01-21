/**
 *
 * LeftMenuLink
 *
 */

import React from 'react';
import { startsWith, upperFirst } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import en from '../../translations/en.json';
import Li from './Li';

function LeftMenuLink(props) {
  const isLinkActive = startsWith(
    props.location.pathname.replace('/admin', '').concat('/'),

    props.destination
      .replace(props.suffixUrlToReplaceForLeftMenuHighlight, '')
      .concat('/')
  );

  const plugin =
    props.source !== 'content-manager' && props.source !== '' ? (
      <div className="plugin">
        <span>{upperFirst(props.source.split('-').join(' '))}</span>
      </div>
    ) : (
      ''
    );

  // Check if messageId exists in en locale to prevent warning messages
  const content = en[props.label] ? (
    <FormattedMessage
      id={props.label}
      defaultMessage="{label}"
      values={{
        label: `${props.label}`,
      }}
    />
  ) : (
    <span>{props.label}</span>
  );

  // Icon.
  const icon = <i className={`linkIcon fa-${props.icon} fa`} />;

  // Create external or internal link.
  const link = props.destination.includes('http') ? (
    <a
      className={`link ${isLinkActive ? 'linkActive' : ''}`}
      href={props.destination}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <Link
      className={`link ${isLinkActive ? 'linkActive' : ''}`}
      to={{
        pathname: props.destination,
        search: props.source ? `?source=${props.source}` : '',
      }}
    >
      {content}
    </Link>
  );

  return (
    <Li>
      {link}
      {plugin}
    </Li>
  );
}

LeftMenuLink.propTypes = {
  destination: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  pluginSuffixUrl: PropTypes.string,
  source: PropTypes.string,
  suffixUrlToReplaceForLeftMenuHighlight: PropTypes.string,
};

LeftMenuLink.defaultProps = {
  pluginSuffixUrl: '',
  source: '',
  suffixUrlToReplaceForLeftMenuHighlight: '',
};

export default LeftMenuLink;
