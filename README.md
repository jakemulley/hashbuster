# Hashbuster
Cache-bust files using an md5 hash and inject it into a source file.

## Still in development.

## Usage
### Injecting into `source` file
In your source file, specify where you'd like things injected by _file extension_, like this:
`<!--inject:css--><!--inject:stop-->`. Files with an extension of `.css` will be injected here.

**Please note:** only CSS and JS files are currently supported. Create an issue on GitHub if you'd like me to add another filetype.

### NPM
`var hashbuster = require('hashbuster');`

## Options
```
var plugin = hashbuster({
    attributes: {
        'css': {
            rel: 'stylesheet',
            type: 'text/css'
        },
        'js': null
    },
    basePaths: ['./public/_css', './public/_js'],
    hash: true,
    omit: './public',
    source: './public/index.html'
});
```
Defaults as above.
- `attributes`: based on the file extension, specify attributes you want to include on the HTML reference, e.g. `rel: 'stylesheet'`. If this is set to `true`, it will not include an explicit value but will include the key, i.e. `async: true` will output `async`, not `async="true"`.
- `basePaths`: The base paths of CSS and JS files you want to include in to be hashed and injected into your `source` file.
- `hash`: A boolean to tell the module whether to hash or just inject.
- `omit`: A string to omit from the basePath when output into the `source` file.
- `source`: Source file path of where the inject references are.
