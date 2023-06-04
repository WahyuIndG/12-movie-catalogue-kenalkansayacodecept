class FavoriteMovieSearchPresenter {
   constructor({ favoriteMovies, view }) {
      this._view = view;
      this._favoriteMovies = favoriteMovies;
      this._listenToSearchRequestByUser();
   }

   _listenToSearchRequestByUser() {
      this._view.runWhenUserIsSearching((latestQuery) => {
         this._searchMovies(latestQuery);
      });
   }

   async _searchMovies(latestQuery) {
      let foundMovies;
      this._latestQuery = latestQuery.trim();

      if (this.latestQuery.length > 0) {
         foundMovies = await this._favoriteMovies.searchMovies(this.latestQuery);   
      } else {
         foundMovies = await this._favoriteMovies.getAllMovies();                   
      }

      this._showFoundMovies(foundMovies);
   }     

   _showFoundMovies(movies) {
      this._view.showFavoriteMovies(movies);
   }

   get latestQuery() {
      return this._latestQuery;
   }
}


export default FavoriteMovieSearchPresenter;
