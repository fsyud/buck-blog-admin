export interface tag_list {
  _id: string;
  name: string;
}

// 标签
export interface tagDataList {
  code: number;
  message: string;
  data: {
    count: number;
    list: tag_list[]
  }
}
