// const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

// module.exports = {
//   foo: function () {
//     // whatever
//   },
//   bar: function () {
//     // whatever
//   }
// };

// function getRandomArbitrary(min, max) {
// 	return Math.random() * (max - min) + min;
// }

// export function SeedUsers(amount) {
// 	for (let index = 0; index < amount; index++) {
// 		const username = uniqueNamesGenerator({ dictionaries: [ adjectives, colors, animals ] });
// 		const phone_number = getRandomArbitrary(10000, 100000000);
// 		const password = getRandomArbitrary(10000, 100000000);
// 		const email = uniqueNamesGenerator({ dictionaries: [ adjectives, colors, animals ] }) + '@site.com';

// 		db.query(
// 			'INSERT INTO user (phone_number, username, email, password) VALUES (?,?,?,?)',
// 			[ phone_number, username, email, password ],
// 			(err, result) => {}
// 		);
// 	}
// }
