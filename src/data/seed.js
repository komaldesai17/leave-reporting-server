const { execSync } = require('child_process');
const DB_NAME = 'leavesreportDB';

try {
    execSync(`mongoimport --db ${DB_NAME} --collection holidays --file "${process.cwd()}/src/data/seed/holidays.json" --jsonArray`);
    execSync(`mongoimport --db ${DB_NAME} --collection leaves --file "${process.cwd()}/src/data/seed/leave.json" --jsonArray`);
    execSync(`mongoimport --db ${DB_NAME} --collection users --file "${process.cwd()}/src/data/seed/user.json" --jsonArray`);

    console.log(`Imported documents into database ${DB_NAME}`);

} catch (err) {
    console.log(`Could not import documents into database ${DB_NAME}`);
    console.log(err);
}
/*
require( 'dotenv' ).config();

const { exec } = require( 'child_process' );

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const env = process.env.NODE_ENV;

let uri = '';

if( env === 'production' ) {
    uri = `--uri="mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/leavesreportDM?ssl=true&authSource=admin"`;
} 

exec(`mongoimport ${uri} --collection holidays --file "${process.cwd()}/src/data/seed/holidays.json" --jsonArray`, ( err ) => {
    if( err ) {
        console.error( err.message );
        return;
    }

    console.log( 'successfully imported holiday documents' );
});

exec(`mongoimport ${uri} --collection leaves --file "${process.cwd()}/src/data/seed/leave.json" --jsonArray`, ( err ) => {
    if( err ) {
        console.error( err.message );
        return;
    }

    console.log( 'successfully imported holiday documents' );
});
*/