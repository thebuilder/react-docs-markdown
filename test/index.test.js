/* eslint-disable global-require */
import expect from 'expect';
import fs from 'fs';
import path from 'path';
import docsToMarkdown from '../src/index';

const inputJson = require('./input/CaseList.json');

describe('Docs to markdown', () => {
  it('should convert caselist', () => {
    const result = docsToMarkdown(inputJson, 'CaseList');
    expect(result).toBeA('string');
    expect(result.includes('### margin')).toBe(true);
    expect(result.includes('Arrayof')).toBe(true);
    expect(result.includes('@custom-exclude')).toBe(true);
    expect(result.includes('@internal')).toBe(false); // The @internal description should be excluded.
    save('CaseList', result);
  });

  describe('Exclude key', () => {
    it('should exclude key with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeKeys: 'margin'});
      expect(result.includes('### margin')).toBe(false);
    });

    it('should exclude key with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeKeys: ['margin']});
      expect(result.includes('### margin')).toBe(false);
    });

    it('should exclude key with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeKeys: /margin/});
      expect(result.includes('### margin')).toBe(false);
    });
  });

  describe('Exclude type', () => {
    it('should exclude type with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeTypes: 'arrayOf'});
      expect(result.includes('Arrayof')).toBe(false);
    });

    it('should exclude type with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeTypes: ['arrayOf']});
      expect(result.includes('Arrayof')).toBe(false);
    });

    it('should exclude type with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeTypes: /arrayOf/});
      expect(result.includes('Arrayof')).toBe(false);
    });
  });

  describe('Exclude description', () => {
    it('should exclude type with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeDescription: '@custom-exclude'});
      expect(result.includes('@custom-exclude')).toBe(false);
      // Should remove the default excludeDescription, so
      expect(result.includes('@internal')).toBe(true);
    });

    it('should exclude type with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeDescription: ['@custom-exclude']});
      expect(result.includes('@custom-exclude')).toBe(false);
    });

    it('should exclude type with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeDescription: /@custom-exclude/});
      expect(result.includes('@custom-exclude')).toBe(false);
    });
  });
});

function save(name, md) {
  fs.writeFile(path.join(__dirname, `output/${name}.md`), md, (err) => {
    if (err) throw err;
  });
}
