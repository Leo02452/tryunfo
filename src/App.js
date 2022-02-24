import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      attr1: '',
      attr2: '',
      attr3: '',
      rare: '',
      trunfo: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { state } = this;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ state.name }
          cardDescription={ state.description }
          cardAttr1={ state.attr1 }
          cardAttr2={ state.attr2 }
          cardAttr3={ state.attr3 }
          cardRare={ state.rare }
          cardTrunfo={ state.trunfo }
          onInputChange={ this.onInputChange }
        />
        <Card
          cardName={ state.name }
          cardDescription={ state.description }
          cardAttr1={ state.attr1 }
          cardAttr2={ state.attr2 }
          cardAttr3={ state.attr3 }
          cardRare={ state.rare }
          cardTrunfo={ state.trunfo }
        />
      </div>
    );
  }
}

export default App;
