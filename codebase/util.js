/**
 *
 * 万和亿为基础
 * @param {Number} number 数字
 * @param {Number} length 输出长度,如果输入的在舍入之后还是超出的,仍旧会返回，比如:
 *  getFixedNumberWithUnit(1231111111111111111, 5, true) // 12,311,111,111亿
 *  getFixedNumberWithUnit(123111, 5) // 12.3万
 * @param {Boolean} isNeedComma 是否添加逗号
 * @param {Boolean} ignoreUnit 计算长度时是否计算单位
 */
export default function getFixedNumberWithUnit(number, length, isNeedComma, ignoreUnit) {
  // length = 3, number <= 999
  const wan = getPowBase10(4)
  const yi = getPowBase10(8)
  const max = getPowBase10(length) - 1
  let unit = ''
  let formatNumStr = ''
  if (number <= max) {
    formatNumStr = number.toString()
  } else {
    if (number >= wan && number < yi) {
      formatNumStr = getFixedNumber(number, wan, length, ignoreUnit)
      unit = '万'
    } else if (number >= yi) {
      formatNumStr = getFixedNumber(number, yi, length, ignoreUnit)
      unit = '亿'
    }
  }
  return (isNeedComma ? addComma(formatNumStr) : formatNumStr) + unit
}
function addComma(number) {
  let nStr = number.toString()
  let x = nStr.split('.')
  let x1 = x[0]
  let x2 = x.length > 1 ? '.' + x[1] : ''
  var rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  return x1 + x2
}

function getFixedNumber(number, base, length, ignoreUnit) {
  let integer = parseInt(number / base + '')
  // 去掉单位和.号
  let decimalLength =
    length === integer - 1 ? 0 : (length - integer.toString().length - (ignoreUnit ? 1 : 2))
  if (base * integer === number) {
    return integer
  }
  if (decimalLength > 0) {
    // 整除
    decimalLength = decimalLength >= 2 ? 2 : 1
  } else {
    decimalLength = 0
  }
  // 最多两位小数
  return (number / base).toFixed(decimalLength)
}

function getPowBase10(pow) {
  return Math.pow(10, pow)
}
