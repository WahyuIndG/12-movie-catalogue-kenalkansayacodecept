import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FavoriteMovieIdb from '../../src/scripts/data/favorite-movie-idb';

const createLikeButtonPresenterWithMovie = async (movie) => {
   await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoritesMovies: FavoriteMovieIdb,
      movie,
   });
};

   // eslint-disable-next-line import/prefer-default-export
   export { createLikeButtonPresenterWithMovie };
