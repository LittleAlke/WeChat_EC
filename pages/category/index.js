// pages/category/index.js
const interfaces = require("../../utils/urlconfig")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems: [],
    navRightItems: [],
    curIndex: 0
  },

  switchTab(e){
    this.setData({
      curIndex: e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    wx.showLoading({
      title: '加载中...',
    })
    
    wx.request({
      url: interfaces.productions,
      header:{
        "content-type":"application/json"
      },
      success(res){
        self.setData({
          navLeftItems: res.data.navLeftItems,
          navRightItems: res.data.navRightItems
        })
        console.log(self.data);
        wx.hideLoading()
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