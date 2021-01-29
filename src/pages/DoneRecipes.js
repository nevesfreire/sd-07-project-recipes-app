import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import FlexContainer from '../components/FlexContainer';
import ButtonSmall from '../components/ButtonSmall';
import CardDoneRecipe from '../components/CardDoneRecipe';
import TopText from '../components/TopText';
import RecipeName from '../components/RecipeName';
import ShareDoneRecipe from '../components/ShareDoneRecipe';
import Tag from '../components/Tag';
import allActions from '../actions';

function DoneRecipes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Receitas Feitas'));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <FlexContainer>
        <ButtonSmall
          data-testid="filter-by-all-btn"
        >
          All
        </ButtonSmall>
        <ButtonSmall
          data-testid="filter-by-food-btn"
        >
          Food
        </ButtonSmall>
        <ButtonSmall
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </ButtonSmall>
      </FlexContainer>
      <FlexContainer>
        {something.map((recipe, index) => (
          <CardDoneRecipe key={ index } id="card">
            <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
            <FlexContainer id="card-text">
              <TopText
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.type}
              </TopText>
              <RecipeName
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </RecipeName>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {`Feita em: ${recipe.date}`}
              </p>
              <ShareDoneRecipe data-testid={ `${index}-horizontal-share-btn` } />
              <FlexContainer id="card-text__tags">
                {recipe.tags.map((tagName, i) => (
                  <Tag
                    data-testid={ `data-testid=${i}-${tagName}-horizontal-tag` }
                    key={ i }
                  >
                    {tagName}
                  </Tag>
                ))}
              </FlexContainer>
            </FlexContainer>
          </CardDoneRecipe>
        ))}
      </FlexContainer>
    </div>
  );
}

export default DoneRecipes;
