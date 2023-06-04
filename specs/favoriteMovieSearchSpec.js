/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable eol-last */
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
import FavoriteMovieSearchView from '../src/scripts/views/pages/liked-movies/favorite-movie-search-view';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';


describe('Searching Movies', () => {
   let presenter;
   let favoriteMovies;
   let view

   const searchMovies = (query) => {
      const queryElement = document.getElementById('query');
      queryElement.value = query;
      queryElement.dispatchEvent(new Event('change'));
   };
   
   const setMovieSearchContainer = () => {
      view = new FavoriteMovieSearchView();
      document.body.innerHTML = view.getTemplate();
   };

   const constructPresenter = () => {
      favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);
      presenter = new FavoriteMovieSearchPresenter({
         favoriteMovies, 
         view,
      });
   };

   beforeEach(() => {
      setMovieSearchContainer();
      constructPresenter();
   });
   


   describe('When query is filled', () => {
      it('should be able to capture the query typed by the user', () => {
         searchMovies('film a');
   
         expect(presenter.latestQuery)
         .toEqual('film a');
      });
   
      it('should ask the model to search for liked movies', () => {
         searchMovies('film a');
         expect(favoriteMovies.searchMovies)
         .toHaveBeenCalledWith('film a');
      });
   
      it('should show the movies found by Favorite Movies', (done) => {
         document.getElementById('movies').addEventListener('movies:updated', (event => {
            expect(document.querySelectorAll('.movie-item').length).toEqual(3);
            done();
         }));
   
         favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
            { id: 111, title: 'film abc' },
            { id: 222, title: 'ada juga film abcde' },
            { id: 333, title: 'ini juga boleh film a' },
         ]);
      
         searchMovies('film a');   
      });
   
      it('should show the titles of the movie found by Favorite Movies', (done) => {
         document.getElementById('movies').addEventListener('movies:updated', (event => {
            const movieTitles = document.querySelectorAll('.movie__title');
   
            expect(movieTitles.item(0).textContent).toEqual('film abc')
            expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde')
            expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a')
            
            done();
         }));
   
         favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
            { id: 111, title: 'film abc' },
            { id: 222, title: 'ada juga film abcde' },
            { id: 333, title: 'ini juga boleh film a' },
         ]);
      
         searchMovies('film a'); 
      });

      it('should show - when the movie returned does not contain a title', (done) => {
         document.getElementById('movies').addEventListener('movies:updated', (event) => {
            const movieTitles = document.querySelectorAll('.movie__title');
            expect(movieTitles.item(0).textContent).toEqual('-');
         
            done();
         })

         favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
            { id: 555},
         ]);

         searchMovies('film a');
      })
   });

   describe('When query is empty / not filled', () => {
      // kode app dikatakan lolos tes bila kalo query nya diisi dg whitespace (" ") maka harus dianggap query-nya kosong 
      it('should capture the query as empty', () => {
         searchMovies(' ');
         expect(presenter.latestQuery.length).toEqual(0);
      
         searchMovies('    ');
         expect(presenter.latestQuery.length).toEqual(0);
      
         searchMovies('');
         expect(presenter.latestQuery.length).toEqual(0);
      
         searchMovies('\t');
         expect(presenter.latestQuery.length).toEqual(0);
      });

      it('should show all favorite movies', () => {
         searchMovies('    ');
         expect(favoriteMovies.getAllMovies)
         .toHaveBeenCalled();
      });
   });

   describe('when favorite movie could be found', () => {
      it('should show the empty message', (done) => {
         document.getElementById('movies')
         .addEventListener('movies:updated', () => {
            expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1);
            done();
         });
      
      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);
   
      searchMovies('film a');
      });

      it('should not show any movie', (done) => {
         document.getElementById('movies').addEventListener('movies:updated', () => {
            expect(document.querySelectorAll('.movie-item').length).toEqual(0);
            done();
         });
         favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);
         searchMovies('film a');
      });
   });
});


