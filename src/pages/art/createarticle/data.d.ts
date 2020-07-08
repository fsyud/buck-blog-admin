export interface articeTags {
  id: number;
  name: string;
}

// 评论
export interface commentsList {
  _id: string;
  id: number;
  update_time: Data;
  create_time: Data;
  other_comments: otherCommentList[];
  user_id: string;
  content: string;
  article_id: string;
  is_handle: number;
  state: number;
  likes: number;
  is_top: boolean;
  user: {
    name: string;
    type: number;
    avatar: string;
    user_id: string;
  }
}

// 文章详情列表
export interface articleDetailist {
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
  };
}

