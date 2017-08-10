import kebab from 'lodash/fp/kebabCase'
import capitalize from 'lodash/fp/capitalize'

export function getDefaultValue(prop) {
  const value = prop.defaultValue
  const type = prop.type.name
  if (!value) {
    switch (type) {
      case 'bool':
        return false // Default for boolean is false
      default:
        return ''
    }
  }

  if (typeof value.value !== 'undefined' && value.value) {
    return value.value
  }
  return value
}

export function getKey(key, type) {
  if (isComplexType(type.name)) {
    // TODO: Add support for Github markdown?
    // Add Bitbucket header link
    return `[${key}](#markdown-header-${kebab(key)})`
  }

  return key
}

/**
 * Transform type into correct string
 * @param type
 * @returns {*}
 */
export function getTypeName(type) {
  switch (type.name) {
    case 'union':
      return 'OneOf'
    case 'custom':
      return formatCustomType(type.raw)
    case 'shape':
      return 'Object'
    default:
      return capitalize(type.name)
  }
}

export function isComplexType(name) {
  switch (name) {
    case 'union':
    case 'shape':
    case 'arrayOf':
    case 'enum':
      return true
    default:
      return false
  }
}

export function blockquote(input) {
  return input.replace(/\n/g, '\n> ')
}

export function filterProps(
  name,
  prop,
  { excludeKey, excludeType, excludeDescription },
) {
  if (!prop.type) {
    // eslint-disable-next-line no-console
    console.error(
      `Found prop '${name}' without type. Has it been removed, but left in 'defaultProps'?`,
    )
  }
  if (excludeKey && excludeKey.test(name)) return false
  if (excludeType && prop.type && excludeType.test(prop.type.name || prop.type))
    return false
  if (excludeDescription && excludeDescription.test(prop.description))
    return false

  return true
}

function formatCustomType(name) {
  return (
    name
      // If the name has the ".isRequired", remove it. Most likely a PropTypes.shape() object that's required.
      // Docgen will pick it up, and mark the value as required
      .replace('.isRequired', '')
  )
}
