const routers = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          // {
          //   path: '/admin',
          //   name: 'admin',
          //   icon: 'crown',
          //   component: './Admin',
          //   authority: ['admin'],
          //   routes: [
          //     {
          //       path: '/admin/sub-page',
          //       name: 'sub-page',
          //       icon: 'smile',
          //       component: './Welcome',
          //       authority: ['admin'],
          //     },
          //   ],
          // },
          {
            path: '/userList',
            name: '用户管理',
            icon: 'UserOutlined',
            component: './userList',
          },
          {
            path: '/timeLine',
            name: '时间轴',
            icon: 'ClusterOutlined',
            component: './timeLine',
          },
          {
            path: '/art',
            name: '文章',
            icon: 'FileOutlined',
            authority: ['buck'],
            routes: [
              {
                path: '/art/article',
                name: '文章',
                icon: 'FileOutlined',
                component: './art/article',
              },
              {
                path: '/art/createarticle',
                name: '文章创作',
                icon: 'FileOutlined',
                component: './art/createarticle',
              },
            ]
          },
          {
            path: '/project',
            name: '项目管理',
            icon: 'ClusterOutlined',
            component: './project',
          },
          {
            path: '/taglist',
            name: '标签管理',
            icon: 'ClusterOutlined',
            component: './taglist',
          },
          {
            path: '/message',
            name: '留言板管理',
            icon: 'ClusterOutlined',
            component: './message',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]

export default routers;
