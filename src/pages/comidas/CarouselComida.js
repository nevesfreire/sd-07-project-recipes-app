import React from 'react';

export default class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      recommendations: '',
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderRecommendations = this.renderRecommendations.bind(this);
    this.setClasseId = this.setClasseId.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  setClasseId(index) {
    if (index > 1) return 'hidden-item';
  }

  async fetchData() {
    const ZERO = 0;
    const SIX = 6;
    const responseAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const response = await responseAPI.json();
    const recommendations = response.drinks.slice(ZERO, SIX);
    this.setState({
      recommendations,
    });
  }

  renderRecommendations(recommendations) {
    return (
      <div className="recommendations-card">
        {(recommendations || []).map((r, index) => (
          <div
            key={ r.idMeal }
            data-testid={ `${index}-recomendation-card` }
            className={ this.setClasseId(index) }
          >
            <img src={ r.strDrinkThumb } alt="alt" width="50%" />
            <p data-testid={ `${index}-recomendation-title` }>{r.strDrink}</p>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { recommendations } = this.state;
    return (
      <>
        {this.renderRecommendations(recommendations)}
      </>
    );
  }
}
