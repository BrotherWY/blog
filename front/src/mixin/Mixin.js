
export default {
  data() {
    return {
      colors: ['#7AC9D5', '#9C59C4', '#76CD75', '#76D1C7', '#D76B85', '#CC8C7A', '#8E78CB', '#8077D2', '#6FD191'],
    };
  },
  methods: {
    // 设置网页title
    setTitleMixin(title) {
      if (this.$ssrContext) this.$ssrContext.title = title;
    },
  },
  computed: {
    getColor() {
      return this.colors[Math.floor(Math.random() * 9)];
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      }).then(next).catch(next);
    } else {
      next();
    }
  },
};
