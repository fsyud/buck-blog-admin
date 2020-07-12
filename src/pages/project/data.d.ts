export interface ProjectList {
  _id: string;
  title: string;
  content: string;
  start_time: string;
  end_time: string;
  img: string;
  url: string;
}

// 项目
export interface Project {
  code: number;
  message: string;
  data: {
    count: number;
    list: ProjectList[];
  };
}
