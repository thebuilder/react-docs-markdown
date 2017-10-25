import table from 'markdown-table'
import {
  getKey,
  getType,
  getTypeName,
  isComplexType,
  blockquote,
} from './helpers'

export function describeType(type, level = 0) {
  switch (type.name) {
    case 'shape':
      return shape(type.value, level)
    case 'enum':
      return enumType(type.value)
    case 'union':
      return union(type.value, level)
    case 'arrayOf':
      return arrayOf(type.value, level)
    case 'custom':
      return type.raw || type.name
    default:
      return type.value || type.name
  }
}

export function describeSubTypes(types, level = 0) {
  const keys = Object.keys(types)

  let subTypes = ''
  let index = 0
  keys.forEach(key => {
    const prop = types[key]
    // Type can either be on the prop, or in the type field depending on depth.
    const type = getType(prop) || prop

    if (isComplexType(type.name)) {
      const result = describeType(type, level)
      if (result) {
        // Generate a horizontal ruler
        if (level === 0 && index > 0) subTypes += `\n${'-'.repeat(80)}\n`

        // Output a header, with the correct level
        subTypes += `\n###${'#'.repeat(
          Math.min(3, level),
        )} ${key}\nType: _${getTypeName(type)}_\n`
        if (prop.description) subTypes += `\n${prop.description}\n`

        if (level === 0) {
          // Add description on first level
          let typeDescription
          switch (type.name) {
            case 'arrayOf':
              typeDescription = `**${key}** is an array of the following type:`
              break
            case 'shape':
              typeDescription = `**${key}** is an object with:`
              break
            case 'enum':
              typeDescription = `**${key}** should be one of the following values:`
              break
            case 'union':
              typeDescription = `**${key}** should be one of the following types:`
              break
            default:
              break
          }

          if (typeDescription) subTypes += `\n${typeDescription}\n`
        }

        subTypes += `${result}`
        index += 1
      }
    }
  })

  return subTypes
}

export function arrayOf(type, level) {
  return describeType(type, level)
}

export function enumType(values) {
  const items = [
    ['Value', 'Type'],
    ...values.map(item => {
      let value = item.value

      // Do some basic type detection, to better label the Enum. React-doc-gen doesn't provide the type of an enum, so guess
      let type = 'Object'
      if (value.charAt(0) === "'") {
        // Remove the ' in strings
        value = value.replace(/'/g, '')
        type = 'String'
      } else if (!isNaN(parseInt(value, 10))) type = 'Number'
      else if (value === 'true' || value === 'false') type = 'Boolean'
      else if (value === 'null' || value === 'undefined') type = value
      return [value, type]
    }),
  ]

  return `\n${table(items)}\n`
}

export function shape(types, level) {
  let output = ''
  const keys = Object.keys(types)

  const items = [
    ['Name', 'Type', 'Required'],
    ...keys.map(key => {
      const type = types[key]
      return [getKey(key, type), getTypeName(type), type.required]
    }),
  ]

  output += `\n${table(items)}\n`

  const subTypes = describeSubTypes(types, level + 1)

  if (subTypes) {
    output += subTypes
  }

  return output
}

export function union(types, level) {
  if (!types) return ''
  return types.reduce((output, type) => {
    let result = `\n####${'#'.repeat(Math.min(level, 2))} ${getTypeName(
      type,
    )}\n`
    result += blockquote(describeType(type, level + 1))
    result += '\n\n' // Break the blockquote by adding double line break
    return output + result
  }, '')
}
