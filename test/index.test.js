/* eslint-disable global-require */
import expect from 'expect';
import fs from 'fs';
import path from 'path';
import docsToMarkdown from '../src/index';

describe('Docs to markdown', () => {
  it('should convert caselist', () => {
    const result = docsToMarkdown(require('./input/CaseList.json'), 'CaseList');
    expect(result).toBeA('string');
    save('CaseList', result);
  });
});

function save(name, md) {
  fs.writeFile(path.join(__dirname, `output/${name}.md`), md, (err) => {
    if (err) throw err;
  });
}
