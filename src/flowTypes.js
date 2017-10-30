export function describeFlowType(type, level = 0) {
  switch (type.name) {
    case 'union':
      return union(type, level)
    case 'Array':
      return describeFlowType(type.elements[0], level)
    case 'signature':
      return plain(type.raw || type.name, level)
    case 'custom':
      return plain(type.raw || type.name, level)
    default:
      return plain(type.raw || type.value || type.name, level)
  }
}

export function plain(value, level) {
  if (level > 0) return value
  let output = '\n```\n'
  output += value
  output += '\n```\n'
  return output
}

export function union(type, level) {
  if (type.elements) {
    const initial = `\nShould be one of the following:\n\n`
    return (
      type.elements
        .filter(type => type.name !== 'unknown')
        .reduce((output, type) => {
          return output + `\n${describeFlowType(type, level + 1)}`
        }, initial + '```') + '\n```\n'
    )
  }

  return ''
}
