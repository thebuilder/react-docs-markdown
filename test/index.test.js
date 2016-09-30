/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';
import docsToMarkdown from '../src/index';

const inputJson = require('./input/CaseList.json');

describe('Docs to markdown', () => {
  it('should convert caselist', () => {
    const result = docsToMarkdown(inputJson, 'CaseList');
    expect(typeof result).toEqual('string');
    expect(result.includes('### margin')).toEqual(true);
    expect(result.includes('Arrayof')).toEqual(true);
    expect(result.includes('@custom-exclude')).toEqual(true);
    expect(result.includes('@internal')).toEqual(false); // The @internal description should be excluded.
    expect(result).toMatchSnapshot();
    save('CaseList', result);
  });

  it('should handle no props', () => {
    const result = docsToMarkdown({description: 'Short description', props: null}, 'CaseList');
    expect(result).toMatchSnapshot();
  });

  describe('Exclude key', () => {
    it('should exclude key with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeKeys: 'margin'});
      expect(result.includes('### margin')).toEqual(false);
      expect(result).toMatchSnapshot();
    });

    it('should exclude key with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeKeys: ['margin']});
      expect(result.includes('### margin')).toEqual(false);
      expect(result).toMatchSnapshot();
    });

    it('should exclude key with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeKeys: /margin/});
      expect(result.includes('### margin')).toEqual(false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Exclude type', () => {
    it('should exclude type with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeTypes: 'arrayOf'});
      expect(result.includes('Arrayof')).toEqual(false);
      expect(result).toMatchSnapshot();
    });

    it('should exclude type with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeTypes: ['arrayOf']});
      expect(result.includes('Arrayof')).toEqual(false);
      expect(result).toMatchSnapshot();
    });

    it('should exclude type with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeTypes: /arrayOf/});
      expect(result.includes('Arrayof')).toEqual(false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Exclude description', () => {
    it('should exclude type with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeDescription: '@custom-exclude'});
      expect(result.includes('@custom-exclude')).toEqual(false);
      // Should remove the default excludeDescription, so
      expect(result.includes('@internal')).toEqual(true);
      expect(result).toMatchSnapshot();
    });

    it('should exclude type with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeDescription: ['@custom-exclude']});
      expect(result.includes('@custom-exclude')).toEqual(false);
      expect(result).toMatchSnapshot();
    });

    it('should exclude type with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeDescription: /@custom-exclude/});
      expect(result.includes('@custom-exclude')).toEqual(false);
      expect(result).toMatchSnapshot();
    });
  });
});

function save(name, md) {
  fs.writeFile(path.join(__dirname, `output/${name}.md`), md, (err) => {
    if (err) throw err;
  });
}
