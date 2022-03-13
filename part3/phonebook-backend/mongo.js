const mongoose = require('mongoose');

const password = process.argv[2];
const url = `mongodb+srv://main:${password}@cluster0.ihvk6.mongodb.net/phonebook?retryWrites=true&w=majority`;

console.log('Connecting to database');
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Failed to connect to database:', error.message);
  });

const db = mongoose.connection;
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model('Person', personSchema);

const insert = async (name, number) => {
  const newPerson = new Person({ name, number });
  await newPerson.save();
  console.log('added', newPerson.name, newPerson.number);
  db.close();
};

const getAll = async () => {
  const persons = await Person.find({});
  console.log('phonebook:');
  persons.forEach(p => console.log(p.name, p.number));
  db.close();
};

const main = () => {
  if (process.argv.length === 5) {
    insert(process.argv[3], process.argv[4]);
  } else if (process.argv.length === 3) {
    getAll();
  }
};

main();
