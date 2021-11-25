const HOST_STR = 'http://localhost:8080/'

export default {
// 1:检查设备
  CheckDevice () {
    var url = HOST_STR + 'checkdevice'
    var xmlHttpReq = new XMLHttpRequest()
    if (xmlHttpReq != null) {
      xmlHttpReq.onload = function () {
        var buttonStr = this.getStringAfterTag(xmlHttpReq.response, 'DEVICE:').trim()
        if (buttonStr === '1') {
          // 打开设备
          this.OpenDevice()
        } else {
          alert('设备未找到')
        }
      }
      xmlHttpReq.open('GET', url + new Date().getTime(), true) // add time after url to avoid browser cache
      // setNoCache(xmlHttpReq);
      xmlHttpReq.send(null)
    }
  },

  // 2:打开设备
  OpenDevice () {
    this.getData()
    // this.postMsg('open', this.checkSign)
  },
  // 3：获取签字
  getData () {
    this.checkSign()
    var url = HOST_STR + 'getpic'
    var xmlHttpReq = new XMLHttpRequest()
    if (xmlHttpReq != null) {
      xmlHttpReq.onload = function () {
        var picString = this.getStringAfterTag(xmlHttpReq.response, 'PICDATA:')
        // eslint-disable-next-line no-undef
        picImage.src = 'data:image/png;base64,' + picString
      // document.all['Base64String'].value = picString
      }
      xmlHttpReq.open('GET', url + new Date().getTime(), true) 		// add time after url to avoid browser cache
      // setNoCache(xmlHttpReq);
      xmlHttpReq.send(null)
    }
  },
  // 4: 检查签字
  checkSign () {
    var url = HOST_STR + 'getbutton'
    var xmlHttpReq = new XMLHttpRequest()
    if (xmlHttpReq != null) {
      xmlHttpReq.onload = function () {
        var buttonStr = this.getStringAfterTag(xmlHttpReq.response, 'BTNDATA:').trim()
        if (buttonStr === '1') {
          this.Getbase64()
        }
      }
      xmlHttpReq.open('GET', url + new Date().getTime(), true)		// add time after url to avoid browser cache
      // setNoCache(xmlHttpReq);
      xmlHttpReq.send(null)
    }
  },
  // 5:获取base64编译
  Getbase64 () {
    this.getData()
  },
  // 5:获取签字之后
  getStringAfterTag (orgString, tag) {
    var len = tag.length
    var index = orgString.search(tag)
    if (index >= 0) { return orgString.substring(index + len) } else { return '' }
  },
  postMsg (dataId, callback) {
    var url = HOST_STR + dataId
    var xmlHttpReq = new XMLHttpRequest()
    if (xmlHttpReq != null) {
      xmlHttpReq.onload = callback
      xmlHttpReq.open('POST', url, true)
      xmlHttpReq.send(null)
    }
  }

}
