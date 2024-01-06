const { db } = require('./database');
const { faker } = require('@faker-js/faker');

const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 
                'Historical Fiction', 'Thriller', 'Action', 'Horror', 
                'Young Adult', 'Comedy'];

async function addBookToFirestore(title, author, year, house, genre, isbn, rating) {
    try {
      const bookJson = {
        title: title,
        author: author,
        publicationYear: year,
        publishingHouse: house,
        genre: genre,
        rating: rating
      }
      db.collection('books').doc(isbn).set(bookJson);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
}

for (let i = 0; i < 2; i++) {
  const title = faker.word.words({ count: { min: 1, max: 6 } });
  const bookTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const authorName = faker.person.fullName();
  const publicationYear = faker.number.int({ min: 1950, max: 2024 });
  const publishingHouse = faker.company.name();
  //const coverImageUrl = faker.image.;
  const genre = faker.helpers.arrayElement(genres);
  const isbn = faker.helpers.fromRegExp('97[8|9]\-[0-9]{10}-[0-9]');
  const rating = faker.number.int({ min: 1, max: 5 });
    
  addBookToFirestore(bookTitle, authorName, publicationYear, publishingHouse, genre, isbn, rating);
}