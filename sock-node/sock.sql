SET NAMES UTF8;
DROP DATABASE IF EXISTS sock;
CREATE DATABASE sock CHARSET=UTF8;
USE sock;
/*新闻表*/
CREATE TABLE news(
    nid INT PRIMARY KEY AUTO_INCREMENT,
    pic VARCHAR(56),
    title VARCHAR(56),
    ntime DATETIME,
    content VARCHAR(1280)
);
INSERT INTO news VALUES
(1,"http://127.0.0.1:3000/img/new1.png","零食工坊受邀出席2018中国特许加盟大会 与商业领袖共话新零售","2018-10-30","由中国连锁经营协会（CCFA）主办的“2018中国特许加盟大会”于6月11日至12日在上海虹桥锦江大酒店成功举办，来自全国各行各业的商业领袖与精英代表共同出席了此次会议。零食工坊作为全国高端休闲零食品牌，多次受邀出席中国特许加盟大会，已连续2年被授予3A级成员企业。本届大会主题为“数字特许 赋能门店”，出席大会人员均是来自全国各地，各个行业商业大咖和特许经营从业者，围绕特许行业新技术应用，跨行业生态圈的打造，智慧零售等热点话题进行分享交流，并对新消费，新零售，新趋势等进行重新理解和定义，此次大会还邀请政府主管部门解读特许经营相关政策以及特许发展政策环境。"),
(2,"http://127.0.0.1:3000/img/new2.png","凝心聚力，迎战旺季 | 零食工坊2018·旺季誓师大会顺利召开","2018-10-31","不忘初心，砥砺前行，又到了一年一度年底收官冲刺的关键时期，零食工坊响应集团公司号召举办了2018春节战役誓师动员大会，为明确年底工作目标，以提升员工的信心，为打好2017年最后一场重要..."),
(3,"http://127.0.0.1:3000/img/new3.jpg","回顾2017 | 和你在一起的每一刻都值得被珍藏","2018-11-01","亲爱的零食工坊家人多少努力与拼搏在曾经的春夏秋冬里变作身后的路回首2017这一年多少爱变成种子悄悄埋在心里多少责任扎根在心里坚守不变多少成长随着时间慢慢地壮大但2017留给零工的不止是..."),
(4,"http://127.0.0.1:3000/img/new4.jpg","疯了！零食工坊南京河西万达店开业首日，零食分分钟被抢空！","2018-11-02","昨天在众多吃货盆友们盼星星盼月亮万众瞩目下零食工坊全新品牌体验店于11月15日在南京河西万达广场B座正式开业！！！..."),
(5,"http://127.0.0.1:3000/img/new1.png","零食工坊受邀出席2018中国特许加盟大会 与商业领袖共话新零售","2018-10-30","由中国连锁经营协会（CCFA）主办的“2018中国特许加盟大会”于6月11日至12日在上海虹桥锦江大酒店成功举办，来自全国各行各业的商业领袖与精英代表共同出席了此次会议。零食工坊作为全国高端休闲零食品牌，多次受邀出席中国特许加盟大会，已连续2年被授予3A级成员企业。本届大会主题为“数字特许 赋能门店”，出席大会人员均是来自全国各地，各个行业商业大咖和特许经营从业者，围绕特许行业新技术应用，跨行业生态圈的打造，智慧零售等热点话题进行分享交流，并对新消费，新零售，新趋势等进行重新理解和定义，此次大会还邀请政府主管部门解读特许经营相关政策以及特许发展政策环境。"),
(6,"http://127.0.0.1:3000/img/new2.png","凝心聚力，迎战旺季 | 零食工坊2018·旺季誓师大会顺利召开","2018-10-31","不忘初心，砥砺前行，又到了一年一度年底收官冲刺的关键时期，零食工坊响应集团公司号召举办了2018春节战役誓师动员大会，为明确年底工作目标，以提升员工的信心，为打好2017年最后一场重要..."),
(7,"http://127.0.0.1:3000/img/new3.jpg","回顾2017 | 和你在一起的每一刻都值得被珍藏","2018-11-01","亲爱的零食工坊家人多少努力与拼搏在曾经的春夏秋冬里变作身后的路回首2017这一年多少爱变成种子悄悄埋在心里多少责任扎根在心里坚守不变多少成长随着时间慢慢地壮大但2017留给零工的不止是..."),
(8,"http://127.0.0.1:3000/img/new4.jpg","疯了！零食工坊南京河西万达店开业首日，零食分分钟被抢空！","2018-11-02","昨天在众多吃货盆友们盼星星盼月亮万众瞩目下零食工坊全新品牌体验店于11月15日在南京河西万达广场B座正式开业！！！...");

/*新闻评论表*/
CREATE TABLE comments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50),
    content VARCHAR(140),
    ctime DATETIME,   
    nid INT
);
INSERT INTO comments VALUES(null,"丁丁","继续努力","2018.11.01 18:20:52",1);
INSERT INTO comments VALUES(null,"当当","加油","2018.11.02 18:20:52",1);
INSERT INTO comments VALUES(null,"张三","很不错","2018.11.03 18:20:52",1);
INSERT INTO comments VALUES(null,"李四","继续努力","2018.11.04 18:20:52",1);
INSERT INTO comments VALUES(null,"王五","...","2018.11.05 18:20:52",1);
INSERT INTO comments VALUES(null,"张量","很好","2018.11.03 18:20:52",1);
INSERT INTO comments VALUES(null,"张扬","天气不错","2018.10.01 18:20:52",1);
INSERT INTO comments VALUES(null,"赖赖","继续努力","2018.09.01 18:20:52",1);
INSERT INTO comments VALUES(null,"闽闽","继续努力","2018.08.01 18:20:52",1);
INSERT INTO comments VALUES(null,"哲哲","下雨了","2018.07.01 18:20:52",1);
INSERT INTO comments VALUES(null,"周周","继续努力","2018.06.01 18:20:52",1);
INSERT INTO comments VALUES(null,"晨晨","继续努力","2018.05.01 18:20:52",2);
INSERT INTO comments VALUES(null,"观观","继续努力","2018.04.01 18:20:52",2);
INSERT INTO comments VALUES(null,"小小","继续努力","2018.03.01 18:20:52",2);
INSERT INTO comments VALUES(null,"大大","继续努力","2018.02.01 18:20:52",2);
INSERT INTO comments VALUES(null,"兰兰","继续努力","2018.01.01 18:20:52",2);

#用户表
CREATE TABLE user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(25),
  upwd  VARCHAR(32)
);
#通用加密算法md5
#如果觉得不安全可以多次循环加密
#解决方案：强制用户密码超过12位
INSERT INTO user VALUES(null,'dd',md5('123'));
INSERT INTO user VALUES(null,'wh',md5('123'));
INSERT INTO user VALUES(null,'lily',md5('123'));


#零食表
CREATE TABLE sock(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title varchar(64),
  price decimal(10,2),
  img varchar(128),
  sale INT,
  rest INT
);
INSERT INTO sock VALUES(null,'蜂蜜扁桃仁100g',5.00,"http://127.0.0.1:3000/img/sock1.jpg",200,180);
INSERT INTO sock VALUES(null,'蜂蜜扁桃仁200g',10.00,"http://127.0.0.1:3000/img/sock1.jpg",300,225);
INSERT INTO sock VALUES(null,'蜂蜜扁桃仁300g',15.00,"http://127.0.0.1:3000/img/sock1.jpg",105,300);
INSERT INTO sock VALUES(null,'蜂蜜扁桃仁400g',20.00,"http://127.0.0.1:3000/img/sock1.jpg",400,175);
INSERT INTO sock VALUES(null,'百醇抹茶味150g',5.00,"http://127.0.0.1:3000/img/sock2.jpg",133,365);
INSERT INTO sock VALUES(null,'百醇抹茶味250g',10.00,"http://127.0.0.1:3000/img/sock2.jpg",256,121);
INSERT INTO sock VALUES(null,'百醇抹茶味350g',15.00,"http://127.0.0.1:3000/img/sock2.jpg",189,450);
INSERT INTO sock VALUES(null,'百醇抹茶味450g',20.00,"http://127.0.0.1:3000/img/sock2.jpg",378,372);
INSERT INTO sock VALUES(null,'猕猴桃干200g',15.00,"http://127.0.0.1:3000/img/sock3.jpg",122,188);
INSERT INTO sock VALUES(null,'猕猴桃干400g',25.00,"http://127.0.0.1:3000/img/sock3.jpg",200,151);

#购物车列表
CREATE TABLE cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,
  count INT
);
INSERT INTO cart VALUES(NULL,6,3);
INSERT INTO cart VALUES(NULL,1,4);
INSERT INTO cart VALUES(NULL,9,7);

/*select s.title,s.price,s.img,c.count
from sock s,cart c
where s.pid=c.pid*/