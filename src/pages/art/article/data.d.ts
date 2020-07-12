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

export interface artDetailList {
  code: number;
  message: string;
  data: {
    meta: {
      views: number;
      likes: number;
      comments: number;
    };
    keyword: Array<[]>;
    desc: string;
    numbers: string;
    img_url: string;
    type: number;
    state: number;
    origin: number;
    tags: articeTags[];
    comments: commentsList[];
    category: Array<[]>;
    _id: string;
    title: string;
    author: string;
    content: string;
    like_users: Array<[]>;
    create_time: Data;
    updara_time: Data;
    id: number;
    __v: number;
    toc: string;
  };
}

export interface updateArticleParam {
  id?: string;
  title: string;
  author: string;
  desc: string;
  keyword: Array<[]>;
  content: string;
  img_url: string;
  state: number;
  tags: articeTags[];
  type: number;
  origin: number;
}

