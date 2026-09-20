import health from '@service.health'


export const DATA_TYPES =
  health.DATA_TYPES


/*
 * 获取最近一次健康数据
 */
export function getRecent(dataTypes) {

  return health
    .getRecentSamples({
      dataTypes: dataTypes
    })
    .then((list) => {

      let result = []

      if (!list) {
        return result
      }


      for (
        let i = 0;
        i < list.length;
        i++
      ) {

        let item =
          list[i]


        if (
          !item ||
          !item.data
        ) {

          continue

        }


        result.push({

          ok: true,

          dataType:
            item.dataType,

          value:
            item.data.value,

          timeStamp:
            item.data.timeStamp

        })

      }


      return result

    })
    .catch((err) => {

      console.log(
        "health getRecent fail:",
        err
      )

      return []

    })

}


/*
 * 订阅单个健康类型
 */
export function subscribe(
  dataType,
  onSample,
  onError
) {

  health.subscribeSample({

    dataType:
      dataType,


    callback: (sample) => {

      if (!sample) {
        return
      }


      if (onSample) {

        onSample({

          ok: true,

          dataType:
            dataType,

          value:
            sample.value,

          timeStamp:
            sample.timeStamp

        })

      }

    },


    fail: (data, code) => {

      console.log(
        "health subscribe fail:",
        dataType,
        code,
        data
      )


      if (onError) {

        onError({

          ok: false,

          dataType:
            dataType,

          code:
            code,

          unsupported:
            code === 203

        })

      }

    }

  })

}


/*
 * 取消某种健康数据订阅
 */
export function unsubscribe(
  dataType
) {

  health.unsubscribeSample({

    dataType:
      dataType

  })

}