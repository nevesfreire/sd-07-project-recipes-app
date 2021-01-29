import React, { Component } from 'react';

class CustomCardFavoriteRecipe extends Component {
  render() {
    const { favorite } = this.props;
    return (
      <div>
        {Object.entries(favorite).map((info) => (
          <div key={ info }>
            {info[0] === 'image'
              ? <img src={ info[1] } alt="imagem de uma receita" />
              : <p>
                {info[0]}
                :
                {' '}
                {info[1]}
                </p>
            }
          </div>
        ))}
      </div>
    );
  }
}

export default CustomCardFavoriteRecipe;
