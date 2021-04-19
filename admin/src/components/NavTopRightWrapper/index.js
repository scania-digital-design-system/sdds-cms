import styled from 'styled-components';
import Scania from '../../assets/images/scania_symbol.svg';

const NavTopRightWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  z-index: 1050;

  padding-right: 80px;
  background-image: url(${Scania});
  background-repeat: no-repeat;
  background-size: 30px auto;
  background-position: 93% center;
`;

export default NavTopRightWrapper;
