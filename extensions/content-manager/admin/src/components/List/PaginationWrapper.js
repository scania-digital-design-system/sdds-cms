import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;

  > div {
    display: inline-flex;
    flex-direction: row;
    min-width: 120px;
    height: 32px;
    overflow: hidden;
  }

  .paginationNavigator {
    position: relative;
    width: 36px;
    text-align: center;
    line-height: 30px;
    font-size: 2rem;
    i,
    svg {
      color: #97999e;
    }

    &:first-of-type {
      margin-right: 10px;
    }

    &:last-of-type {
      margin-left: 10px;
    }

    &[disabled] {
      i,
      svg {
        opacity: 0.3;
      }
    }
  }

  .navWrapper {
    min-width: 48px;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    li {
      position: relative;
      min-width: 15px;
      margin: 0 5px;
      text-align: center;
      color: #333740;
      a {
        color: #333740;
        font-size: 1.3rem;
        padding-right: 5px;
        padding-left: 5px;
        &:hover,
        &:visited,
        &:focus,
        &:active {
          text-decoration: none;
          color: #033a6a;
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .navUl {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .navLiActive {
    font-weight: 800;
    a {
      color: #033a6a;
      text-decoration: underline;
    }
  }
`;

export default PaginationWrapper;