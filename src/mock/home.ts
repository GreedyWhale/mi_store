import Mock from "mockjs";

const homeNavList = Mock.mock({
  data: {
    msg: "请求成功",
    result: {
      "tabs|7": [
        {
          pageId: "@id",
          name: "@order('推荐','手机','智能','电视','笔记本','生活周边','家电')"
        }
      ]
    },
    stat: 1
  }
});

export { homeNavList };
