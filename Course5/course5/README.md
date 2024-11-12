## Create Solana NFTs With Metaplex

This repo contains code used to create an NFT using the Metaplex Umi framework.

`metaplex-old` folder cointains code which shows the old way of doing things and I do not recommend using it.

## Prereqs

Create an `.env` file and add a Solana keypair valid environment variable:

```bash
SECRET_KEY="[<your_key_here>]"
```

## How To Use

To clone and run, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/danielpavel/solana-developers-program

# Go into the umi folder
$ cd umi

# Install dependencies
$ npm install

# Run
$ npx esrun index.ts
```
