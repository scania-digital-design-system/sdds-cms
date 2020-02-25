import styled from 'styled-components';

const Wrapper = styled.div`
  a {
    padding-bottom: 15px;
    display: inline-block;
    &.active {
      text-decoration: underline;
    }
  }
`;

const Search = styled.div`
  position: relative;
  top: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 38px;
  padding-right: 20px;
  background-color: #ffffff;
  border: 1px solid #C8C9C7;
  border-radius: 3px;
  color: #9ea7b8;
  line-height: 6rem;
  letter-spacing: 0;
  margin-bottom:30px;

  > div:first-child {
    margin-left:10px;
    margin-right: 10px;
    > svg {
      color: #b3b5b9;
      vertical-align: middle;
    }
  }

  input {
    position: relative;
    width: 100%;
    outline: 0;

    &::placeholder {
      color: #9ea7b8 !important;
      font-size: 13px !important;
    }
  }

  > div:nth-child(2) {
    display: flex;
    flex: 2;
  }
`;

export {
  Wrapper,
  Search
};
