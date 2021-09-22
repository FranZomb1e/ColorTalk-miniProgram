// index.js
// 获取应用实例
Page({
  data: {
    motto: '测测你的颜值',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
    faceImgHidden:true,
    faceImg:'../../images',
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getFaceImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.showToast({
          title: "上传成功",
          icon: "success",
          duration: 3000
        });
        wx.navigateTo({
          url: '../test/test'
        })

        // 这个是使用微信接口保存文件到数据库
        // wx.uploadFile({
        //   url: "",
        //   filePath: filePath,
        //   name: 'file',
        //   success: function (res) {

        //   }
      } 
    })
  },

  upload_file: function(e) {
    wx.showLoading({
        title: "上传中"
    });
    wx.uploadFile({
        url:url,
        filePath: e,//图片路径
        name: "user_avatar",
        formData: {
            token: a.globalData.token,
            user_avatar: "filePath"
        },
        header: {
            "Content-Type": "multipart/form-data"
        },
        success: function(a) {
            wx.hideLoading();
            wx.showToast({
                title: "上传成功",
                icon: "success",
                duration: 3000
            });
        },
        fail: function(a) {
            wx.hideLoading();
            wx.showToast({
                title: "上传失败",
                icon: "none",
                duration: 3000
            });
        }
    });
  },


  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.ctx = wx.createCameraContext()
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  takePhoto(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        var filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        that.setData({
          carWin_img: filePath, //把照片路径存到变量中，
          carWin_img_hidden: false //让展示照片的view显示
        });
        
        // })
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {

      }
    });
    
  }
})
