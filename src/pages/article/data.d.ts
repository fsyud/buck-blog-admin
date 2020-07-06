// 文章列表
export interface artDataList {
  meta: {
    views: number;
    likes: number;
    comments: number;
  };
  desc: string;
  img_url: string;
  tags: Array<[]>;
  category: Array<[]>;
  _id: string;
  title: string;
  create_time: Data;
}

export interface articleList {
  code: number;
  message: string;
  data: {
    count: number;
    list: artDataList[];
  };
}
