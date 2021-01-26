const settingMixin = {
  data: () => ({
    color: ['#e2e2e2', '#4456a7', '#44a75e', '#a74444', '#474747', '#282c35', '#008080'],
    rootStyle: document.documentElement.style,
    bodyStyle: document.body.style,
  }),
  methods: {
    colorPicker(color) {
      this.rootStyle.setProperty('--pw-header-bgcolor', color)
      const fontColor = color === this.color[0] ? 'black' : 'white'
      this.rootStyle.setProperty('--pw-title-color', fontColor)
      this.config.pwHeaderBgColor = color
      localStorage.setItem('config', JSON.stringify(this.config))
    },
    imagePicker(img) {
      this.bodyStyle.setProperty('background-image', `url(${img})`)
      this.config.backgroundImage = img
      localStorage.setItem('config', JSON.stringify(this.config))
    },
    darkModeChange(val) {
      this.rootStyle.setProperty('--blog-bgcolor', val ? '#252d38' : 'white')
      this.rootStyle.setProperty('--blog-color', val ? 'white' : 'black')
      //                                                   深灰色       浅灰色
      this.rootStyle.setProperty('--input-bgcolor', val ? '#2f3133' : '#f4f5f7')
      // 代码高亮
      this.rootStyle.setProperty('--code-bgcolor', val ? '#282c34' : 'f8f8f8')
      this.colorPicker(val ? this.color[5] : this.color[0])
      localStorage.setItem('config', JSON.stringify(this.config))
    },
  },
}

export default settingMixin
