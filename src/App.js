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
      cardList: [],
      match: true,
      nameFilter: '',
      rareFilter: 'todas',
      trunfoFilter: false,
      filteredCardList: [],
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
      rare, image, trunfo, cardList,
    } = this.state;

    if (trunfo === true) { this.setState({ hasTrunfo: true }); }

    cardList.push({
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
      attr1: '0',
      attr2: '0',
      attr3: '0',
      rare: 'normal',
      image: '',
      trunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  deleteCard = ({ target }) => {
    const cardName = target.value;
    const { cardList } = this.state;
    const newCardList = cardList.filter((card) => card.name !== cardName);
    const hasTrunfo = newCardList.some((card) => card.trunfo);
    this.setState({
      cardList: newCardList,
      hasTrunfo,
    });
  }

  // lógica da função montada com a ajuda do código da Laís Nametala, T19A
  handleFilter = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const { nameFilter, rareFilter, trunfoFilter, cardList } = this.state;
      let filterArray = cardList.filter((card) => (
        card.name.toLowerCase().includes(nameFilter.toLowerCase())
      ));
      if (rareFilter !== 'todas') {
        filterArray = filterArray.filter((card) => card.rare === rareFilter);
      }
      if (trunfoFilter) {
        filterArray = filterArray.filter((card) => card.trunfo);
      }
      let matcher = true;
      if (filterArray.length === 0) matcher = false;
      this.setState({ filteredCardList: filterArray, match: matcher });
      this.mapFunction(filterArray);
    });
  }

  mapFunction = (array) => (
    array
      .map((card) => (
        <div key={ card.name } className="card-container">
          <Card
            cardName={ card.name }
            cardDescription={ card.description }
            cardAttr1={ card.attr1 }
            cardAttr2={ card.attr2 }
            cardAttr3={ card.attr3 }
            cardRare={ card.rare }
            cardImage={ card.image }
            cardTrunfo={ card.trunfo }
          />
          <button
            data-testid="delete-button"
            type="button"
            value={ card.name }
            onClick={ this.deleteCard }
          >
            Excluir
          </button>
        </div>))
  );

  render() {
    const {
      name, description, attr1, attr2, attr3,
      rare, image, trunfo, hasTrunfo,
      isSaveButtonDisabled, nameFilter,
      rareFilter, trunfoFilter, cardList, filteredCardList, match } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <section>
          <label htmlFor="nameFilter">
            <input
              type="text"
              data-testid="name-filter"
              name="nameFilter"
              value={ nameFilter }
              placeholder="Nome da carta"
              onChange={ this.handleFilter }
            />
          </label>
          <select
            data-testid="rare-filter"
            value={ rareFilter }
            onChange={ this.handleFilter }
            name="rareFilter"
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
          <label htmlFor="trunfoFilter">
            <input
              data-testid="trunfo-filter"
              type="checkbox"
              name="trunfoFilter"
              checked={ trunfoFilter }
              onChange={ this.handleFilter }
            />
            Super Trunfo
          </label>
        </section>
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
          onRareFilter={ this.onInputChange }
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
          {filteredCardList.length > 0
            ? this.mapFunction(filteredCardList)
            : (match && this.mapFunction(cardList))}
        </section>
      </div>
    );
  }
}

export default App;
