<template>
    <div>
        <swiper :options="swiperOption"  id="swiper-box" ref="mySwiper">
        <swiper-slide v-for='(item,index) in indexColumn'  :key='index'>

            <div  v-if="item.classpath==='news_baby'">
                123456
            </div>

            <div  v-else-if="item.classpath==='news_hot'">
                123456
            </div>
            <pull-container :type='item.classpath' v-else >
                
            </pull-container>
           
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import pullContainer from './pullContainer'
export default {
    components: { pullContainer },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                onSlideChangeStart: this.slideChangeCallBack,
                onSliderMove: this.slideMoveCallBack,
                onTouchEnd: this.touchEndCallBack
            }
        }
    },
    computed: {
        ...mapState('index', [
            'indexActive',
            'indexColumn'
        ]),
        ...mapGetters('index', [
            'activeMeta'
        ])
    },
    watch: {
        indexActive(val) {
            console.log(val)
            this.slideTo(300)
        }
    },
    methods: {
         ...mapMutations('index', [
            'set_indexActive',
            'set_indexSwiper'
        ]),
        slideTo(second) {
            this.$refs.mySwiper.swiper.slideTo(this.activeMeta.index, 300, true) // 让swiper滚动到index位置
        },
        slideChangeCallBack(swiper) {
            var  index = swiper.activeIndex
            console.log(index)
            this.set_indexActive(this.indexColumn[index].classpath) 
        },
        // 移动的时候设为true，这是为了移动时，不能下拉,loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        slideMoveCallBack() {
            console.log('123')
            this.set_indexSwiper(true) //滑动之后的回调函数
        },
        // 移动结束设为false，这是为了移动结束时，可以下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        touchEndCallBack() {
            this.set_indexSwiper(false)
        }
    },
    mounted() {
        this.slideTo(0)
        console.log(this.indexColumn,56465)
       console.log(this.swiperOption,26)
    }
}
</script>
<style scoped lang="scss">
    #swiper-box {
        width: 100%;
        height: 100%;
        z-index: 0;
        background: #fff;
        padding-top: 80px;
    }
</style>
