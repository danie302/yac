// Configuration
import common from './common.json';
import development from './development.json';
import production from './production.json';

// Configurations by environment
const config = {
    development: {
        ...common,
        ...development
    },
    production: {
        ...common,
        ...production
    }
};

// Environment set up
let env = 'development';
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    env = process.env.NODE_ENV;
}

// Environment validations
export const isDevelopment = () => env === 'development';
export const isProduction = () => env === 'production';

// Configuration
export default config[env];
