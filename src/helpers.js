import kebab from 'lodash/fp/kebabCase'

export function isFlowType(prop) {
  return !!prop.flowType
}

export function getType(prop) {
  return prop.type || prop.flowType
}

export function getDefaultValue(prop) {
  const value = prop.defaultValue
  const type = getType(prop).name
  if (!value) {
    switch (type) {
      case 'bool':
      case 'boolean':
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
  if (type.raw) return formatCustomType(type.raw)

  switch (type.name) {
    case 'union':
    case 'literalsAndUnion':
      return 'Union'
    case 'shape':
    case 'signature':
      return 'Object'
    default:
      return type.name
  }
}

export function isComplexType(name) {
  switch (name) {
    case 'union':
    case 'literalsAndUnion':
    case 'shape':
    case 'arrayOf':
    case 'Array':
    case 'enum':
    case 'signature':
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
  if (!getType(prop)) {
    // eslint-disable-next-line no-console
    console.error(
      `Found prop '${
        name
      }' without type. Has it been removed, but left in 'defaultProps'?`,
    )
  }
  if (excludeKey && excludeKey.test(name)) return false
  const type = getType(prop)

  if (excludeType && type && excludeType.test(type.name)) return false
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
      .replace('|', '|')
  )
}
