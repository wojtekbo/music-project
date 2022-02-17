import {select, settings, classNames} from './settings.js';
// import Product from './components/Product.js';
// import Cart from './components/Cart.js';
// import Booking from './components/Booking.js';
// import Home from './components/Home.js';

const app = {
  initData: function () {
    const thisApp = this;
    thisApp.data = [];
    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        thisApp.data.songs = data;
      })
      .then(() => {
        thisApp.initPages();
      })
      .catch((e) => {
        console.log('Błąd danych', e);
      });
  },

  getElements() {
    const thisApp = this;
    thisApp.dom = [];
    thisApp.dom.navWrapper = document.querySelector(select.nav.navWrapper);
    thisApp.dom.navLinks = document.querySelectorAll(select.nav.navLinks);
    thisApp.dom.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.dom.searchResult = document.querySelector(select.pages.search.result);
  },

  renderSearchForm() {
    const thisApp = this;
    thisApp.songsCategories = [];
    for (let song of thisApp.data.songs) {
      for (let category of song.categories) {
        if (!thisApp.songsCategories.includes(category)) {
          thisApp.songsCategories.push(category);
        }
      }
    }
    const source = document.querySelector(select.templateOf.searchForm).innerHTML;
    const compiledSource = Handlebars.compile(source);
    const compiledWithData = compiledSource(thisApp.songsCategories);
    document.querySelector(select.pages.search.form.wrapper).innerHTML = compiledWithData;
  },

  initNav: function () {
    const thisApp = this;
    const startPageId = settings.nav.defaultPage;
    document.querySelector('[href="#' + startPageId + '"]').classList.add(classNames.nav.active);
    thisApp.activatePage(startPageId);

    for (let link of thisApp.dom.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();
        for (let link of thisApp.dom.navLinks) {
          link.classList.remove(classNames.nav.active);
        }
        clickedElement.classList.add(classNames.nav.active);
        let id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
      });
    }
  },

  initPages: function () {
    const thisApp = this;
    thisApp.initHomepage();
    thisApp.initSearch();
    thisApp.initDiscover();
  },

  initHomepage: function () {
    const thisApp = this;
    thisApp.randerSongsList(thisApp.data.songs, select.pages.homepage.musicContainer);
  },

  initSearch: function () {
    const thisApp = this;
    thisApp.renderSearchForm();
    document.querySelector(select.pages.search.form.submit).addEventListener('click', (e) => {
      e.preventDefault();
      const inputValue = document.querySelector(select.pages.search.form.title).value;
      const category = document.querySelector(select.pages.search.form.category).value;
      thisApp.randerSongsList(thisApp.searchSong(inputValue, category), select.pages.search.musicContainer);
      if (!thisApp.searchSong(inputValue, category)) {
        thisApp.dom.searchResult.innerHTML = 'No results :(';
      } else {
        thisApp.dom.searchResult.innerHTML = 'We have found ' + thisApp.searchSong(inputValue, category).length + ' songs...';
      }
    });
  },

  initDiscover() {
    const thisApp = this;
    thisApp.randerSongsList(thisApp.randomSong(), select.pages.discover.musicContainer);
  },

  activatePage: function (pageId) {
    const thisApp = this;
    for (let page of thisApp.dom.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    window.location.hash = '#/' + pageId;
  },

  randerSongsList: function (data, container) {
    const thisApp = this;
    const source = document.querySelector(select.templateOf.songList).innerHTML;
    const compiledSource = Handlebars.compile(source);
    const compiledWithData = compiledSource(data);
    document.querySelector(container).innerHTML = compiledWithData;
    thisApp.initMusicPlayer(container);
  },

  randomSong: function () {
    const thisApp = this;
    const randomNumber = Math.floor(Math.random() * thisApp.data.songs.length);
    const randomSong = [];
    randomSong.push(thisApp.data.songs[randomNumber]);
    return randomSong;
  },

  searchSong: function (searchInput, category) {
    const thisApp = this;
    const searchQuery = searchInput;
    const searchResult = thisApp.data.songs.filter((song) => {
      if (category !== 'empty') {
        return song.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) && song.categories.includes(category);
      } else {
        return song.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
      }
    });
    return searchResult;
  },

  initMusicPlayer: function (selector) {
    const thisApp = this;
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: selector + ' .song__player',
      stopOthersOnPlay: true,
    });
  },

  init: function () {
    const thisApp = this;
    thisApp.initData();
    thisApp.getElements();
    thisApp.initNav();
  },
};

app.init();
