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
      }
    ]
  },
  {
    path: '/modifypersonal',
    name: 'ModifyPersonal',
    component: 'ModifyPersonal/ModifyPersonal',
  },
  {
    path: '/modifypersonalChange',
    name: 'ModifyPersonalChange',
    component: 'ModifyPersonal/ModifyPersonalChange'
  },
]


export default [
  data
]