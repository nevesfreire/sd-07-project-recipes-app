import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkcomp extends Component {
  constructor(props) {
    super(props);
    const { ind, ctrl } = this.props;
    this.clickMaster = this.clickMaster.bind(this);
    this.state = {
      [ind]: ctrl[ind],
    };
  }

  clickMaster() {
    const { ind, ing, tip, id, call } = this.props;
    const { state } = this;
    const inProgresso = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const array = inProgresso[tip][id];
    if (state[ind] === false) {
      this.setState({ [ind]: true });
      array.push(ing);
      call(array);
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...inProgresso,
          [tip]: { ...inProgresso[tip], [id]: array },
        }),
      );
    }
  }

  render() {
    const { ind, ing, med } = this.props;
    const { state } = this;
    return (
      <div
        data-testid={ `${ind}-ingredient-step` }
      >
        <input
          type="checkbox"
          checked={ state[ind] }
          name={ ing }
          id={ ind }
          onChange={ () => this.clickMaster() }
        />
        {`-${ing}-${med}`}
      </div>
    );
  }
}

Checkcomp.propTypes = {
  call: PropTypes.func.isRequired,
  ind: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  ing: PropTypes.string.isRequired,
  tip: PropTypes.string.isRequired,
  med: PropTypes.string.isRequired,
  ctrl: PropTypes.arrayOf().isRequired,
};

export default Checkcomp;
