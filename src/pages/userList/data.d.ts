import { Data } from "unist";

// 用户列表
export interface ListItem {
  avatar: string;
  create_time: Data;
  email: string;
  introduce: string;
  name: string;
  phone: string;
  type: Number;
  _id: string;
}

export interface Member {
  count: Number;
  list: ListItem[]
}

// 请求列表成功返回
export interface BasicListItemDataType {
  code: Number;
  message: string;
  data: Member[];
}

// 用户登录成功
export interface BasicListItemLoginType {
  code: Number;
  message: string;
  data: {
    github_id: string;
    name: string;
    type: string;
    phone: string;
    img_url: string;
    email: string;
    introduce: string;
    avatar: string;
    location: string;
    password: string;
    _id: string;
    create_time: Data;
    update_time: Data;
    id: Number;
    __v: Number;
  };
}
