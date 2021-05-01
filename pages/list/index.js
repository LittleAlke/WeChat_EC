// pages/list/index.js
const interfaces = require("../../utils/urlconfig")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [],
    page: 1,
    size: 2,
    noData: false
  },

  switchProlistDetail(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/index?id='+this.data.proList[index].id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    wx.setNavigationBarTitle({
      title: options.title,
    })

    // 加载动画
    wx.showLoading({
      title: '加载中...',
    })

    // 加载请求
    wx.request({
      url: interfaces.productionsList,
      success(res) {
        self.setData({
          proList: res.data
        })
        wx.hideLoading()
        // console.log(self.data.proList);
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
    wx.showNavigationBarLoading({
      success: (res) => {
        wx.hideNavigationBarLoading()
      },
    })

    this.setData({
      page: 1,
      noData: false
    })


    const self = this;
    // 加载请求
    wx.request({
      url: interfaces.productionsList,
      success(res) {
        self.setData({
          proList: res.data
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.stopPullDownRefresh();
    wx.showNavigationBarLoading();
    const prolist = this.data.proList;
    let page = this.data.page;
    this.setData({
      page: ++page
    })

    const self = this;
    wx.request({
      url: interfaces.productionsList + "/" + self.data.page + "/" + self.data.size,
      success(res) {
        if (res.data.length == 0) {
          self.setData({
            noData: true
          })
        } else {
          res.data.forEach(item => {
            prolist.push(item)
          });
        }

        self.setData({
          proList: prolist
        })
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})