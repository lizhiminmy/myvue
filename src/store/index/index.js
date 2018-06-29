import cache from '@/config/cache'
import { request } from '@/config/request'

export default {
	namespaced: true,
	state : {
		indexActive:cache.getSession('index_Active')?cache.getSession('index_Active'):'news_recommend',
		indexColumn: [{
            classname: '推荐',
            classid: 0,
            classpath: 'news_recommend'
        }],
		indexSwiper:false,
        classID:'appclassid.php',
		indexPage: { news_recommend: 1 },       // 各个栏目page的对象
        indexLocation: { news_recommend: 0 },   // 各个栏目location的对象
	},

	getters : {
		activeMeta: state => {
            // 当前active的栏目的index、classid、page、location
            let index = state.indexColumn.findIndex(obj => obj.classpath === state.indexActive)
            let classid = state.indexColumn[index].classid
            let page = state.indexPage[state.indexActive]
            let location = state.indexLocation[state.indexActive]
            return { index, classid, page, location }
        }
	},

	mutations : {
		set_indexActive(state, val) {
            state.indexActive = val
            cache.setSession('index_Active', val)
        },
		set_indexColumn(state, arr) {
            state.indexColumn = arr
            cache.setSession('index_Column', arr)
        },
        set_indexSwiper(state, val) {
            state.indexSwiper = val
        }
	},

	actions : {
		async get_indexColumn_data({commit, state, dispatch}) {
            let res
            const data = JSON.parse(cache.getSession('index_Column'))
            if (data) {
                res = data
            } else {
                let json = await request('post', 'classID')
                res = [...state.indexColumn, ...json]
                console.log(res);
            }
            //console.log(res,1234)
            commit('set_indexColumn', res)
            return res
        }
	}
}