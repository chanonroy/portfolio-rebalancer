# Portfolio Rebalancer App
💰 A bring your own ingredients application for rebalancing and optimizing your ETF portfolio.

![preview](https://github.com/chanonroy/portfolio-rebalancer/blob/master/src/assets/preview.png)

## Installation Instructions

For basic usage:

1. Install [Node.js](https://nodejs.org/en/) (ideally version 6)
2. Navigate to the repo's root directory where `package.json` lives.
3. Run `npm install`

## Working on the algo (for Graeme)

Make sure you have the latest git repo and branch off: 

1. Run `git branch` to ensure that you are on the master branch.
2. Run `git pull` to get the latest updates.
3. Use `git checkout -b {branchname}`, replacing {branchname} with whatever you want your branch to be called. You now have a fresh branch. Make changes as you see fit.

Working on the script:

1. Work on the rebalancer object within `src/rebalancer.js`.
2. Define some fake input from `test/sandbox.js` and log the output using `npm run log`.
3. After you are satisfied, run `npm run test` to ensure that all unit tests pass. 

Pushing changes to GitHub

1. Run `git status` to see the files that have changed.
2. Use `git add *` to add all files to staging or `git add {filename}` with the name of the file to add specific ones. 
3. Add a message with `git commit -m "{message}"` to describe changes.
4. Use `git push origin {branchname}` or `git push` to send the changes to GitHub.
5. Make a *pull request* on this repo and tag me to review, so that I can merge your branch into master.  