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
      window.localStorage.setItem('config', JSON.stringify(this.config))
    },
    imagePicker(img) {
      this.bodyStyle.setProperty('background-image', `url(${img})`)
      this.config.backgroundImage = img
      window.localStorage.setItem('config', JSON.stringify(this.config))
    },
    darkModeChange(val) {
      this.rootStyle.setProperty('--blog-bgcolor', val ? 'var(--darkmode-bgcolor)' : 'white')
      this.rootStyle.setProperty('--blog-color', val ? 'white' : 'black')
      //                                                   深灰色       米黄色
      this.rootStyle.setProperty('--input-bgcolor', val ? '#2f3133' : '#f7eed6')
      this.colorPicker(val ? this.color[5] : this.color[0])
      window.localStorage.setItem('config', JSON.stringify(this.config))
    },
  },
}

export default settingMixin
