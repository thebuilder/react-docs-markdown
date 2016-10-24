React Docs Markdown
===========================
<!-- Build Status -->
<a href="https://travis-ci.org/thebuilder/react-docs-markdown">
  <img src="https://travis-ci.org//thebuilder/react-docs-markdown.svg" alt="Build Status" />
</a>

At the moment this is a simple package, that takes the output from [react-docgen](https://github.com/reactjs/react-docgen), and returns it as Markdown. You can then save it to a file, append more content, or whatever you need.

### API
#### docsToMarkdown(api: object, name: string, options: Object)

* **api** - The output from react-docgen.
* **name** - Component name to set as page title
* **options** _(Optional)_
  * excludeKeys
  * excludeTypes
  * excludeDescription


### Example

```js
var fs = require('fs');
var docsToMarkdown = require('react-docs-markdown');

var md = docsToMarkdown(api, 'Button');

// Use fs to write the markdown to dist
fs.writeFile('docs/button.md', md, (err) => {
  if (err) throw err;
});
```

## Publishing
Use [np](https://www.npmjs.com/package/np) when publishing a new version to ensure everything is done correctly. 
