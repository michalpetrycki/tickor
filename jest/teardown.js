import { dropDatabase } from '../src/utils/databaseConnection';
require('ts-node/register');

afterAll(async () => {
    // await dropDatabase();

    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++after all')
});

// const teardown = async () => {
//     // await dropDatabase();
//     afterAll(async () => {
//         console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++after all')
//     });
// };

// export default teardown;
