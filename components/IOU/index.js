// components/IOU/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBaitiao:{
      type: Boolean,
      value: true
    },
    baitiao: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBaitiaoView(e){
      if (e.target.dataset.target=='self') {
        this.setData({
          hideBaitiao: true
        })
      }
    },
    selectedItem(e){
      let index = e.currentTarget.dataset.index;
      // console.log(index);
      let baitiao = this.data.baitiao;
      // console.log(baitiao);
      for (let i = 0; i < baitiao.length; i++) {
        baitiao[i].select = false;
      }
      baitiao[index].select = !baitiao[index].select;
      this.setData({
        baitiao: baitiao,
        selectedIndex: index
      })
    },
    makeBaitiao(){
      this.setData({
        hideBaitiao: true
      })

      const selectedItem = this.data.baitiao[this.data.selectedIndex];
      this.triggerEvent("updateSelect",selectedItem);
    } 
  }
})
