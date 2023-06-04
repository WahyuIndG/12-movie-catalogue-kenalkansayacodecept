/**
 *    "Mmeperbaiki dia yg terlupakan"
 * 
 * Bahasan : 
 * -> Nyelesaiin TODO:
 * - Template hasil pencarian menggunakan template menampilkan film yang disukai.
 * - Mengubah nama FavoriteMovieSearchView agar lebih general.
 * 
 * Langkah - langkah :
 * 1. Samain visi html template di favorite getFavoriteMovieTemplate() dan getMovies() menjadi getTemplate
 * 2. Perbarui file yg menggunakan method tersebut dlm hal ini movieSearch.js & movieShow.js
 * 3. Hapus method yg udh g kepake td 
 * 
 * 4. Kurangi Duplikasi kode struktur html di showMovies() & showFavoriteMovies()
 * 6. Perhatikan class div-nya !
 * 7. Drpd duplicate mending ditaruh d method baru _getEmptyMovieTemplate()
 * 8. Perbarui file searchMoviesSpec.js, tepatnya di penmaan class template container menjadi "movie-item__not__found" bukan lg "movies__not__found"
 * 
 * 9. Menyatukan/menyamakan showMovies() dan showFavoriteMovies() atau menghilangkan perbedaan anatara keduanya
 * 10. Untuk menggabungkan dua metode di atas, kita perlu memperbaiki bagaimana metode createMovieItemTemplate
 * 11. Kita menambahkan class yang dibutuhkan oleh test favoriteMovieSearchSpec.js. Kita juga menambahkan nilai cadangan ‘-’ bila properti yang hendak ditampilkan tidak dapat ditemukan pada object movie. CEK GAMBAR !
 * 12. biar makin sip <div class="movie movie-item"> perlu disederhankana menjadi movie-item saja
 * 13. perbarui searchMovieSpec.js yg make ".movie" jadiin ".movie-item"
 * 14. ubah di showMovies()
 *    document.getElementById('movie-search-container').dispatchEvent(new Event('movies:searched:updated'));
 *    jadi
 *    document.getElementById('movies').dispatchEvent(new Event('movies:updated'));
 * 15. ubah pd file2 yg menggunakannya dlm hal ini searchMovieSpec.js
 * 16. setalah itu, terlihat kedua metode sdh sama tinggal finishing (paham kan !!)
 * 
 * 17. hapus <div id="movie-search-container"> di getTemplate() karna udh dipake lg
 */