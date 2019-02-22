/**
 * 高频操作优化只在最后一步触发（防抖）
 * 应用场景：用户输入，只需要在输入完成后校验即可
 */
export function debounce(fn, wait, immediate) {
  let timer = null
  return function() {
    const args = arguments
    const context = this
    if (immediate && !timer) {
      fn.apply(context, args)
    }
    if (timer) clearInterval(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

/**
 * 节流：每隔一段时间后执行，也就是降低频率，将高频操作优化成低频操作。
 * 使用场景：滚动条事件，resize事件，通常每隔100-500ms折行一次
 */
export function throttle(fn, wait, immediate) {
  let timer = null
  let callNow = true
  return function() {
    const context = this
    const args = arguments
    if (callNow) {
      fn.apply(context, args)
      callNow = false
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, wait)
    }
  }
}
