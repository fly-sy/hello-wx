import fetch from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: null,
    shops: [],
    pageIndex: 0,
    pageSize: 20,
    totalCount: 0,
    hasMore: true
  },


  // return 一个promise实例出去  
  loadMore() {

    let { pageIndex, pageSize } = this.data

    const params = { _page: ++pageIndex, _limit: pageSize }
    // if (searchText) params.q = searchText

    return fetch(`categories/${this.data.category.id}/shops`, params)
      .then(res => {
        // console.log(res)
        const totalCount = parseInt(res.header['X-Total-Count'])
        const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
        const shops = this.data.shops.concat(res.data)
        this.setData({ shops, totalCount, pageIndex, hasMore })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   * options 传递一些参数对象  
   */
  onLoad: function (options) {
    fetch(`categories/${options.cat}`)
      .then(res => {
        this.setData({ category: res.data })
        // 设置页面的title   
        wx.setNavigationBarTitle({ title: res.data.name })
        this.loadMore()
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
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    // this.loadMore()  
    // 这样定义之后可以可以使 loadMore 数据加载完毕之后马上进入下一个.then  
    // wx.stopPullDownRefresh() 马上关闭loading 加载  
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})