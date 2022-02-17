export const select = {
  templateOf: {
    songList: '#template-song-list',
    searchForm: '#template-search-form',
  },
  containerOf: {
    pages: '#pages',
  },
  nav: {
    navWrapper: '.nav__wrapper',
    navLinks: '.nav__wrapper a',
  },
  pages: {
    homepage: {
      container: '#homepage',
      musicContainer: '#homepage .music .container',
    },
    search: {
      container: '#search',
      musicContainer: '#search .music .container',
      form: {
        wrapper: '.search-wrapper',
        container: '#search-form',
        title: '#search-form__title',
        category: '#search-form__category',
        submit: '#search-form__button',
      },
      result: '.search-result',
    },
    discover: {
      container: '#discover',
      musicContainer: '#discover .music .container',
    },
  },
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
    id: 'id',
    title: 'title,',
    author: 'author',
    filename: 'filename',
    categories: 'categories',
    ranking: 'ranking',
  },
  nav: {
    defaultPage: 'homepage',
  },
};
