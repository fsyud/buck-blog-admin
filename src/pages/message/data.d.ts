import { Data } from "unist";

export interface messageListItem {
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
  phone: string;
  avatar: string;
  introduce: string;
  name: string
  email: string
  user: {
    name: string;
    type: number;
    avatar: string;
    user_id: string;
  }
}

export interface BasicListItemDataType {
  code: Number;
  message: string;
  data: {
    count: Number;
    list: messageListItem[]
  }
}
