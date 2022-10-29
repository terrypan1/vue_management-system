const data = [
  {
    path: '/home_index',
    name: 'Home_index',
    component: 'Home/Home_index',
    children: [
      {
        path: '/home_index',
        name: 'Home',
        component: 'Home/Home',
      },
      {
        path: '/home_index/post',
        name: 'Post',
        component: 'Member/memberPost',
      },
      {
        path: '/home_index/seeArticle',
        name: 'post',
        component: 'Member/seeArticle',
      },
      {
        path: '/home_index/articleSearch',
        name: 'post',
        component: 'Member/articleSearch',
      }
    ]
  },
  {
    path: '/managerPage',
    name: 'ManagerPage',
    component: 'ManagerPage/ManagerPage',
    children: [
      {
        path: 'SearchEmployee',
        name: 'SearchEmployee',
        component: 'ManagerPage/Employee',

      },
      {
        path: 'AddEmployee',
        name: 'AddEmployee',
        component: 'ManagerPage/Add',
      },
      {
        path: 'Revise',
        name: 'Revise',
        component: 'ModifyPersonal/Component/Revise',
      },
      {
        path: 'ModifyPersonalRight',
        name: 'ModifyPersonalRight',
        component: 'ModifyPersonal/Component/modifyPersonalRight'
      }

    ]
  }
  ]
  export default [
    data
  ]