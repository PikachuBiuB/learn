### TCP 基础

* [优缺点](#features)
* [报文格式](#format)
* [三次握手(建立连接)](#connect)
* [四次挥手(断开连接)](#disconnect)
* [差错控制](#error)
* [拥塞控制](#congestion)
* [安全问题](#safe)
* [即时通讯示例](#instance)

<h4 id="features">优缺点</h4>

`优点:` 可靠

`缺点:` 慢、占资源(实现复杂)、易攻击(机制确认)

<h4 id="format">报文格式</h4>

<img src="https://pic2.zhimg.com/v2-9cdd39da512d2a09a20aa77a05c6b0ad_b.jpg" width="600">

<h4 id="connect">三次握手(建立连接)</h4>

<img src="https://img-blog.csdn.net/20180620002440131?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2NjI5Njk2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" width="600">

(1). Client -> Server: [SYN] 序号: x

(2). Server -> Client: [SYN, ACK] 序号: y, 确认序号: x + 1

(3). Client -> Server: [ACK] 确认序号: y + 1

<h4 id="disconnect">四次挥手(断开连接)</h4>

<img src="https://img-blog.csdn.net/20180620002506635?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2NjI5Njk2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" width="600">

(1). Client -> Server: [FIN] 序号: x

(2). Server -> Client: [ACK] 确认序号: x + 1, 序号: y

(3). Server -> Client: [FIN] 序号: y + 1

(4). Client -> Server: [ACK] 确认序号: y + 2

<h4 id="error">差错控制</h4>

##### 校验

发送方设置校验码字段. 接收方通过此字段确定数据传输是否正确. `待详述`

##### 超时重传

发送方发送数据后启动定时器, 一定时间内未收到确认, 则重新发送. `待详述`

<h4 id="congestion">拥塞控制</h4>

网络传输能力不足以满足系统提供的数据传输. 则会出现拥塞. 

通过拥塞窗口大小调整发送频率. `待详述`

<h4 id="safe">安全问题</h4>

`待详述`

<h4 id="instance">即时通讯示例</h4>

见 [im-server.js](./im-server.js)、[im-client.js](./im-client.js)

使用 node 分别执行两者. 控制台直接输入内容并回车则可以看到双方消息互通

可通过 Wireshark 抓包观察