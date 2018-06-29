<template>
  <div class="home">
    <div class="header">
         <img src="@/images/sf.png" style="width:50%;margin:0 auto" >
    </div>
   
  <!--   <ul class="nav"> 
      <li :class="$route.path.indexOf('recommand') !== -1? 'li_hover' : ''" @click = "gotoAddress({path: '/recommand'})">推荐</li>
      <li :class="$route.path.indexOf('city') !== -1? 'li_hover' : ''" @click = "gotoAddress({path: '/city'})">县区</li>
      <li :class="$route.path.indexOf('town') !== -1? 'li_hover' : ''" @click = "gotoAddress({path: '/town'})">市直</li>
      <li :class="$route.path.indexOf('model') !== -1? 'li_hover' : ''" @click = "gotoAddress({path: '/model'})">榜样人物</li>
    </ul> -->

    <nav>
        <div class="nav_ul">
            <a href='javascript:;' v-for="(item,index) in indexColumn" :class='{active: indexActive == item.classpath}' @click.stop="navClick(item.classpath)"  :key="index">{{item.classname}}</a>
        </div>
    </nav>

    <swiper-container/>


    <!-- <transition name="router-fade" mode="out-in">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      </transition>
      <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition> -->
  </div>
</template>

<script>
import { mapState,mapGetters,mapActions,mapMutations } from 'vuex'
import swiperContainer from './components/swipe'
export default {
  components:{swiperContainer},
  name: 'home',
  data () {
    return {
      msg: '123'
    }
  },
  computed:{
    ...mapState('index', [
            'indexColumn',
            'indexActive'
        ]),
        ...mapGetters('index', [
            'activeMeta'
        ])
  },
  watch:{
    indexActive(){
       this.slideTo(this.activeMeta.index)
    }
  },
  methods: {
     slideTo(index) {
        this.$nextTick(() => {
            let _container = $('.nav_ul')           // 获取滚动容器元素
            let _column = $('.nav_ul a').eq(index)  // 获取当前active栏目元素
            if (_column) {
                let move    // 最终滚动值
                let _container_width = _container.width()               // 容器宽度
                let _container_left = _container.scrollLeft()           // 容器当前滚动条的值
                let _column_width = _column.width()                     // 栏目宽度
                let _column_left = _column.position().left              // 栏目距离屏幕左边的距离
                let midWidth = (_container_width - _column_width) / 2   // 屏幕中心线的宽度
                // 容器滚动为0，并且active栏目位于中间线左边？滚动值为0 ：当前容器滚动值 + （active栏目相对于中间线的值，有正负）
                if (_container_left === 0 && _column_left <= midWidth) {
                    move = 0
                } else {
                    move = _container_left + (_column_left - midWidth)
                }
                _container.animate({ 'scrollLeft': move }, 300)
                sessionStorage.setItem('navScrollLeft', move)       // 存计算后的值

            }
        })
    },
    // 滚动恢复
    scrollRecover() {
        let move = sessionStorage.getItem('navScrollLeft')          // 取计算后的值
    //   console.log(move)
        if (move) {
            this.$nextTick(() => {
                $('.nav_ul').scrollLeft(move)
            })
        }
    },
    gotoAddress(path){
      this.$router.push(path)
    },
    ...mapMutations('index', [
            'set_indexActive'
        ]),
    
    ...mapActions('index', [
            'get_indexColumn_data'
        ]),
    navClick(name){
        this.set_indexActive(name)
    }
  },
  created() {
        this.get_indexColumn_data()
        
        this.scrollRecover();

    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
  text-align: center
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.li_hover{
  color:red
}
.nav{
  li{
    font-size:0.75rem
  }
}

 nav {
        position: relative;
        height: 36px;
        line-height: 36px;
        background-color: #f4f5f6;
        border-bottom: 1px solid #ddd;
        /*更多栏目*/
        /*padding-right: 40px;  */
        .nav_ul {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            white-space: nowrap;
            font-size: 0;
            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }
            a {
                display: inline-block;
                padding-left: 10px;
                padding-right: 10px;
                margin-left: 5px;
                height: 36px;
                line-height: 36px;
                font-size: 17px;
                color: #505050;
                white-space: nowrap;
                -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
                text-decoration: none;
                &:last-child {
                    margin-right: 5px;
                }
                &.active {
                    color: #00939c;
                    border-bottom: 2px solid #00939c;
                }
            }
        }

      }
</style>
