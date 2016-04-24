Hashbuster
==========
> Append an md5 hash to file names. Also checkout [Asset Injector](https://github.com/jakemulley/assetinjector), which goes hand in hand with Hashbuster to create an asset pipeline.

## Installation
```
npm i hashbuster --save-dev
```

## Options
- `basePaths` (array) - List of folders with files inside to hashbust
- `hashLength` (integer) - Length of hash to append to the filename

### Defaults
```json
basePaths: [],
hashLength: 8
```

## Usage
### NPM
```
var hasher = require('./hashbuster');
hasher({ basePaths: ['public/_css'] });
```

### Gulp
Coming soon.
