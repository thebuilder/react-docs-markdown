import kebab from 'lodash/fp/kebabCase';
import capitalize from 'lodash/fp/capitalize';

export function getDefaultValue(prop) {
  const value = prop.defaultValue;
  const type = prop.type.name;
  if (!value) {
    switch (type) {
      case 'bool':
        return false; // Default for boolean is false
      default:
        return '';
    }
  }

  if (typeof value.value !== 'undefined' && value.value) {
    return value.value;
  }
  return value;
}

export function getKey(key, type) {
  if (isComplexType(type.name)) {
    // TODO: Add support for Github markdown?
    // Add Bitbucket header link
    return `[${key}](#markdown-header-${kebab(key)})`;
  }

  return key;
}

/**
 * Transform type into correct string
 * @param type
 * @returns {*}
 */
export function getTypeName(type) {
  switch (type.name) {
    default:
      return capitalize(type.name);
    case 'union':
      return 'OneOf';
    case 'shape':
      return 'Object';
  }
}

export function isComplexType(name) {
  switch (name) {
    case 'union':
    case 'shape':
    case 'arrayOf':
    case 'enum':
      return true;
    default:
      return false;
  }
}

export function blockquote(input) {
  return input.replace(/\n/g, '\n> ');
}


export function filterProps(name, prop, {excludeKey, excludeType, excludeDescription}) {
  if (excludeKey && excludeKey.test(name)) return false;
  if (excludeType && excludeType.test(prop.type.name || prop.type)) return false;
  if (excludeDescription && excludeDescription.test(prop.description)) return false;

  return true;
}
