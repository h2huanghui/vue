import Vue from "vue";
import Router from "vue-router";
// import RenderRouterView from "./components/RenderRouterView";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Forbidden from "./views/403";
import NotFound from "./views/404";
import { check, isLogin } from "./utils/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true, //标记位,不需要渲染到菜单中
      // component: RenderRouterView,//第一种写法，单独写一个文件挂载
      // component: { render: h => h("router-view") }, //vue2.0写法。第二种写法，使用render函数
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"), //异步加载，挂载到UserLayout
      children: [
        //重定向
        {
          path: "/user",
          redirect: "/user/login"
        },
        //当user/login匹配成功，
        //Login会被渲染在UserLayout的<router-view>中
        {
          path: "/user/login",
          name: "login",
          //异步加载
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register")
        }
      ]
    },
    {
      path: "/",
      meta: { authority: ["user", "admin"] },
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        //dashboard
        //重定向
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" }, //自定义图标
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页" }, //无图标，只有一级菜单显示图标
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis")
            }
          ]
        }
      ]
    },
    //form
    {
      path: "/form",
      name: "form",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      // component: { render: h => h("router-view") },
      meta: { icon: "form", title: "表单", authority: ["admin"] }, //使用"form"图标, 表单只允许admin访问
      children: [
        {
          path: "/form/basic-form",
          name: "basicform",
          meta: { title: "基础表单" },
          component: () =>
            import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
        },
        {
          path: "/form/step-form",
          hideChildrenMenu: true, //标记位，不去渲染子路由
          name: "stepform",
          meta: { title: "分步表单" },
          component: () =>
            import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
          children: [
            {
              path: "/form/step-form",
              redirect: "/form/step-form/info"
            },
            {
              path: "/form/step-form/info",
              name: "info",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1")
            },
            {
              path: "/form/step-form/confirm",
              name: "confirm",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2")
            },
            {
              path: "/form/step-form/result",
              name: "result",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3")
            }
          ]
        }
      ]
    },
    {
      //通配符
      path: "*",
      name: "404",
      hideInMenu: true,
      component: NotFound
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: Forbidden
    }
  ]
});

//路由守卫.to:Router：即将要进入的目标 路由对象 from: Router:当前导航正要离开的路由，next： Function:一定要调用该方法来resolve这个钩子
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  //to.matched：可以找到目标所有匹配的路由,去寻找最近的路由的meta的权限
  const record = findLast(to.matched, record => record.meta.authority);
  // console.log(to.matched);
  //如果没有权限
  if (record && !check(record.meta.authority)) {
    //判断是否登录，如果未登录，跳转到login
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "您没有权限访问，请联系管理员咨询"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
