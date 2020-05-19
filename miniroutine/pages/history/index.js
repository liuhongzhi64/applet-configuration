import remote from '../../service/remote.js';
import constants from '../../common/constants.js';
import { image } from '../../request/index.js';
import { getSystem, getCurrentDate, lessDate } from '../../utils/util.js';
Page({
  data: {
    uniqueKey: -1,
    listData: [],
    more: true,
    page: {
      currentPage: 1,
      pageSize: 12,
      sort: 'desc'
    }
  },
  onLoad: function (options) {
    let query = JSON.parse(options.query);
    let uniqueKey = wx.getStorageSync(constants.UNIQUE_KEY);
    this.setData({
      uniqueKey: uniqueKey,
      query: query
    }, () =>{
      this.getHistoryItems();
      this.initVip();
    })
  },
  onReady: function () {

  },
  onReachBottom() {
    let that = this;
    if (this.data.more) {
      let page = this.data.page;
      page.currentPage += 1;
      this.setData({
        page: page,
        loadingmore: true
      }, () => {
        this.getHistoryItems();
        let timeset = setTimeout((callback) => {
          that.setData({
            loadingmore: false
          })
        }, 1000, () => {
          clearTimeout(timeset);
        })
      })
    }
  },
  back() {
    wx.navigateBack({});
  },
  // 获取历史记录
  getHistoryItems() {
    let more = this.data.more;
    if (!more) {
      wx.showToast({
        title: '没有了',
        icon: 'none'
      })
      return;
    }
    let that = this;
    let listData = this.data.listData;
    let page = that.data.page;
    let query = that.data.query;
    
    // 从本地取企业编号然后在接口里传值
    let merchantSysNo = wx.getStorageSync(constants.MerchantSysNo)//在71引用
    console.log(merchantSysNo)
    // remote.getMyRecords(query.userSysNo, query.touserSysNo, query.times, query.timesFinish, 1, page).then(res => {
    remote.getMyRecords(query.userSysNo, query.touserSysNo, query.times, query.timesFinish, 1, merchantSysNo, page).then(res => {
      let result = res.data;
      if (page.currentPage < result.length) {
        more = false;
      }
      for (let i = 0; i < result.length; i++) {
        result[i].HeadPortraitUrl = image(result[i].HeadPortraitUrl);
        // result[i].VisitTime = result[i].VisitTime.split('T')[0] + " " + result[i].VisitTime.split('T')[1];
      }
      that.setData({
        more: false,
        page: page,
        listData: listData.concat(result),
        historyItemsCount: res.sumCount
      })
    })
  },
  // initVip() {
  //   let that = this;
  //   remote.vipCheck(this.data.uniqueKey).then(res => {
  //     that.setData({
  //       vip: res.data
  //     })
  //   })
  // },
  initVip() {
    let that = this;

    // 从本地取企业编号然后在接口里传值
    let merchantSysNo = wx.getStorageSync(constants.MerchantSysNo)//在71引用

    remote.getUserPackage(this.data.uniqueKey, merchantSysNo).then(res => {
      that.setData({
        vip: res.data.AIData
      })
    })
  },
  showInfo(event) {
    // let index = event.currentTarget.dataset.index;
    // let historyItems = this.data.listData;
    // let item = historyItems[index];
    // wx.navigateTo({
    //   url: `../zone/customers/info/index?targetId=${item.InUserSysNo}`
    // })
    let vip = this.data.vip;
    // console.log(vip)
    wx.showLoading({
      title: '加载中',
    })
    let index = event.currentTarget.dataset.index;
    let historyItems = this.data.listData;
    let item = historyItems[index];
    // let now = new Date()
    // let y = now.getFullYear()
    // let m = now.getMonth() + 1
    // let d = now.getDate()
    // m = m < 10 ? "0" + m : m
    // d = d < 10 ? "0" + d : d
    // let today = y + "-" + m + "-" + d;
    // vip.EndTime = (vip.EndTime.split('T'))[0];
    if (vip>0) {
      wx.navigateTo({
        url: `../zone/customers/info/index?targetId=${item.InUserSysNo}`,
        success: function () {
          wx.hideLoading();
        }
      })
    } else {
      // 从本地取企业编号然后在接口里传值
      let merchantSysNo = wx.getStorageSync(constants.MerchantSysNo)
      remote.isPass(this.data.uniqueKey, merchantSysNo).then(res => {
        // console.log(res)
        wx.navigateTo({
          url: `../zone/radar/check?hadSend=${res.success}&suggestPerson=${res.data}`,
          success() {
            wx.hideLoading()
          }
        })
      })
    }
  }
})