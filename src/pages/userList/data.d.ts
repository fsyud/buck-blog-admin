import { Data } from "unist";

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

export interface BasicListItemDataType {
  code: Number;
  message: string;
  data: Member[];
}
