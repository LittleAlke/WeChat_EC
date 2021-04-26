// pages/me/index.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-typewx.getUserInfo')
  },

  getUserInfo(e){
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserInfo: true
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  }
})