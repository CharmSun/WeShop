// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '热销', id: 'cate1' },
      { name: '镇店之宝', id: 'cate2' },
      { name: '煎饼花痴', id: 'cate3' },
      { name: '冰粉加料', id: 'cate4' },
      { name: '洋芋土豆', id: 'cate5' },
      { name: '完美搭配', id: 'cate6' }
    ],
    goodsList: [{
      "id": '01001',
      "name": "琅琊土豆(洋芋条条)",
      "desc": "这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
      "price": "7",
      "pic": "/images/banner4.jpg",
      "num": 0
    }, {
      "id": '01002',
      "name": "全家福爆多冰粉",
      "desc": "这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
      "pic": "/images/banner4.jpg",
      "price": "10",
      "num": 0
    }, {
      "id": '01003',
      "name": "全家福爆多料煎饼",
      "desc": "这是我们店活下去的源泉！没有比这个更迷人的土豆了！",
      "price": "15",
      "pic": "/images/banner4.jpg",
      "num": 0
    }],
    curTabIdx: 0,
    cartCount: 0
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
    var cartInfo = wx.getStorageSync('cartInfo');
    var list = this.data.goodsList;

    for(var i=0; i < list.length; i++) {
      list[i].num = 0;
      for (var j = 0; j < cartInfo.list.length; j++) {
        var item = cartInfo.list[j];
        if (list[i].id == item.id) {
          list[i].num = item.num;
        }
      }
    }
    this.setData({
      goodsList: this.data.goodsList,
      cartCount: cartInfo.cartCount
    });
  },

  switchTab(e) {
    this.setData({
      curTabIdx: e.currentTarget.dataset.index
    });
  },

  increaseNum: function(e) {
    var index = e.target.dataset.index;
    if (this.data.goodsList[index].num < 99){
      this.data.goodsList[index].num += 1;
    }
    var cartInfo = this.addToCart(this.data.goodsList[index]);
    this.setData({
      goodsList: this.data.goodsList,
      cartCount: cartInfo.cartCount
    });
  },

  reduceNum: function (e) {
    var index = e.target.dataset.index;
    if (this.data.goodsList[index].num > 0) {
      this.data.goodsList[index].num -= 1;
    }
    var cartInfo = this.addToCart(this.data.goodsList[index]);
    this.setData({
      goodsList: this.data.goodsList,
      cartCount: cartInfo.cartCount
    });
  },

  addToCart: function (goods) {
    var cartInfo = wx.getStorageSync('cartInfo');
    var inCart = false;
    for (var i = 0; i < cartInfo.list.length; i++) {
      var item = cartInfo.list[i];
      if (item.id == goods.id) {
        if (goods.num > 0) {
          item.num = goods.num;
        } else {
          cartInfo.list.splice(i, 1);
        }
        inCart = true;
        break;
      }
    }
    if (!inCart && goods.num > 0) {
      cartInfo.list.push({
        ...goods,
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
    return cartInfo;
  },

  navigateToCart: function (e) {
    wx.switchTab({
      url: "/pages/cart/cart"
    });
  }

})