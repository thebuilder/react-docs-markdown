/* eslint-disable global-require */
import expect from 'expect';
import docsToMarkdown from '../src/index';

describe('Docs to markdown', () => {
  it('should convert caselist', () => {
    const result = docsToMarkdown(require('./input/CaseList.json'), 'CaseList');
    expect(result).toBeA('string');
  });
});
