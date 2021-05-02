const sequelize = require('../config/connection');
const { User } = require('../models');

const seedUsers = require('./userSeeds.json');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedDatabase();
