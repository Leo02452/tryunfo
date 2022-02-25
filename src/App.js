/* eslint-disable arrow-body-style */
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
      rare: 'normal',
      image: '',
      trunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      newState: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.isSaveButtonDisabled);
  }

  isSaveButtonDisabled = () => {
    const {
      name, description, attr1, attr2, attr3,
      rare, image } = this.state;

    const maxAttribute = 90;
    const maxTotalAttributes = 210;
    const nonNegative = 0;

    if ((name.length > nonNegative && description.length > nonNegative)
      && (image.length > nonNegative && rare.length > nonNegative)
      && (+attr1 + +attr2 + +attr3 <= maxTotalAttributes)
      && (maxAttribute >= +attr1 && +attr1 >= nonNegative)
      && (maxAttribute >= +attr2 && +attr2 >= nonNegative)
      && (maxAttribute >= +attr3 && +attr3 >= nonNegative)) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      name, description, attr1, attr2, attr3,
      rare, image, trunfo, newState,
    } = this.state;

    if (trunfo === true) { this.setState({ hasTrunfo: true }); }

    newState.push({
      name,
      description,
      attr1,
      attr2,
      attr3,
      rare,
      image,
      trunfo,
    });

    this.setState({
      name: '',
      description: '',
      attr1: 0,
      attr2: 0,
      attr3: 0,
      rare: 'normal',
      image: '',
      trunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  render() {
    const {
      name, description, attr1, attr2, attr3,
      rare, image, trunfo, hasTrunfo, isSaveButtonDisabled, newState } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardRare={ rare }
          cardImage={ image }
          cardTrunfo={ trunfo }
          hasTrunfo={ hasTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardRare={ rare }
          cardImage={ image }
          cardTrunfo={ trunfo }
        />
        <section className="cards-container">
          {newState.map((card) => {
            return (
              <Card
                key={ card.name }
                cardName={ card.name }
                cardDescription={ card.description }
                cardAttr1={ card.attr1 }
                cardAttr2={ card.attr2 }
                cardAttr3={ card.attr3 }
                cardRare={ card.rare }
                cardImage={ card.image }
                cardTrunfo={ card.trunfo }
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
