import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { inputType, testid, inputName } = this.props;
    return (
      <label htmlFor={ inputName }>
        <input
          type={ inputType }
          data-testid={ testid }
          name={ inputName }
        />
      </label>
    );
  }
}

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
};

export default Input;
