/* eslint-disable global-require */
import fs from 'fs'
import path from 'path'
import docsToMarkdown from '../src/index'

const inputJson = require('./input/CaseList.json')

const inputs = [
  inputJson,
  require('./input/Cards.json'),
  require('./input/Image.json'),
  require('./input/TextArea.json'),
  require('./input/Hero.json'),
  require('./input/Flow.json'),
]

describe('Docs to markdown', () => {
  describe('Should handle various input', () => {
    inputs.forEach(input => {
      it(`should convert ${input.displayName}`, () => {
        const result = docsToMarkdown(input, input.displayName)
        expect(result).toMatchSnapshot()
        save(input.displayName, result)
      })
    })
  })
  it('should convert caselist', () => {
    const result = docsToMarkdown(inputJson, 'CaseList')
    expect(result).toMatchSnapshot()
    expect(typeof result).toEqual('string')
    expect(result.includes('### margin')).toEqual(true)
    expect(result.includes('Arrayof')).toEqual(true)
    expect(result.includes('@custom-exclude')).toEqual(true)
    expect(result.includes('@internal')).toEqual(false) // The @internal description should be excluded.
  })

  it('should handle no props', () => {
    const result = docsToMarkdown(
      { description: 'Short description', props: null },
      'CaseList',
    )
    expect(result).toMatchSnapshot()
  })

  describe('Exclude key', () => {
    it('should exclude key with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {
        excludeKeys: 'margin',
      })
      expect(result).toMatchSnapshot()
      expect(result.includes('### margin')).toEqual(false)
    })

    it('should exclude key with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {
        excludeKeys: ['margin'],
      })
      expect(result).toMatchSnapshot()
      expect(result.includes('### margin')).toEqual(false)
    })

    it('should exclude key with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {
        excludeKeys: /margin/,
      })
      expect(result).toMatchSnapshot()
      expect(result.includes('### margin')).toEqual(false)
    })
  })

  describe('Exclude type', () => {
    it('should exclude type with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {
        excludeTypes: 'arrayOf',
      })
      expect(result).toMatchSnapshot()
      expect(result.includes('Arrayof')).toEqual(false)
    })

    it('should exclude type with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {
        excludeTypes: ['arrayOf'],
      })
      expect(result).toMatchSnapshot()
      expect(result.includes('Arrayof')).toEqual(false)
    })

    it('should exclude type with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {
        excludeTypes: /arrayOf/,
      })
      expect(result).toMatchSnapshot()
      expect(result.includes('Arrayof')).toEqual(false)
    })
  })

  describe('Exclude description', () => {
    it('should exclude type with string', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {
        excludeDescription: '@custom-exclude',
      })
      expect(result).toMatchSnapshot()
      expect(result.includes('@custom-exclude')).toEqual(false)
      // Should remove the default excludeDescription, so
      expect(result.includes('@internal')).toEqual(true)
    })

    it('should exclude type with array', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {
        excludeDescription: ['@custom-exclude'],
      })
      expect(result).toMatchSnapshot()
      expect(result.includes('@custom-exclude')).toEqual(false)
    })

    it('should exclude type with regex', () => {
      const result = docsToMarkdown(inputJson, 'CaseList', {
        excludeDescription: /@custom-exclude/,
      })
      expect(result).toMatchSnapshot()
      expect(result.includes('@custom-exclude')).toEqual(false)
    })
  })
})

function save(name, md) {
  fs.writeFile(path.join(__dirname, `output/${name}.md`), md, err => {
    if (err) throw err
  })
}
