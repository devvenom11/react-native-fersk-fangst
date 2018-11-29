const groupStore = [
  {
    id: 1,
    title: 'Torsk',
    categoryId: 1,
    subcategoryId: 1
  },
  {
    id: 2,
    title: 'Sei',
    categoryId: 1,
    subcategoryId: 1
  },
  {
    id: 3,
    title: 'Sild',
    categoryId: 1,
    subcategoryId: 1
  },
  {
    id: 4,
    title: 'Makrell',
    categoryId: 1,
    subcategoryId: 1
  },
  {
    id: 5,
    title: 'Steinbit',
    categoryId: 1,
    subcategoryId: 1
  },
  {
    id: 6,
    title: 'Kveite',
    categoryId: 1,
    subcategoryId: 1
  },
  {
    id: 7,
    title: 'Uer',
    categoryId: 1,
    subcategoryId: 1
  },
  {
    id: 8,
    title: 'Laks',
    categoryId: 1,
    subcategoryId: 1
  },
  {
    id: 9,
    title: 'Ørret',
    categoryId: 1,
    subcategoryId: 1
  },
  {
    id: 11,
    title: 'Reker',
    categoryId: 1,
    subcategoryId: 2
  },
  {
    id: 12,
    title: 'Kreps',
    categoryId: 1,
    subcategoryId: 2
  },
  {
    id: 13,
    title: 'Kongekrabbe',
    categoryId: 1,
    subcategoryId: 2
  },
  {
    id: 14,
    title: 'Krabbe',
    categoryId: 1,
    subcategoryId: 2
  },
  {
    id: 15,
    title: 'Hummer',
    categoryId: 1,
    subcategoryId: 2
  },
  {
    id: 16,
    title: 'Blåskjell',
    categoryId: 1,
    subcategoryId: 2
  },
  {
    id: 18,
    title: 'Muslinger',
    categoryId: 1,
    subcategoryId: 3
  },
  {
    id: 19,
    title: 'Snegler',
    categoryId: 1,
    subcategoryId: 3
  },
  {
    id: 20,
    title: 'Akkar',
    categoryId: 1,
    subcategoryId: 3
  },
  {
    id: 22,
    title: 'Sjøpølse',
    categoryId: 1,
    subcategoryId: 4
  },
  {
    id: 23,
    title: 'Sjøpiggsvin',
    categoryId: 1,
    subcategoryId: 4
  },
  {
    id: 25,
    title: 'Hval',
    categoryId: 1,
    subcategoryId: 5
  },
  {
    id: 26,
    title: 'Sel',
    categoryId: 1,
    subcategoryId: 5
  },
  {
    id: 28,
    title: 'Elg',
    categoryId: 2,
    subcategoryId: 7
  },
  {
    id: 29,
    title: 'Hjort',
    categoryId: 2,
    subcategoryId: 7
  },
  {
    id: 30,
    title: 'Dåhjort',
    categoryId: 2,
    subcategoryId: 7
  },
  {
    id: 31,
    title: 'Rådyr',
    categoryId: 2,
    subcategoryId: 7
  },
  {
    id: 32,
    title: 'Reinsdyr',
    categoryId: 2,
    subcategoryId: 7
  },
  {
    id: 34,
    title: 'Hare',
    categoryId: 2,
    subcategoryId: 8
  },
  {
    id: 35,
    title: 'Kanin',
    categoryId: 2,
    subcategoryId: 8
  },
  {
    id: 37,
    title: 'Rype',
    categoryId: 2,
    subcategoryId: 9
  },
  {
    id: 38,
    title: 'Tiur',
    categoryId: 2,
    subcategoryId: 9
  },
  {
    id: 39,
    title: 'Røy',
    categoryId: 2,
    subcategoryId: 9
  },
  {
    id: 40,
    title: 'Orrfugl',
    categoryId: 2,
    subcategoryId: 9
  },
  {
    id: 42,
    title: 'Blåbær',
    categoryId: 2,
    subcategoryId: 10
  },
  {
    id: 43,
    title: 'Tyttebær',
    categoryId: 2,
    subcategoryId: 10
  },
  {
    id: 44,
    title: 'Krøkebær',
    categoryId: 2,
    subcategoryId: 10
  },
  {
    id: 45,
    title: 'Multebær',
    categoryId: 2,
    subcategoryId: 10
  },
  {
    id: 46,
    title: 'Bringebær',
    categoryId: 2,
    subcategoryId: 10
  },
  {
    id: 47,
    title: 'Jordbær',
    categoryId: 2,
    subcategoryId: 10
  },
  {
    id: 49,
    title: 'Gressløk',
    categoryId: 2,
    subcategoryId: 11
  },
  {
    id: 50,
    title: 'Enebær',
    categoryId: 2,
    subcategoryId: 11
  },
  {
    id: 51,
    title: 'Bergmynte',
    categoryId: 2,
    subcategoryId: 11
  },
  {
    id: 53,
    title: 'Kantarell',
    categoryId: 2,
    subcategoryId: 12
  },
  {
    id: 54,
    title: 'Steinsopp',
    categoryId: 2,
    subcategoryId: 12
  },
  {
    id: 55,
    title: 'Sandsopp',
    categoryId: 2,
    subcategoryId: 12
  },
  {
    id: 56,
    title: 'Furumatriske',
    categoryId: 2,
    subcategoryId: 12
  },
  {
    id: 58,
    title: 'Måseegg',
    categoryId: 2,
    subcategoryId: 13
  },
  // {
  //   id: 59,
  //   title: 'Terneegg',
  //   categoryId: 2,
  //   subcategoryId: 13
  // },
  {
    id: 60,
    title: 'Sau',
    categoryId: 3,
    subcategoryId: 15
  },
  {
    id: 61,
    title: 'Ku',
    categoryId: 3,
    subcategoryId: 15
  },
  {
    id: 62,
    title: 'Gris',
    categoryId: 3,
    subcategoryId: 15
  },
  {
    id: 63,
    title: 'Produsert kjøtt',
    categoryId: 3,
    subcategoryId: 15
  },
  {
    id: 65,
    title: 'Kylling',
    categoryId: 3,
    subcategoryId: 16
  },
  {
    id: 66,
    title: 'Hane',
    categoryId: 3,
    subcategoryId: 16
  },
  {
    id: 67,
    title: 'Høns',
    categoryId: 3,
    subcategoryId: 16
  },
  {
    id: 69,
    title: 'Gulrot',
    categoryId: 3,
    subcategoryId: 17
  },
  {
    id: 70,
    title: 'Potet',
    categoryId: 3,
    subcategoryId: 17
  },
  {
    id: 71,
    title: 'Tomat',
    categoryId: 3,
    subcategoryId: 17
  },
  {
    id: 72,
    title: 'Kålrot',
    categoryId: 3,
    subcategoryId: 17
  },
  {
    id: 73,
    title: 'Kål',
    categoryId: 3,
    subcategoryId: 17
  },
  {
    id: 74,
    title: 'Purreløk',
    categoryId: 3,
    subcategoryId: 17
  },
  {
    id: 75,
    title: 'Brokkoli',
    categoryId: 3,
    subcategoryId: 17
  },
  {
    id: 76,
    title: 'Løk',
    categoryId: 3,
    subcategoryId: 17
  },
  {
    id: 78,
    title: 'Eple',
    categoryId: 3,
    subcategoryId: 18
  },
  {
    id: 79,
    title: 'Pære',
    categoryId: 3,
    subcategoryId: 18
  },
  {
    id: 80,
    title: 'Plomme',
    categoryId: 3,
    subcategoryId: 18
  },
  {
    id: 81,
    title: 'Jordbær',
    categoryId: 3,
    subcategoryId: 18
  },
  {
    id: 82,
    title: 'Bringebær',
    categoryId: 3,
    subcategoryId: 18
  },
  {
    id: 84,
    title: 'Kumelk',
    categoryId: 3,
    subcategoryId: 19
  },
  {
    id: 85,
    title: 'Geitemelk',
    categoryId: 3,
    subcategoryId: 19
  },
  {
    id: 86,
    title: 'Ost',
    categoryId: 3,
    subcategoryId: 19
  },
  {
    id: 87,
    title: 'Smør',
    categoryId: 3,
    subcategoryId: 19
  },
  {
    id: 89,
    title: 'Hønseegg',
    categoryId: 3,
    subcategoryId: 20
  },
  {
    id: 91,
    title: 'Juice',
    categoryId: 3,
    subcategoryId: 22
  },
  {
    id: 92,
    title: 'Saft',
    categoryId: 3,
    subcategoryId: 22
  },
  {
    id: 93,
    title: 'Kaffe',
    categoryId: 3,
    subcategoryId: 22
  },
  {
    id: 95,
    title: 'Korn',
    categoryId: 3,
    subcategoryId: 23
  },
  {
    id: 96,
    title: 'Mel',
    categoryId: 3,
    subcategoryId: 23
  },
  {
    id: 97,
    title: 'Gjær',
    categoryId: 3,
    subcategoryId: 23
  },
  {
    id: 98,
    title: 'Bakevarer',
    categoryId: 3,
    subcategoryId: 23
  },
  {
  id: 99,
  title: 'Påskeegg',
  categoryId: 5,
  subcategoryId: 29
}
];

function filter(fn = () => {}) {
  return groupStore.filter(fn);
}

function filterBySubcategory(subcategoryId) {
  const groups = groupStore.filter(group => group.subcategoryId === subcategoryId);

  if (groups.length > 0 && subcategoryId !== 13 && subcategoryId !== 29) {
    groups.push({ id: groups[groups.length - 1].id + 1, title: 'Annet' });
  }

  return groups;
}

export default {
  filter,
  filterBySubcategory
};
