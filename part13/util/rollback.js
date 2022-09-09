const { rollbackMigration } = require('./db');

const main = async () => {
  await rollbackMigration();
  process.exit(0);
};

main()
