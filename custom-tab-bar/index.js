Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    "list": [
        {
            "pagePath": "/pages/wifi/wifi",
            "iconPath": "/images/wifi.png",
            "selectedIconPath": "/images/wifi_hl.png",
            "text": "智能配网"
        },
        {
            "pagePath": "/pages/person/person",
            "iconPath": "/images/person.png",
            "selectedIconPath": "/images/person_hl.png",
            "text": "个人中心"
        }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})