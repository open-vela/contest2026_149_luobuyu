/*
 * 固定长度采样窗口
 */
function pushWindow(
    oldArray,
    value,
    maxLength
  ) {
  
    let next =
      oldArray.concat([
        value
      ])
  
  
    if (
      next.length >
      maxLength
    ) {
  
      next =
        next.slice(
          next.length -
          maxLength
        )
  
    }
  
  
    return next
  
  }
  
  
  /*
   * min / avg / max
   */
  function stats(array) {
  
    if (
      !array ||
      array.length === 0
    ) {
  
      return {
  
        min:
          "--",
  
        avg:
          "--",
  
        max:
          "--"
  
      }
  
    }
  
  
    let min =
      array[0]
  
  
    let max =
      array[0]
  
  
    let sum =
      0
  
  
    for (
      let i = 0;
      i < array.length;
      i++
    ) {
  
      let value =
        array[i]
  
  
      if (
        value <
        min
      ) {
  
        min =
          value
  
      }
  
  
      if (
        value >
        max
      ) {
  
        max =
          value
  
      }
  
  
      sum +=
        value
  
    }
  
  
    return {
  
      min:
        Math.round(min),
  
      avg:
        Math.round(
          sum /
          array.length
        ),
  
      max:
        Math.round(max)
  
    }
  
  }
  
  
  /*
   * 心率状态
   */
  function heartStatus(value) {
  
    if (
      value <
      60
    ) {
  
      return "偏低"
  
    }
  
  
    if (
      value <
      100
    ) {
  
      return "正常"
  
    }
  
  
    if (
      value <
      140
    ) {
  
      return "偏高"
  
    }
  
  
    return "较高"
  
  }
  
  
  /*
   * 血氧状态
   */
  function spo2Status(value) {
  
    if (
      value >=
      95
    ) {
  
      return "正常"
  
    }
  
  
    return "偏低"
  
  }
  
  
  /*
   * 压力状态
   */
  function stressStatus(value) {
  
    if (
      value <
      30
    ) {
  
      return "放松"
  
    }
  
  
    if (
      value <
      60
    ) {
  
      return "正常"
  
    }
  
  
    if (
      value <
      80
    ) {
  
      return "偏高"
  
    }
  
  
    return "较高"
  
  }
  
  
  /*
   * service.health 错误码
   */
  function codeMessage(code) {
  
    if (
      code === 203
    ) {
  
      return "当前设备暂不支持"
  
    }
  
  
    if (
      code === 202
    ) {
  
      return "参数错误"
  
    }
  
  
    return "健康数据读取失败"
  
  }
  
  
  export default {
  
    pushWindow:
      pushWindow,
  
    stats:
      stats,
  
    heartStatus:
      heartStatus,
  
    spo2Status:
      spo2Status,
  
    stressStatus:
      stressStatus,
  
    codeMessage:
      codeMessage
  
  }