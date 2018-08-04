//index.js

Page({
  data: {
    imgUrls: [
      '/images/banner1.jpg',
      '/images/banner2.jpg',
      '/images/banner3.jpg',
      '/images/banner4.jpg'
    ],
    goodsList: [{
      "id": '01001',
      "name": "琅琊土豆(洋芋条条)",
      "desc": "王牌推荐，这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
      "price": "7",
      "pic": "/images/banner4.jpg"
    }, {
      "id": '01002',
      "name": "全家福爆多冰粉",
      "desc": "王牌推荐，这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
      "pic": "/images/banner4.jpg",
      "price": "10"
    }, {
      "id": '01003',
      "name": "全家福爆多料煎饼",
      "desc": "王牌推荐，这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
      "price": "15",
      "pic": "/images/banner4.jpg"
    }],
    panel: {
      show: false,
      goods: {},
      goodsNum: 1
    },
    cartCount: 0
  },

  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var cartInfo = wx.getStorageSync('cartInfo');
    this.setData({
      cartCount: cartInfo.cartCount
    });
  },

  showPanel: function (e) {
    var index = e.target.dataset.index;
    this.setData({
      'panel.show': true,
      'panel.goods': this.data.goodsList[index],
      'panel.goodsNum': 1
    });
  },

  increaseNum: function (e) {
    var num = ++this.data.panel.goodsNum;
    if(num < 100) {
      this.setData({
        'panel.goodsNum': num
      });
    }
  },

  reduceNum: function (e) {
    var num = --this.data.panel.goodsNum;
    if (num > 0) {
      this.setData({
        'panel.goodsNum': num
      });
    }
  },

  changeNumInput: function (e) {
    var num = e.detail.value;
    if (e.detail.value > 99) {
      num = 99;
    } else if (e.detail.value < 1) {
      num = 1;
    }
    this.setData({
      'panel.goodsNum': num
    })
  },

  addToCart: function () {
    var goods = this.data.panel.goods;
    var cartInfo = wx.getStorageSync('cartInfo');
    var inCart = false;
    for (var i = 0; i < cartInfo.list.length; i++) {
      var item = cartInfo.list[i];
      if (item.id == goods.id) {
        item.num += this.data.panel.goodsNum;
        inCart = true;
        break;
      }
    }
    if (!inCart) {
      cartInfo.list.push({ 
        ...goods, 
        num: this.data.panel.goodsNum,
        selected: true
      });
    }
    var cartCount = 0;
    for (var i = 0; i < cartInfo.list.length; i++) {
      cartCount += cartInfo.list[i].num;
    }
    cartInfo.cartCount = cartCount;
    wx.setStorage({
      key: 'cartInfo',
      data: cartInfo,
    });
    this.setData({
      'cartCount': cartCount,
      'panel.show': false,
      'panel.goods': {},
      'panel.goodsNum': 1
    });
  },

  closePanel: function (e) {
    this.setData({
      'panel.show': false,
      'panel.goods': {},
      'panel.goodsNum': 1
    });
  },

  navigateToCart: function (e) {
    wx.switchTab({
      url: "/pages/cart/cart"
    });
  } 

})
