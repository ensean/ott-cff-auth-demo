### 背景

通过 AWS VOD [点播方案](https://aws.amazon.com/cn/solutions/implementations/video-on-demand-on-aws/)可以基于 AWS 服务快速搭建基于 HLS 的点播平台。为提升媒体资源安全，需要增加鉴权方式。常见的方式是使用 [CloudFront Signed URL](https://docs.aws.amazon.com/zh_cn/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html) 功能。但该功能仅能从访问者 IP、有效期等几个有限纬度限制媒体资源的访问。本文介绍一种基于 CloudFront Function + CloudFront Key Valute store 的鉴权方式，可根据业务需要灵活定制、调整鉴权规则。


### 实现原理

1. 后端生成鉴权信息发送给客户端，并将鉴权相关信息存储至 Key Value Store
1. 配置 HLS 播放器通过 Header 发送鉴权信息
1. CloudFront Function 提取请求中的 Header，与从 Key Value Store 中获取的信息进行比对，判断是否允许访问所请求的资源

### 配置方式

TBD

