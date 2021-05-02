// pages/detail/index.js
const interfaces = require("../../utils/urlconfig")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baitiao: [],
    partData: [],
    baitiaoSelectItem:{
      desc:"【白条支付】首单享立减优惠"
    },
    hideBaitiao: true,
    hideSelectItem: true,
    badgeCount: 0
  },

  setBadge(cartArray){
    this.setData({
      badgeCount: cartArray.length
    })
  },

  handleCartView(){
    // 页面跳转
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },

  addToCart(){
    // console.log(this.data.partData);
    let self = this;
    wx.getStorage({
      key: 'cartInfo',
      success(res){
        const cartArray = res.data;
        let partData = self.data.partData;
        let isExist = false;
        cartArray.forEach(cart=>{
          if (cart.id==partData.id) {
            isExist = true;
            cart.total += self.data.partData.count;
            wx.setStorage({
              data: cartArray,
              key: 'cartInfo',
            })
          }
        })
        if (!isExist) {
          partData.total = self.data.partData.count;
          cartArray.push(partData);
          wx.setStorage({
            data: cartArray,
            key: 'cartInfo',
          })
        }
        self.setBadge(cartArray)
      },

      fail(){
        let partData = self.data.partData;
        partData.total = self.data.partData.count;

        let cartArray = [];
        cartArray.push(partData);

        wx.setStorage({
          data: cartArray,
          key: 'cartInfo',
        })
        self.setBadge(cartArray)
      }
    })

    wx.showToast({
      title: '成功加入购物车',
      icon: "success",
      duration: 3000
    })
  },
  updateCount(e){
    var partData = this.data.partData;
    partData.count = e.detail.count;
    // console.log(partData);
    this.setData({
      partData: partData
    })
  },
  handleUpdate(e){
    // console.log(e.detail);
    this.setData({
      baitiaoSelectItem: e.detail
    })
  },

  handleBaitiaoView(){
    // console.log("白条");
    this.setData({
      hideBaitiao: false
    })
  },

  handleCountView(){
    // console.log("count");
    this.setData({
      hideSelectItem: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    // console.log(options);
    const id = options.id;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: interfaces.productionsDetail,
      success(res){
        console.log(res.data);
        let result = null;
        res.data.forEach(element => {
          if (element.partData.id==id) {
            result = element
          }
        });
        self.setData({
          baitiao:result.baitiao,
          partData:result.partData
        })
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
    const self = this;
    wx.getStorage({
      key: 'cartInfo',
      success(res){
        const cartArray = res.data;
        self.setBadge(cartArray);
      }
    })

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