import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    const { errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return (
        <>
          <p>
            System error happened. Please try to reload the page. If problem
            does not resolve, please contact the administrator.
          </p>
          <button type="button" onClick={this.refreshPage} variant="primary">
            Reload the page
          </button>
        </>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

ErrorBoundary.defaultProps = {
  children: <></>,
};

export default ErrorBoundary;
