import React from 'react';
import ImageBanner from '../components/ImageBanner';
import FlexContainer from '../components/FlexContainer';
import TitleLarge from '../components/TitleLarge';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Subtitle from '../components/Subtitle';
import TitleMedium from '../components/TitleMedium';
import List from '../components/List';

function MealDetails() {
  return (
    <div className="meal-details-page">
      <ImageBanner
        data-test-id="recipe-photo"
        src=""
      />
      <FlexContainer>
        <TitleLarge data-testid="recipe-title">Título</TitleLarge>
        <FlexContainer>
          <ShareButton data-testid="share-btn" />
          <FavoriteButton data-testid="favorite-btn" />
        </FlexContainer>
      </FlexContainer>
      <Subtitle data-testid="recipe-category">Subtítulo</Subtitle>
      <TitleMedium>Ingredients</TitleMedium>
      <List>
        Xablau
      </List>
    </div>
  );
}

export default MealDetails;
