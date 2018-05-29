// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '热销', id: 'guowei' },
      { name: '镇店之宝', id: 'shucai' },
      { name: '煎饼花痴', id: 'chaohuo' },
      { name: '冰粉加料', id: 'dianxin' },
      { name: '洋芋土豆', id: 'cucha' },
      { name: '完美搭配', id: 'danfan' }
    ],
    goodsList: [{
      "id": '01001',
      "name": "琅琊土豆(洋芋条条)",
      "desc": "这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
      "price": "7",
      "pic_url": "/images/banner4.jpg"
    }, {
      "id": '01002',
      "name": "全家福爆多冰粉",
      "desc": "这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
      "pic_url": "/images/banner4.jpg",
      "price": "10"
    }, {
      "id": '01003',
      "name": "全家福爆多料煎饼",
      "desc": "这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
      "price": "15",
      "pic_url": "/images/banner4.jpg"
    }],
    curIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)
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