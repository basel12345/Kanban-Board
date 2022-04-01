var faker = require('faker');
var fs = require('fs');

var database = { products: [] };

for (var i = 1; i <= 100; i++) {
	database.products.push({
		title: faker.title,
		image: faker.image.files,
		date: faker.date,
		desc: faker.lorem.desc,
		tag: faker.tag.findName(),
		index: faker.number(),
        id: faker.random.number(),
		activities: faker.activities
	});
}

var json = JSON.stringify(database);
fs.writeFile('api/database.json', json, 'utf8', (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('database.json created');
});
