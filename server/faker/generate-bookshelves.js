const { db } = require('../database');
const { faker } = require('@faker-js/faker');

async function addBookshelfToFirestore(name, color, user) {
    try {
      const bookshelfJson = {
        name: name,
        color: color,
        user: user
      }
      db.collection('bookshelves').doc().set(bookshelfJson);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
}

for (let i = 0; i < 4; i++) {
  const name = faker.word.words({ count: { min: 1, max: 2 } });
  const color = faker.color.rgb();
  const user = 'adelinazfatu@gmail.com';

  addBookshelfToFirestore(name, color, user);
}

console.log('Finished generating bookshelves');