# Bionic Hare Web

Web client for bionic hare

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Install dependencies:

    yarn install

Create `.env` from `sample.env` and fill with proper credentials.

Edit `src/config/siteInfo.json` with desired config.

### Development

    yarn start

### Production

    yarn build
    npx serve build

### Deploy to GH Pages

Configure `homepage` in `package.json` and build site.

Deploy with:

    yarn deploy