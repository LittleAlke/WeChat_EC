const interfaces = require("../../utils/urlconfig")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountInfo: null
  },
  handleGetOpenId(e) {
    let self = this;
    // 获取openid
    wx.showLoading({
      title: '加载中...',
    })

    wx.login({
      success(res) {
        // console.log(res.code)

        // 获取openId 需要三个参数:  1.code 2 appId 3 appSecret
        const appid = "wx54d2f36a69316d6c";
        const secret = "ab59a7f9e2a13f6b1d5eec75fdb63125";
        wx.request({
          url: interfaces.getOpenid + appid + "/" + secret + "/" + res.code,
          success(res) {
            // console.log(res);
            const openid = res.data.openid;
            self.wechatPay(openid);
          }
        })
      }
    })
  },

  wechatPay(openid) {
    wx.request({
      url: interfaces.wechatPay,
      method: "POST",
      data: {
        openid: openid,
        body: "腾讯充值中心-QQ会员充值",
        out_trade_no: new Date().getTime().toString(),
        total_fee: 1
      },
      success(res) {
        console.log(res);
        wx.hideLoading();
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success (res) {
            wx.showToast({
              title: '支付成功',
            })

            // 清空购物车
            wx.setStorage({
              data: null,
              key: 'cartInfo',
            })
            wx.switchTab({
              url: '/pages/me/index',
            })

            // 作业: 跳转到购买列表中
          },
          fail (res) {
            wx.showToast({
              title: '支付失败',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(JSON.parse(options.accountInfo))
    this.setData({
      accountInfo: JSON.parse(options.accountInfo)
    })
  }
})