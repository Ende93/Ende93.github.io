<template>
  <div style="display: inline-block">
    <i-count-up
      v-if="state"
      class="count-up"
      :start="start"
      :end="number"
      :decimals="decimals"
      :duration="2.5"
      :options="options"
    ></i-count-up>
    <div style="display: inline-block" v-if="!state">{{this.number}}</div>
  </div>
</template>
<script>
import ICountUp from 'vue-countup-v2'
import addCommaToNumber from './utils'
export default {
  components: {
    ICountUp
  },
  computed: {
    state() {
      const number = this.number
      return isNumber(number)
    }
  },
  data() {
    let self = this
    return {
      result: '',
      options: {
        formattingFn(val) {
          let reg = /\d|\./
          let arr = (val + '').split('')
          let unit = ''
          if (self.numberLength || self.isNeedComma) {
            self.result = addCommaToNumber(val, self.numberLength, self.isNeedComma, self.ignoreUnit)
            if (self.formatter) {
              self.result = self.formatter(self.result)
            }
            if (self.result.length > self.numberLength) {
              unit = self.result.replace(/[.\d]/g, '')
              self.result = self.result.slice(0, self.numberLength).replace(/\.$/, '')
            }
            arr = self.result.split('')
          }
          if (self.ignoreUnit) {
            self.$emit('setUnit', unit)
          }
          arr = arr.filter(e => self.ignoreUnit ? reg.test(e) : true).map(e => {
            return (
              `<span class="count-up-item ${self.getType(e)}">` +
              e +
              '</span>'
            )
          })
          return arr.join('')
        }
      }
    }
  },
  methods: {
    getType(str) {
      if (/\d/.test(str)) {
        return 'num'
      } else if (str === '.') {
        return 'point'
      } else if (str === ',') {
        return 'comma'
      } else {
        return 'name unit'
      }
    },
    /**
     * @augments {Number} num
     * @returns {Array[String]}
    */
    toFixed(num, isFloat) {
      let maxLength = 5
      let str
      if (!isFloat && num > 100000) {
        num = num / 10000
      }
      str = num + ''
      if (str.length > 5) {
        str = str.slice(0, maxLength)
        if (str.indexOf('.') > -1) {
          let len = str.length - 1
          while (str[len] === '0' || str[len] === '.') {
            len = len - 1
          }
          str = str.slice(0, len + 1)
        }
      }
      return str.split('')
    }
  },
  watch: {
    number(val) {
      let str = val + ''
      let i = str.indexOf('.')
      let t
      if (i === -1) {
        return
      }
      t = str.slice(i)
      if (t.length > 2) {
        this.start = 10.01
      } else {
        this.start = 10.1
      }
    }
  },
  props: {
    ignoreUnit: {
      type: Boolean,
      default: false
    },
    number: {
      type: [Number, String],
      required: true
    },
    decimals: {
      type: Number,
      default: 0,
    },
    start: {
      type: Number,
      default: 0
    },
    isNeedComma: {
      type: Boolean,
      default: false
    },
    formatter: Function,
    numberLength: [String, Number]
  }
}
function isNumber(num) {
  const n = +num
  if (n || n === 0) {
    return true
  }
  return false
}
</script>

