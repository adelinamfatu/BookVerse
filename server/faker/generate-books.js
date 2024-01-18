const { db } = require('../database');
const { faker } = require('@faker-js/faker');

const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 
                'Historical Fiction', 'Thriller', 'Action', 'Horror', 
                'Young Adult', 'Comedy'];

async function addBookToFirestore(title, author, cover, year, house, genre, isbn, rating, description, reviews, nbPages) {
    try {
      const bookJson = {
        title: title,
        author: author,
        publicationYear: year,
        publishingHouse: house,
        coverImage: cover,
        genre: genre,
        rating: rating,
        description: description, 
        reviews: reviews,
        nbPages: nbPages
      }
      db.collection('books').doc(isbn).set(bookJson);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
}

for (let i = 1; i <= 20; i++) {
  console.log('Generating book ' + i);
  const title = faker.word.words({ count: { min: 1, max: 6 } });
  const bookTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const authorName = faker.person.fullName();
  const coverIamge = faker.image.urlPicsumPhotos({ width: 512, height: 800 });
  const publicationYear = faker.number.int({ min: 1950, max: 2024 });
  const publishingHouse = faker.company.name();
  const genre = faker.helpers.arrayElement(genres);
  const isbn = faker.helpers.fromRegExp('97[8|9]\-[0-9]{10}-[0-9]');
  const rating = faker.number.float({ min: 1, max: 5, precision: 0.01 });
  const reviews = faker.number.int({ min: 1, max: 5000 });
  const description = faker.lorem.paragraphs( { min: 3, max: 5, separator:'<br/>\n' });
  const nbPages = faker.number.int({ min: 50, max: 650 });  

  addBookToFirestore(bookTitle, authorName, coverIamge, publicationYear, publishingHouse, genre, isbn, rating, description, reviews, nbPages);
}

console.log('Finished generating books');