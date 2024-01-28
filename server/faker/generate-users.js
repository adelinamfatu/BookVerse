const { db } = require('../database');
const { faker } = require('@faker-js/faker');

const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 
                'Historical Fiction', 'Thriller', 'Action', 'Horror', 
                'Young Adult', 'Comedy'];

const defaultBookshelfTitles = ['Currently reading', 'Read', 'Want to read'];

async function addBookshelves(bookshelfTitles) {
    const bookshelfIds = [];

    try {
        for (const title of bookshelfTitles) {
            const isDefault = defaultBookshelfTitles.includes(title);

            const bookshelfJson = {
                title: title,
                isDefault: isDefault
            };

            const docRef = await db.collection('bookshelves').add(bookshelfJson);
            bookshelfIds.push(docRef.id);
        }

        return bookshelfIds;
    } catch (error) {
        console.error("Error adding default bookshelves: ", error);
        return [];
    }
}

              
async function addUserToFirestore(allBookshelfTitles, email, gender, name, profilePictureUrl, favoriteGenres) {
    try {
        const userJson = {
            name: name,
            gender: gender,
            profilePictureUrl: profilePictureUrl,
            favoriteGenres: favoriteGenres,
            bookshelves: {}
        }

        const bookshelfIds = await addBookshelves(allBookshelfTitles);

        for (let i = 0; i < bookshelfIds.length; i++) { 
            const id = bookshelfIds[i];
            const title = allBookshelfTitles[i];
            const hexColor = faker.color.rgb();
            const isDefault = defaultBookshelfTitles.includes(title);
            
            userJson.bookshelves[id] = {
                title: title,
                color: hexColor,
                isDefault: isDefault
            };
        }

      db.collection('users').doc(email).set(userJson);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
}

for (let i = 1; i <= 10; i++) {
    const email = faker.internet.email();
    const gender = faker.helpers.arrayElement(['Male', 'Female']);
    const name = faker.person.fullName({ sex: gender });
    const profilePictureUrl = faker.image.avatar();
    const favoriteGenres = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.helpers.arrayElement(genres));
    const additionalBookshelfTitles = Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => faker.word.words({ count: { min: 1, max: 2 } }));
    const allBookshelfTitles = [...defaultBookshelfTitles, ...additionalBookshelfTitles];
    
    addUserToFirestore(allBookshelfTitles, email, gender, name, profilePictureUrl, favoriteGenres);
}

console.log('Finished generating users');