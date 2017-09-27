import HttpClient from '@/network/HttpClientPromise';

export default {
  methods: {
    // 设置网页title
    setTitleMixin(title) {
      if (this.$ssrContext) this.$ssrContext.title = title;
    },
    // 把vue实例给HttpClient，然后统一使用processBar
    getHttpClient() {
      HttpClient.self = this;
      return HttpClient;
    },
  },
};
