/**
 * use map an array by parentKey, ex:
 * [{parent: 'john', child: 'jack'}, {parent: 'john', child: 'ana'}, {parent: 'jackson', child: 'end'}]  
 *  => [{parent: 'json', children: [{child: 'jack'}, {child: 'ana'}]}, {parent: 'jackson', children: [{child: 'end'}]}]
 * @param arr {Array}
 * @param parentKey {String}
 * @param childrenKey {String}
 * @return {Array}
 */
function toChildren(arr, parentKey = 'parent', childrenKey = 'children') {
  if (!Array.isArray(arr) || !arr.length) {
    return []
  }
  const tmp = {}
  arr.forEach(item => {
    const key = item[parentKey]
    tmp[key] = tmp[key] || []
    tmp[key].push(item)
  })
  return Object.entries(tmp).map(([parent, children]) => {
    return {
      [parentKey]: parent,
      [childrenKey]: children
    }
  })
}
