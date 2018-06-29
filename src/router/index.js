import App from '../App'

// import HelloWorld from '@/components/HelloWorld'

const home = r => require.ensure([], () => r(require('../page/home')), 'home')  //webpack 实现按需加载
const search = r => require.ensure([], () => r(require('../page/search')), 'search') 
const order = r => require.ensure([], () => r(require('../page/order')), 'order') 
const my = r => require.ensure([], () => r(require('../page/my')), 'my') 
const recommand = r => require.ensure([], () => r(require('../page/home/recommand')), 'recommand') 
const city = r => require.ensure([], () => r(require('../page/home/city')), 'city') 
const town = r => require.ensure([], () => r(require('../page/home/town')), 'town') 
const model = r => require.ensure([], () => r(require('../page/home/model')), 'model') 
export default [{

    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
	        //地址为空时跳转home页面
	        {
	            path: '',
	            redirect: '/home'
	        },
	        {
	            path: '/home',
	            component: home,
	            children:[
	            	{
	            		path:'/home',
	            		redirect:'/recommand'
	            	},
	            	{
	            	   path: '/recommand',
	         		   component: recommand
	            	},
	            	{
	            	   path: '/city',
	         		   component: city
	            	},
	            	{
	            	   path: '/town',
	         		   component: town
	            	}
	            	,
	            	{
	            	   path: '/model',
	         		   component: model
	            	}
	            ]
	        },
	        {
	        	path: '/order',
	            component: order
	        },
	        {
	        	path: '/my',
	            component: my
	        },
	        {
	        	path: '/search',
	            component: search
	        }
     ]

}]
