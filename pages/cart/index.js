// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],
    totalMoney:'0.00',
    totalCount: 0,
    selectAll: false,
    tempCount: 1,
    startX: 0,
    startY: 0
  },

  handleSwitchDetail(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + cartArray[index].id,
    })
  },
  
  getCount(e){
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    // 更新total
    cartArray[index].total = e.detail.count;
    // 更新data
    this.setData({
      cartArray: cartArray
    })
  },
  handleSubCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let totalMoney = Number(this.data.totalMoney);

    // 计算金额
    if(cartArray[index].select){
      totalMoney -= Number(cartArray[index].price);
    }

    // 更新数据
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },
  handleAddCount(e){
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let totalMoney = Number(this.data.totalMoney);

    // 计算金额
    if(cartArray[index].select){
      totalMoney += Number(cartArray[index].price);
    }

    // 更新数据
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },
  handleSelect(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;

    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;

    // 获取全选状态
    let selectAll = this.data.selectAll;
    let tempCount = this.data.tempCount;

    // 判断购物车列表select属性是否都为true
    cartArray.forEach(cart => {
      if(cart.select){
        tempCount++;
      }

      if(cartArray.length == tempCount){
        selectAll = true;
      }
    })

    // 设置选中或不选中状态
    cartArray[index].select = !cartArray[index].select;

    // 判断
    if(cartArray[index].select){
      totalMoney += Number(cartArray[index].price) * cartArray[index].total;
      totalCount++;
    }else {
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
      totalCount--;
      selectAll = false;
    }


    // 更新data
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
      selectAll: selectAll
    })
  },
  handleSelectAll(e){
    // console.log(e);
    let selectAll = this.data.selectAll;
    const cartArray = this.data.cartArray;
    let totalMoney = 0;
    let totalCount = 0;
    selectAll = !selectAll;

    cartArray.forEach(cart => {
      cart.select = selectAll;

      // 计算总金额和商品个数
      if(cart.select){
        totalMoney += Number(cart.price) * cart.total;
        totalCount++;
      }else{
        totalMoney = 0;
        totalCount = 0;
      }
    })

    this.setData({
      cartArray: cartArray,
      selectAll: selectAll,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount
    })
  },
  handleTouchStart(e){
    // console.log(e);

    // 开始触摸时,重置所有删除
    this.data.cartArray.forEach((v,i) => {
      if(v.isTouchMove){
        v.isTouchMove = false;
      }
    })

    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartArray: this.data.cartArray
    })
  },

  angle(start,end){
    var _X = end.X - start.X,
        _Y = end.Y - start.Y;

    // 返回角度
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  handleTouchMove(e){
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    let startX = this.data.startX;
    let startY = this.data.startY;

    let touchMoveX = e.changedTouches[0].clientX;
    let touchMoveY = e.changedTouches[0].clientY;

    // 获取滑动角度
    let angle = this.angle({X: startX, Y: startY}, {X: touchMoveX, Y: touchMoveY});

    // console.log(angle);

    this.data.cartArray.forEach((v,i) => {
      // 确保所有商品没有删除效果
      v.isTouchMove = false;

      // 判断角度是否大于30角度
      if(Math.abs(angle) > 30) return;

      // 判断滑动的是当前商品
      if(i == index){
        // 判断是左滑还是右滑
        if(touchMoveX > startX){ // 右滑
          v.isTouchMove = false;
        }else { // 左滑
          v.isTouchMove = true;
        }
      }
    })

    // 更新数据
    this.setData({
      cartArray: this.data.cartArray
    }) 
  },
  handleDelete(e){
    let index = e.currentTarget.dataset.index;
    let self = this;

    // 获取本地存储中的数据
    wx.getStorage({
      key: 'cartInfo',
      success(res){
        const datas = res.data;
        datas.forEach((data,i) => {
          if(data.title === self.data.cartArray[index].title){
            datas.splice(i,1);
          }
        })

        // 重新设置本地存储数据
        wx.setStorage({
          data: datas,
          key: 'cartInfo',
        })

        // 更新数据
        self.handleUpdate(index);
      }
    })
  },

  handleUpdate(index){
    let cartArray = this.data.cartArray;
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;

    // 判断选中商品,并且减掉价格
    if(cartArray[index].select){
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
      totalCount--;
    }

    cartArray.splice(index,1);

    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount
    })

    // 重置tabbar
    cartArray.length > 0 ? wx.setTabBarBadge({
      index: 2,
      text: String(cartArray.length),
    }) : wx.removeTabBarBadge({
      index: 2
    })
  },

  handleSetAccount(e){
    let shoppingList = [];
    this.data.cartArray.forEach(cart => {
      if(cart.select){
        // 选中的商品放入数组中
        shoppingList.push(cart);
      }
    })

    const accountInfo = {
      totalMoney: this.data.totalMoney,
      shoppingList: shoppingList
    }

    // 页面跳转
    wx.navigateTo({
      url: '/pages/order/index?accountInfo=' + JSON.stringify(accountInfo),
    })
  },

  onHide:function(){
    // 更新Storage
    const cartArray = this.data.cartArray;
    wx.setStorage({
      data: cartArray,
      key: 'cartInfo',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

        // 处理数据
        cartArray.forEach(cart => {
          cart.select = false;
          cart.isTouchMove = false;
        })
        self.setData({
          cartArray: cartArray,
          selectAll: false,
          totalMoney: '0.00',
          totalCount: 0
        })

        // 设置tabbar图标
        cartArray.length > 0 ? wx.setTabBarBadge({
          index: 2,
          text: String(cartArray.length),
        }) : wx.removeTabBarBadge({
          index: 2,
        })
      },
      fail(){
        wx.removeTabBarBadge({
          index: 2,
        })
      }
    })
  }
})