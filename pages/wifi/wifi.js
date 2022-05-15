// pages/wifi/wifi.js

Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        ssid: "wifi_ssid", // the name of wifi
        password: "ziroomer002", // the password of wifi
        Bssid: "ab:cd:ef:1a:c3:4f", // the mac address of route
        local_ip: "255.255.255.255", // this for current device ip
        remote_ip: "255.255.255.255", // 
        network_type: "unknown", // network type,such as wifi or 4g
        udp_obj: '', // the udp object for global
        guide_code: new Array(new Array(515).fill('1').join(''), new Array(514).fill('1').join(''), new Array(513).fill('1').join(''), new Array(512).fill('1').join('')),
        datum_code:[],
        guide_code_index: 0,
        datum_code_index: 0,
        datum_code_len: 0,
        guide_code_timer_index: 0,
        datum_code_timer_index: 0,
        timer2sIndex: 0,
        timer4sIndex: 0,
        crc8_MAXIM_DOW_Table: new Array(
            Number(0x00), Number(0x5E), Number(0xBC), Number(0xE2),
            Number(0x61), Number(0x3F), Number(0xDD), Number(0x83),
            Number(0xC2), Number(0x9C), Number(0x7E), Number(0x20),
            Number(0xA3), Number(0xFD), Number(0x1F), Number(0x41),
            Number(0x9D), Number(0xC3), Number(0x21), Number(0x7F),
            Number(0xFC), Number(0xA2), Number(0x40), Number(0x1E),
            Number(0x5F), Number(0x01), Number(0xE3), Number(0xBD),
            Number(0x3E), Number(0x60), Number(0x82), Number(0xDC),
            Number(0x23), Number(0x7D), Number(0x9F), Number(0xC1),
            Number(0x42), Number(0x1C), Number(0xFE), Number(0xA0),
            Number(0xE1), Number(0xBF), Number(0x5D), Number(0x03),
            Number(0x80), Number(0xDE), Number(0x3C), Number(0x62),
            Number(0xBE), Number(0xE0), Number(0x02), Number(0x5C),
            Number(0xDF), Number(0x81), Number(0x63), Number(0x3D),
            Number(0x7C), Number(0x22), Number(0xC0), Number(0x9E),
            Number(0x1D), Number(0x43), Number(0xA1), Number(0xFF),
            Number(0x46), Number(0x18), Number(0xFA), Number(0xA4),
            Number(0x27), Number(0x79), Number(0x9B), Number(0xC5),
            Number(0x84), Number(0xDA), Number(0x38), Number(0x66),
            Number(0xE5), Number(0xBB), Number(0x59), Number(0x07),
            Number(0xDB), Number(0x85), Number(0x67), Number(0x39),
            Number(0xBA), Number(0xE4), Number(0x06), Number(0x58),
            Number(0x19), Number(0x47), Number(0xA5), Number(0xFB),
            Number(0x78), Number(0x26), Number(0xC4), Number(0x9A),
            Number(0x65), Number(0x3B), Number(0xD9), Number(0x87),
            Number(0x04), Number(0x5A), Number(0xB8), Number(0xE6),
            Number(0xA7), Number(0xF9), Number(0x1B), Number(0x45),
            Number(0xC6), Number(0x98), Number(0x7A), Number(0x24),
            Number(0xF8), Number(0xA6), Number(0x44), Number(0x1A),
            Number(0x99), Number(0xC7), Number(0x25), Number(0x7B),
            Number(0x3A), Number(0x64), Number(0x86), Number(0xD8),
            Number(0x5B), Number(0x05), Number(0xE7), Number(0xB9),
            Number(0x8C), Number(0xD2), Number(0x30), Number(0x6E),
            Number(0xED), Number(0xB3), Number(0x51), Number(0x0F),
            Number(0x4E), Number(0x10), Number(0xF2), Number(0xAC),
            Number(0x2F), Number(0x71), Number(0x93), Number(0xCD),
            Number(0x11), Number(0x4F), Number(0xAD), Number(0xF3),
            Number(0x70), Number(0x2E), Number(0xCC), Number(0x92),
            Number(0xD3), Number(0x8D), Number(0x6F), Number(0x31),
            Number(0xB2), Number(0xEC), Number(0x0E), Number(0x50),
            Number(0xAF), Number(0xF1), Number(0x13), Number(0x4D),
            Number(0xCE), Number(0x90), Number(0x72), Number(0x2C),
            Number(0x6D), Number(0x33), Number(0xD1), Number(0x8F),
            Number(0x0C), Number(0x52), Number(0xB0), Number(0xEE),
            Number(0x32), Number(0x6C), Number(0x8E), Number(0xD0),
            Number(0x53), Number(0x0D), Number(0xEF), Number(0xB1),
            Number(0xF0), Number(0xAE), Number(0x4C), Number(0x12),
            Number(0x91), Number(0xCF), Number(0x2D), Number(0x73),
            Number(0xCA), Number(0x94), Number(0x76), Number(0x28),
            Number(0xAB), Number(0xF5), Number(0x17), Number(0x49),
            Number(0x08), Number(0x56), Number(0xB4), Number(0xEA),
            Number(0x69), Number(0x37), Number(0xD5), Number(0x8B),
            Number(0x57), Number(0x09), Number(0xEB), Number(0xB5),
            Number(0x36), Number(0x68), Number(0x8A), Number(0xD4),
            Number(0x95), Number(0xCB), Number(0x29), Number(0x77),
            Number(0xF4), Number(0xAA), Number(0x48), Number(0x16),
            Number(0xE9), Number(0xB7), Number(0x55), Number(0x0B),
            Number(0x88), Number(0xD6), Number(0x34), Number(0x6A),
            Number(0x2B), Number(0x75), Number(0x97), Number(0xC9),
            Number(0x4A), Number(0x14), Number(0xF6), Number(0xA8),
            Number(0x74), Number(0x2A), Number(0xC8), Number(0x96),
            Number(0x15), Number(0x4B), Number(0xA9), Number(0xF7),
            Number(0xB6), Number(0xE8), Number(0x0A), Number(0x54),
            Number(0xD7), Number(0x89), Number(0x6B), Number(0x35),
        ),
    },

    crc8_MAXIM_DOW_Byte(crc, byte) {
        var index;
        index = byte ^ crc;
        crc = this.data.crc8_MAXIM_DOW_Table[index] ^ (crc >> 8);
        return crc;
    },

    crc8_MAXIM_DOW_Buffer(buffer) {
        var crc = 0;
        // var type_buffer = ;

        if (typeof buffer[0] === 'string') {
            for (let i in buffer) {
                crc = this.crc8_MAXIM_DOW_Byte(crc, buffer.charCodeAt(i));
            }
        } else if (typeof buffer[0] === 'number') {
            for (let i in buffer) {
                crc = this.crc8_MAXIM_DOW_Byte(crc, buffer[i]);
            }
        } else {
            console.error("crc data buffer type error")
        }
        return crc;
    },

    bufferXOR(buffer) {
        var xor = 0
        for (let i in buffer) {
            xor ^= buffer[i]
        }
        return xor
    },

    // 密码输入框失去焦点时触发
    passwordFinish:function(e){
        this.setData({
            password: e.detail.value
        })
    },

    /**
     * this function for udp data send
     * @param {the data of udp} params 
     */
    udpSend(params) {
        // console.log("funcrion param:", params)
        // 向指定的 IP 和 port 发送消息
        this.data.udp_obj.send({
            address: this.data.remote_ip,
            port: 7001,
            setBroadcast: true,
            message: params
        });
    },

    callback_2s_task()
    {
        console.log('2s timeout')
        // stop guide code
        clearInterval(this.data.guide_code_timer_index);
        // start 4s timeout for stop DatumCode send
        this.data.timer4sIndex = setTimeout(this.callback_4s_task, 4000);
        // start 8ms task for DatumCode send
        this.data.datum_code_timer_index = setInterval(this.datum_code_8ms_task, 8);
    },

    callback_4s_task()
    {
        console.log('4s timeout')
        // stop datum code
        clearInterval(this.data.datum_code_timer_index);
        // start 2s timeout for stop guide dode send
        this.data.timer2sIndex = setTimeout(this.callback_2s_task, 2000);
        // start 8ms task for guide code
        this.data.guide_code_timer_index = setInterval(this.guide_code_8ms_task, 8);
    },

    callback_45s_task()
    {
        console.log('45s timeout')
        clearInterval(this.data.guide_code_timer_index); // stop guide code
        clearInterval(this.data.datum_code_timer_index); // stop datum code
        clearTimeout(this.data.timer2sIndex); // stop 2s task
        clearTimeout(this.data.timer4sIndex); // stop 4s task

        // close loading window
        wx.hideLoading({
            success: (res) => {},
        })
    },

    guide_code_8ms_task() {
        console.log('guide code 8ms task')
        this.data.guide_code_index = (this.data.guide_code_index + 1) % 4;
        this.udpSend(this.data.guide_code[this.data.guide_code_index])
    },

    datum_code_8ms_task() {
        console.log('datum code 8ms task')
        this.udpSend(new Array(this.data.datum_code[this.data.datum_code_index]).fill('1').join(''))
        this.data.datum_code_index = (this.data.datum_code_index + 1) % this.data.datum_code_len;
    },

    create_datum_code() {
        var datum_data = [];
        var password_lenght = this.data.password.length;
        var ssid_lenght = this.data.ssid.length;
        var Bssid_int_buffer = [];
        var Bssid_buffer = this.data.Bssid.split(':')
        for (let i in Bssid_buffer) {
            Bssid_int_buffer.push(parseInt(Bssid_buffer[i], 16));
        }
        var ip_buffer = this.data.local_ip.split('.')

        datum_data.push(9 + password_lenght + ssid_lenght); // [1]: 5 + 4 + len(password) + len(ssid)
        datum_data.push(password_lenght);
        datum_data.push(this.crc8_MAXIM_DOW_Buffer(this.data.ssid));
        datum_data.push(this.crc8_MAXIM_DOW_Buffer(Bssid_int_buffer));
        datum_data.push(0) // placehold for xor
        for (let i in ip_buffer) {
            datum_data.push(Number(ip_buffer[i]))
        }
        for (let i in this.data.password) {
            datum_data.push(this.data.password.charCodeAt(i))
        }
        for (let i in this.data.ssid) {
            datum_data.push(this.data.ssid.charCodeAt(i))
        }
        var total_xor = this.bufferXOR(datum_data)
        datum_data[4] = total_xor
        for (let i in Bssid_int_buffer) {
            datum_data.push(Bssid_int_buffer[i])
        }
        console.log(datum_data)
        return datum_data
    },

    datumEncode(data){
        const OffsetLenght = 40;
        var sequence_id = 0;
        var datum_encode = [];
        for (let i in data)
        {
            var temp_array = new Array(data[i], sequence_id);
            // console.log(temp_array)
            var crc = this.crc8_MAXIM_DOW_Buffer(temp_array)
            var D1 = (crc & 0xF0) | (data[i] >> 4);
            var D2 = 256 + sequence_id;
            var D3 = ((crc & 0x0F) << 4) | (data[i] & 0x0F);
            datum_encode.push(D1 + OffsetLenght)
            datum_encode.push(D2 + OffsetLenght)
            datum_encode.push(D3 + OffsetLenght)
            sequence_id += 1;
        }
        return datum_encode;
    },

    /**
     * smart config button function
     */
    wifi_smartconfig(){
        //连接到指定wifi网络
        console.log("get ssid:", this.data.ssid)
        console.log("get password:", this.data.password)
        var src_code = this.create_datum_code();
        this.data.datum_code = this.datumEncode(src_code);
        this.data.datum_code_len = this.data.datum_code.length;
        console.log("datum data:", this.data.datum_code)
        console.log("datum data lenght:", this.data.datum_code_len)
        var timer4sIndex = setTimeout(this.callback_45s_task, 45000);
        // start 2s timeout for stop guide dode send
        this.data.timer2sIndex = setTimeout(this.callback_2s_task, 2000);
        // start 8ms task for guide code
        this.data.guide_code_timer_index = setInterval(this.guide_code_8ms_task, 8);
        // 弹出配网等待窗口
        wx.showLoading({
            title: '设备配网中...',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取网络类型
        wx.getNetworkType({
            success: (result) => {
                console.log(result)
                this.setData({
                    network_type: result.networkType
                })
                if (this.data.network_type == "wifi") {
                    // 获取当前连接wifi的信息
                    wx.getConnectedWifi({
                        success: (result) => {
                            console.log(result)
                            this.setData({
                                ssid: result.wifi.SSID,
                                Bssid: result.wifi.BSSID
                            })
                        },
                    })
                    // 获取本机在局域网中的IP
                    wx.getLocalIPAddress({
                        success: (result) => {
                            console.log(result)
                            var ip_array = result.localip.split('.')
                            ip_array[3] = '255'
                            this.setData({
                                local_ip: result.localip,
                                remote_ip:ip_array.join('.')
                            })
                        },
                    })

                    // udp 连接设备
                    this.data.udp_obj = wx.createUDPSocket();
                    this.data.udp_obj.bind();
                    this.data.udp_obj.onMessage((res) => {
                        console.log(res)
                    });
                    console.log("get information:", this.data.ssid, this.data.Bssid, this.data.local_ip, this.data.network_type)
                } else {
                    console.error("network type not wifi :", this.data.network_type)
                }
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log("onReady get information:", this.data.ssid, this.data.Bssid, this.data.local_ip, this.data.network_type)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            })
        }
    
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})


 // wx.connectWifi({
        //     SSID: this.data.ssid,
        //     password: this.data.password,
        //     success(res) {
        //         console.log('连接设备WIFI成功',res.errMsg)
        //         // udp 连接设备
        //         wx.showLoading({
        //             title: '设备配网中...',
        //         })
        //         const udp = wx.createUDPSocket();
        //         udp.bind();
        //         // 向指定的 IP 和 port 发送消息
        //         udp.send({
        //             address: '192.168.18.255',
        //             port: 7001,
        //             message: 'hello world: 12345678'
        //         });
        //         udp.onMessage((res) => {
        //             console.log(res)
        //         });
        //     },
        //     fail(res) {
        //         console.warn(res)
        //     }
        // })