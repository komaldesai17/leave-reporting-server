const { execSync } = require('child_process');
const DB_NAME = 'leavesreportDB';

try {
    execSync(`mongoimport --db ${DB_NAME} --collection holidays --file "${process.cwd()}/src/data/seed/holidays.json" --jsonArray`);
    console.log(`Imported documents into database ${DB_NAME}`);

} catch (err) {
    console.log(`Could not import documents into database ${DB_NAME}`);
    console.log(err);
}
