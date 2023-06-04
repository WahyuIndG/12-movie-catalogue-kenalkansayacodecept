/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
const itActsAsFavoriteMovieModel = (favoriteMovie) => {
  // get/read
  it('should return the movie that has been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });

    expect(await favoriteMovie.getMovie(1))
      .toEqual({ id: 1 });
    expect(await favoriteMovie.getMovie(2))
      .toEqual({ id: 2 });
    expect(await favoriteMovie.getMovie(3))
      .toEqual(undefined);
  });
  // add (alur negatif)
  it('should refuse a movie from being added if it does not have the correct property', async () => {
    favoriteMovie.putMovie({ aProperty: 'property' });
 
    expect(await favoriteMovie.getAllMovies())
      .toEqual([]);
  });
  // get/read
  it('can return all of the movies that have been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
 
    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });
  // delete
  it('should remove favorite movie', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    favoriteMovie.putMovie({ id: 3 });
 
    await favoriteMovie.deleteMovie(1);
 
    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });
  // delete (alur negatif)
  it('should handle request to remove a movie even though the movie has not been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    favoriteMovie.putMovie({ id: 3 });
 
    await favoriteMovie.deleteMovie(4);
 
    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should be able to search for movies', async () => {
    favoriteMovie.putMovie({ id: 1, title: 'film a' });
    favoriteMovie.putMovie({ id: 2, title: 'film b' });
    favoriteMovie.putMovie({ id: 3, title: 'film abc' });
    favoriteMovie.putMovie({ id: 4, title: 'ini mah film abcd' });

    expect(await favoriteMovie.searchMovies('film a')).toEqual([
      {id: 1, title: 'film a'},
      {id: 3, title: 'film abc'},
      {id: 4, title: 'ini mah film abcd'},
    ]);
  });
};
 
export { itActsAsFavoriteMovieModel };

/**
 *    "Yang Ditunggu Akhirnya Tiba"
 * 
 * Bahasan  :
 * - menerapkan methode searchMovie() pd model secara nyata tidak lagi dengan spy
 * 
 * Hal Baru : 
 * - xdescribe()
 * - String.indexOf()
 * 
 * Praktek  :
 * - tes 'should be able to searchMovies()' di contractTest.js
 * - kemudian akan muncul error
 * - saatnya kita membuat kode serachMovies() pd model Idb dan Array
 */ 
