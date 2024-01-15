const { db } = require('../database');
const { faker } = require('@faker-js/faker');

async function addBookshelfToFirestore(name, color) {
    try {
      const bookshelfJson = {
        name: name,
        color: color
      }
      db.collection('bookshelves').doc(id).set(bookshelfJson);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
}

for (let i = 0; i < 20; i++) {
    const name = faker.word.words({ count: { min: 1, max: 2 } });
    const color = faker.color.rgb();

    addBookshelfToFirestore(name, color);
}

console.log('Finished generating books');