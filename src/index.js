import table from 'markdown-table';
import { getDefaultValue, getKey, getTypeName, filterProps} from './helpers';
import { describeSubTypes } from './types';

const TABLE_HEADERS = ['Name', 'Type', 'Default', 'Required', 'Description'];

/**
 * Loop through all the top level props
 * @param props
 * @param options
 * @returns {string}
 */
function addProps(props, options) {
  if (!props) return '## No props';
  const keys = Object.keys(props).filter(key => filterProps(key, props[key], options));
  const filteredProps = keys.reduce((last, key) => ({...last, [key]: props[key]}), {});

  let output = '\n## Props\n';

  const items = [
    TABLE_HEADERS,
    ...keys
      .map((key) => {
        const prop = filteredProps[key];
        const row = [getKey(key, prop.type), getTypeName(prop.type), getDefaultValue(prop), prop.required, prop.description];
        return row.map((rowValue) => {
          if (typeof rowValue === 'string') {
            return rowValue.split('\n').join('<br>');
          }
          return rowValue;
        });
      }
    ),
  ];

  output += `${table(items)}\n`;

  // Add subtypes
  const subTypes = describeSubTypes(filteredProps);
  if (subTypes.length) {
    output += '\n## Complex Props\n';
    output += subTypes;
  }

  return output;
}

function normalizeOptions(options) {
  return {
    excludeKey: toRegExp(options.excludeKeys || options.excludeKey),
    excludeType: toRegExp(options.excludeTypes || options.excludeType),
    excludeDescription: toRegExp(options.excludeDescription || options.excludeDescription || '@internal'),
  };
}

function toRegExp(input) {
  if (!input) return null;
  if (Array.isArray(input)) return new RegExp(`(${input.join('|')})`, 'i');

  return new RegExp(input, 'i');
}

/**
 *
 * @param api {object} The react-docgen output
 * @param name {string} Name/title to append on the page
 * @param options {Object}
 * @param options.excludeKeys {string|Array|RegExp} Prop keys to exclude from the docs. "children" will prevent children from showing up.
 * @param options.excludeTypes {string|Array|RegExp} Prop types to exclude from the docs. "Node" will prevent Node types from showing up.
 * @param options.excludeDescription {string|Array|RegExp} If description includes matching word, the item will not be included. Default is "@internal".
 *
 * @returns {string} Markdown document
 */
function docsToMarkdown(api, name = '', options = {}) {
  let output = '';
  if (name) output += `# ${name}\n`;
  if (api.description) output += `\n${api.description}\n\n`;
  output += addProps(api.props, normalizeOptions(options));

  return output;
}


module.exports = docsToMarkdown;
