const subcategoryStore = [
  {
    title: 'Fisk',
    id: 1,
    categoryId: 1,
    icon: require('./img/seafood/fish.png')
  },
  {
    title: 'Skalldyr',
    id: 2,
    categoryId: 1,
    icon: require('./img/seafood/shellfish.png')
  },
  {
    title: 'Bløtdyr',
    id: 3,
    categoryId: 1,
    icon: require('./img/seafood/mollusks.png')
  },
  {
    title: 'Pigghuder',
    id: 4,
    categoryId: 1,
    icon: require('./img/seafood/echinoderms.png')
  },
  {
    title: 'Sjøpattedyr',
    id: 5,
    categoryId: 1,
    icon: require('./img/seafood/marine-mammals.png')
  },
  {
    title: 'Annet',
    id: 6,
    categoryId: 1,
    icon: require('./img/seafood/other.png')
  },
  {
    title: 'Storvilt',
    id: 7,
    categoryId: 2,
    icon: require('./img/nature/big-game.png')
  },
  {
    title: 'Småvilt',
    id: 8,
    categoryId: 2,
    icon: require('./img/nature/small-game.png')
  },
  {
    title: 'Fugl',
    id: 9,
    categoryId: 2,
    icon: require('./img/shared/bird.png')
  },
  {
    title: 'Bær',
    id: 10,
    categoryId: 2,
    icon: require('./img/nature/berry.png')
  },
  {
    title: 'Urter og blomster',
    id: 11,
    categoryId: 2,
    icon: require('./img/nature/herbs-and-flowers.png')
  },
  {
    title: 'Sopp',
    id: 12,
    categoryId: 2,
    icon: require('./img/nature/mushroom.png')
  },
  {
    title: 'Egg',
    id: 13,
    categoryId: 2,
    icon: require('./img/shared/egg.png')
  },
  {
    title: 'Annet',
    id: 14,
    categoryId: 2,
    icon: require('./img/nature/other.png')
  },
  {
    title: 'Kjøtt',
    id: 15,
    categoryId: 3,
    icon: require('./img/farm/meat.png')
  },
  {
    title: 'Fugl',
    id: 16,
    categoryId: 3,
    icon: require('./img/shared/bird.png')
  },
  {
    title: 'Grønnsaker',
    id: 17,
    categoryId: 3,
    icon: require('./img/farm/vegetables.png')
  },
  {
    title: 'Frukt og bær',
    id: 18,
    categoryId: 3,
    icon: require('./img/farm/fruits-and-berries.png')
  },
  {
    title: 'Meieriprodukter',
    id: 19,
    categoryId: 3,
    icon: require('./img/farm/dairy.png')
  },
  {
    title: 'Egg',
    id: 20,
    categoryId: 3,
    icon: require('./img/shared/egg.png')
  },
  {
    title: 'Pels',
    id: 21,
    categoryId: 3,
    icon: require('./img/farm/fur.png')
  },
  {
    title: 'Drikkevarer',
    id: 22,
    categoryId: 3,
    icon: require('./img/farm/beverages.png')
  },
  {
    title: 'Honning',
    id: 30,
    categoryId: 3,
    icon: require('./img/farm/honey.png')
  },
  {
    title: 'Annet',
    id: 23,
    categoryId: 3,
    icon: require('./img/farm/other.png')
  },
  {
    title: 'Til sjøs',
    id: 24,
    categoryId: 4,
    icon: require('./img/services/sea.png')
  },
  {
    title: 'Til fjells',
    id: 25,
    categoryId: 4,
    icon: require('./img/services/mountains.png')
  },
  {
    title: 'Til gards',
    id: 26,
    categoryId: 4,
    icon: require('./img/services/garden.png')
  },
  {
    title: 'Mat og drikke',
    id: 27,
    categoryId: 4,
    icon: require('./img/services/food-and-drink.png')
  },
  {
    title: 'Annet',
    id: 28,
    categoryId: 4,
    icon: require('./img/services/other.png')
  },
  {
  title: 'Påskeegg',
  id: 29,
  categoryId: 5,
  icon: require('./img/shared/ico.png')
}
];

function filter(fn = () => {}) {
  return subcategoryStore.filter(fn);
}

function find(fn = () => {}) {
  return subcategoryStore.find(fn);
}

export default {
  filter,
  find
};
