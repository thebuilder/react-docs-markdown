import table from 'markdown-table';
import { getDefaultValue, getKey, getTypeName } from './helpers';
import { describeSubTypes } from './types';

/**
 * Loop through all the top level props
 * @param props
 * @returns {string}
 */
function addProps(props) {
  const keys = Object.keys(props);
  let output = '\n## Props\n';
  const tableValues = [['Name', 'Type', 'Default', 'Required', 'Description']];

  for (const key of keys) {
    const prop = props[key];
    tableValues.push([getKey(key, prop.type), getTypeName(prop.type), getDefaultValue(prop), prop.required, prop.description]);
  }
  output += `${table(tableValues)}\n`;

  // Add subtypes
  const subTypes = describeSubTypes(props);
  if (subTypes.length) {
    output += '\n## Complex Props\n';
    output += subTypes;
  }

  return output;
}

/**
 *
 * @param api {object} The react-docgen output
 * @param name {string} Name/title to append on the page
 * @returns {string}
 */
function docsToMarkdown(api, name = '') {
  let output = '';
  if (name) output += `# ${name}\n`;
  if (api.description) output += `\n${api.description}\n`;
  output += addProps(api.props);

  return output;
}


module.exports = docsToMarkdown;
