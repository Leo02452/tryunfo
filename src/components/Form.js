import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <Form>
        <label htmlFor="name-input">
          <input
            type="text"
            data-testid="name-input"
            name="name-input"
          />
        </label>
        <label htmlFor="description-input">
          <textarea
            data-testid="description-input"
            name="description-input"
          />
        </label>
        <label htmlFor="attr1-input">
          <input
            type="number"
            data-testid="attr1-input"
            name="attr1-input"
          />
        </label>
        <label htmlFor="attr2-input">
          <input
            type="number"
            data-testid="attr2-input"
            name="attr2-input"
          />
        </label>
        <label htmlFor="attr3-input">
          <input
            type="number"
            data-testid="attr3-input"
            name="attr3-input"
          />
        </label>
        <label htmlFor="image-input">
          <input
            type="text"
            data-testid="image-input"
            name="image-input"
          />
        </label>
        <select data-testid="rare-input">
          <option>normal</option>
          <option>raro</option>
          <option>muito raro</option>
        </select>
        <label htmlFor="trunfo-input">
          <input
            type="checkbox"
            data-testid="trunfo-input"
            name="trunfo-input"
          />
        </label>
        <button type="button" data-testid="save-button">Salvar</button>
      </Form>
    );
  }
}

export default Form;
