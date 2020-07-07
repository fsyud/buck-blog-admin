// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Volumes/WorkSpace/Buck-blog-admin/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Volumes/WorkSpace/Buck-blog-admin/src/layouts/UserLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "name": "login",
        "path": "/user/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'/Volumes/WorkSpace/Buck-blog-admin/src/pages/user/login'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Volumes/WorkSpace/Buck-blog-admin/src/layouts/SecurityLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Volumes/WorkSpace/Buck-blog-admin/src/layouts/BasicLayout'), loading: require('@/components/PageLoading/index').default}),
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/",
            "redirect": "/welcome",
            "exact": true
          },
          {
            "path": "/welcome",
            "name": "welcome",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Volumes/WorkSpace/Buck-blog-admin/src/pages/Welcome'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "path": "/userList",
            "name": "用户管理",
            "icon": "UserOutlined",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__userList' */'/Volumes/WorkSpace/Buck-blog-admin/src/pages/userList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "path": "/timeLine",
            "name": "时间轴",
            "icon": "ClusterOutlined",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__timeLine' */'/Volumes/WorkSpace/Buck-blog-admin/src/pages/timeLine'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "path": "/art",
            "name": "文章",
            "icon": "FileOutlined",
            "authority": [
              "buck"
            ],
            "routes": [
              {
                "path": "/art/article",
                "name": "文章",
                "icon": "FileOutlined",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__art__article' */'/Volumes/WorkSpace/Buck-blog-admin/src/pages/art/article'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              },
              {
                "path": "/art/createarticle",
                "name": "文章创作",
                "icon": "FileOutlined",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__art__createarticle' */'/Volumes/WorkSpace/Buck-blog-admin/src/pages/art/createarticle'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Volumes/WorkSpace/Buck-blog-admin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Volumes/WorkSpace/Buck-blog-admin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Volumes/WorkSpace/Buck-blog-admin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
    "exact": true
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
