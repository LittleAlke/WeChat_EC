// pages/home/index.js
const interfaces = require('../../utils/urlconfig')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipers:[],
    logos:[],
    pageRow:[],
    quicks:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    // 加载中
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: interfaces.homepage,
      header:{
        'content-type':"application/json"
      },
      success(res){
        // 隐藏加载动画
        wx.hideLoading()
        self.setData({
          swipers:res.data.swipers,
          logos:res.data.logos,
          pageRow:res.data.pageRow,
          quicks:res.data.quicks
        })
        console.log(self.data.swipers[0]);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})