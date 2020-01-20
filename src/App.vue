<template>
  <div class="daily" id="app">
    <div class="daily-menu">
      <div class="daily-menu-item"
          :class="{ on: type === 'recommend'}"
          @click="handleToRecommend">每日推荐</div>
      <div class="daily-menu-item"
          :class="{ on: type === 'daily'}"
          @click="showThemes = !showThemes">主题日报</div>
      <ul v-show="showThemes">
        <li v-for="item in themes" :key="item.index">
          <a href="#" 
            :class="{ on: item.id === themeId && type === 'daily' }"
            @click="handleToTheme(item.id)">
            {{ itme.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="daily-list" ref="list" @scroll="handleScroll">
      <Item @click.native="handleClick(item.id)"></Item>
    </div>
    <daily-article :id="articleId"></daily-article>
  </div>
</template>

<script>
  import $ from './config/axios.config';
  import Item from './components/Item.vue';
  import dailyArticle from './components/dailyArticle.vue';

  export default {
    data () {
      return {
        themes: [],
        recommendList: [],
        showThemes: false,
        type: 'recommend',
        themeId: 0,
        dailyTime: $.getTodayTime(),
        isLoading: false
      };
    },
    methods:{
      getThemes () {
        // axios 发起get请求
        $.ajax.get('themes').then(res => {
          this.themes =  res.others;
        })
      },
      handleToTheme (id) {
        //改变菜单分类
        this.type = 'daily';
        //设置当前点击子类的主题日报id
        this.themeId = id;
        //清空中间栏的数据
        this.list = [];
        $.ajax.get('theme/' + id).then(res => {
          //过滤类型为1的文章，该类型的文章为空
          this.list = res.stories.filter(item => itme.type !== 1);
        })
      },
      handleToRecommend () {
        this.type = 'recommend';
        this.recommendList = [];
        this.dailyTime = $.getTodayTime();
        this.getRecommnedList();
      },
      getRecommnedList () {
        // 加载时设置为true,加载完设置为false
        this.isLoading = true;
        const prevDay  = $.prevDay(this.dailyTime + 86400000);
        $.ajax.get('news/before/' + prevDay).then(res => {
          this.recommendList.push(res);
          this.isLoading = false;
        })
      },
      formatDay (date) {
        let month = date.substr(4, 2);
        let day = date.substr(6, 2);
        if (month.substr(0, 1) === '0') 
          month = month.substr(1, 1);
        if (day.substr(0, 1) === '0')
          day = day.substr(1, 1);
        return `${month} 月 ${day} 日`;
      },
      handleScroll () {
        const $list = this.$refs.list;
        if (this.type === 'daily' || this.isLoading) return ;
        if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
          this.dailyTime -= 86400000;
          this.getRecommnedList();
        }
      }
    },
    components: {
      Item, dailyArticle
    },
    mounted () {
      // 初始化时调用
      this.getThemes();
      this.getRecommnedList();
      // 获取到DOM
      const $list = this.$refs.list;
      //监听中栏的滚动事件
      $list.addEventListener('scroll', () => {
        // 在“主题日报"或正在加载推荐列表时停止操作
        if (this.type === 'daily' || this.isLoading) 
          return ;
        // 已经滚动的距离加页面的高度等于整个内容区域高度时，视为接触底部
        if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
          //时间相对减少一天
          this.dailyTime -= 86400000;
          this.getRecommnedList();
        }
      })
    }
  }
</script>

<style lang="scss">
.html,body {
  margin: 0;
  padding: 0;
  height: 100vh;
  color: #657180;
  font-size: 16px;
}

.daily-menu {
  width: 150px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: #f5f79f;
}

.display-menu ul {
  list-style: none;
}

.daily-menu ul li a {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 5px 0;
  margin: 5px 0;
  cursor: pointer;
}

.daily-menu ul li a:hover, .daily-menu ul li a.on {
  color: #3399ff;
}

.daily-menu-item {
  font-size: 18px;
  text-align: center;
  margin: 5px 0;
  padding: 10px 0;
  cursor: pointer;
  border-right: 2px solid transparent;
  transition: all .3s ease-in-out;
}

.daily-menu-item:hover {
  background: #e3e8ee;
}

.daily-menu-list.on {
  border-right: 2px solid #3399ff;
}

.daily-list {
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 150px;
  overflow: auto;
  border-right: 1px solid #d7dde4;
}

.daily-item {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 16px;
  overflow:hidden;
  cursor: pointer;
  transition: all .3s ease-in-out;
}

.daily-item:hover {
  background: #e3e8ee;
}

.daily-article {
  margin-left: 450px;
  padding: 20px;
}

.daily-date {
  text-align: center;
  margin: 10px 0;
}
</style>
