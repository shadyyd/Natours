// a script to import data from file system to the database and delete all the documents in the databse and we run it throgh the terminal
// using:
// node .\dev-data\data\import-dev-data.js --import
// node .\dev-data\data\import-dev-data.js --delete
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('DB connection seccuss');
});

//  read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);
// console.log(tours);
// import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};

//Delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  importData().then(() => {
    process.exit();
  });
} else if (process.argv[2] === '--delete') {
  deleteData().then(() => {
    process.exit();
  });
}

// procces arguments
console.log(process.argv);
// outputs an array so we want to know the argument's position that we specify
// EX:
//   [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'C:\\Users\\ydrad\\Desktop\\complete-node-bootcamp-master\\4-natours\\starter\\dev-data\\data\\import-dev-data.js',
//     '--delete'
//   ]
// so the argument is the third in the array
// thats why we used procces.argv[2] in the if statment ;)
