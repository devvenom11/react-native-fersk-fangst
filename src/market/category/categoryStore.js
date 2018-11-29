const categoryStore = [
  {
    title: 'Sjømat',
    id: 1,
    route: 'Seafood',
    banner: require('./img/banners/seafood.jpg'),
    icon: require('./img/tabs/seafood.png'),
    marker: require('./img/markers/seafood.png'),
    markerActive: require('./img/markers/seafood-active.png')
  },
  {
    title: 'Natur / Vilt',
    id: 2,
    route: 'Nature',
    banner: require('./img/banners/nature.jpg'),
    icon: require('./img/tabs/nature.png'),
    marker: require('./img/markers/nature.png'),
    markerActive: require('./img/markers/nature-active.png')
  },
  {
    title: 'Gårdsprodukter',
    id: 3,
    route: 'Farm',
    banner: require('./img/banners/farm.jpg'),
    icon: require('./img/tabs/farm.png'),
    marker: require('./img/markers/farm.png'),
    markerActive: require('./img/markers/farm-active.png')
  },
  {
    title: 'Opplevelser',
    id: 4,
    route: 'Services',
    banner: require('./img/banners/services.jpg'),
    icon: require('./img/tabs/services.png'),
    marker: require('./img/markers/services.png'),
    markerActive: require('./img/markers/services-active.png')
  },
  // {
  //   title: 'Påskeegg',
  //   id: 5,
  //   route: 'EasterEggs',
  //   banner: require('./img/banners/easter-banner.png'),
  //   icon: require('./img/tabs/egg000_crop4.png'),
  //   marker: require('./img/markers/ico.png'),
  //   markerActive: require('./img/markers/ico.png')
  // }
];

function find(fn = () => { }) {
  return categoryStore.find(fn);
}

function all() {
  return categoryStore.slice();
}

export default {
  find,
  all
};
