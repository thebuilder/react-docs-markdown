/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';
import docsToMarkdown from '../src/index';

const inputJson = require('./input/CaseList.json');
const imageJson = require('./input/Image.json');
const textAreaJson = require('./input/TextArea.json');

describe('Docs to markdown', () => {
  it('should convert caselist', () => {
    const result = docsToMarkdown(inputJson, 'CaseList');
    expect(result).toMatchSnapshot();
    expect(typeof result).toEqual('string');
    expect(result.includes('### margin')).toEqual(true);
    expect(result.includes('Arrayof')).toEqual(true);
    expect(result.includes('@custom-exclude')).toEqual(true);
    expect(result.includes('@internal')).toEqual(false); // The @internal description should be excluded.
    save('CaseList', result);
  });

  it('should convert Image', () => {
    const result = docsToMarkdown(imageJson, 'Image');
    expect(result).toMatchSnapshot();
    save('Image', result);
  });

  it('should convert TextArea', () => {
    const result = docsToMarkdown(textAreaJson, 'TextArea');
    expect(result).toMatchSnapshot();
    save('TextArea', result);
  });

  it('should handle no props', () => {
    const result = docsToMarkdown({description: 'Short description', props: null}, 'CaseList');
    expect(result).toMatchSnapshot();
  });

  describe('Exclude key', () => {
    it('should exclude key with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeKeys: 'margin'});
      expect(result).toMatchSnapshot();
      expect(result.includes('### margin')).toEqual(false);
    });

    it('should exclude key with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeKeys: ['margin']});
      expect(result).toMatchSnapshot();
      expect(result.includes('### margin')).toEqual(false);
    });

    it('should exclude key with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeKeys: /margin/});
      expect(result).toMatchSnapshot();
      expect(result.includes('### margin')).toEqual(false);
    });
  });

  describe('Exclude type', () => {
    it('should exclude type with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeTypes: 'arrayOf'});
      expect(result).toMatchSnapshot();
      expect(result.includes('Arrayof')).toEqual(false);
    });

    it('should exclude type with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeTypes: ['arrayOf']});
      expect(result).toMatchSnapshot();
      expect(result.includes('Arrayof')).toEqual(false);
    });

    it('should exclude type with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeTypes: /arrayOf/});
      expect(result).toMatchSnapshot();
      expect(result.includes('Arrayof')).toEqual(false);
    });
  });

  describe('Exclude description', () => {
    it('should exclude type with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeDescription: '@custom-exclude'});
      expect(result).toMatchSnapshot();
      expect(result.includes('@custom-exclude')).toEqual(false);
      // Should remove the default excludeDescription, so
      expect(result.includes('@internal')).toEqual(true);
    });

    it('should exclude type with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeDescription: ['@custom-exclude']});
      expect(result).toMatchSnapshot();
      expect(result.includes('@custom-exclude')).toEqual(false);
    });

    it('should exclude type with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {excludeDescription: /@custom-exclude/});
      expect(result).toMatchSnapshot();
      expect(result.includes('@custom-exclude')).toEqual(false);
    });
  });
});

function save(name, md) {
  fs.writeFile(path.join(__dirname, `output/${name}.md`), md, (err) => {
    if (err) throw err;
  });
}
