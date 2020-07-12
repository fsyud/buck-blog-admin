import { Data } from "unist";

export interface timeListItem {
  state: Number;
  title: string;
  content: string;
  start_time: Data;
  end_time: Data;
  update_time: Data;
  _id: string;
}

export interface BasicListItemDataType {
  code: Number;
  message: string;
  data: {
    count: Number;
    list: timeListItem[]
  }
}
