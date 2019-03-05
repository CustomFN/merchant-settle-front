
const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
    const isMobile = this.isMobile()
    if (isMobile) {
    }
  },
  methods: {
    isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.isMobile()

        if (isMobile) {
        }
      }
    }
  }
}
