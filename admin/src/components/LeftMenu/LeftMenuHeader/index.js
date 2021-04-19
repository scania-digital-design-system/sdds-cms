import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from './Wrapper';

const LeftMenuHeader = () => (
  <Wrapper>
    <Link to="/" className="leftMenuHeaderLink">
      <span className="projectName">Scania Digital Design System</span>
    </Link>
  </Wrapper>
);

export default LeftMenuHeader;
