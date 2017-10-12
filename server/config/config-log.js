const log = {
  'appenders': [
    {
      'type': 'console', // 控制台输出日志
    },
    {
      'type': 'clustered', // 支持多 appender 时添加，
      'appenders': [
        { // 在./logs目录生成 http.log文件
          'type': 'dateFile', // datefile表示是输出按时间分文件的日志
          'filename': 'http.log', // 文件件名
          'pattern': '-yyyy-MM-dd', // 非当天日志命名格式，例如：http.log-2016-08-02
          'category': 'http', // 过滤所有日志名为 http 的日志
        },
        { // 记录所有日志
          'type': 'file', // file表示日志输出为普通文件,在此种配置下,所有日志会输出到该日志文件
          'filename': 'app.log', // 日志文件名
          'maxLogSize': 10485760, // 设置日志文件的最大大小，文件体积超过时，自动分文件
          'pattern': '-yyyy-MM-dd', //
          'numBackups': 5, // 备份的文件数量,如果文件过多则会将最旧的删除
        },
        {
          'type': 'logLevelFilter', // 日志级别过滤
          'level': 'ERROR', // 该日志文件只记录级别在error及以上的日志
          'appender': {
            'type': 'file',
            'filename': 'errors.log',
          },
        },
      ],
    },
  ],
};

module.exports = log;
