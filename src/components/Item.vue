<template>
<a href="#" class="daily-item">
    <div class="daily-img" v-if="data.images">
        <img :src="imgPath + data.images[0]" alt="">
    </div>
    <div class="daily-title"
        :class="{ noImg: !data.images }">{{ data.title }}</div>
</a>
</template>

<script>
import $ from '../config/axios.config';
export default {
    props: {
        data: {
            type: Object
        }
    },
    data () {
        return {
            imgPath: $.imgPath
        }
    }
}
</script>

<style lang='scss'>
    .daily-item {
        display: block;
        color: inherit;
        text-decoration: none;
        padding: 16px;
        overflow: hidden;
        cursor: pointer;
        transition: all .3s ease-in-out;
    }

    .daily-item:hover {
        background: #e3e8ee;
    }

    .daily-img {
        width: 80px;
        height: 80px;
        float: left;
    }

    .daily-img img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }

    .daily-title {
        padding: 10px 5px 10px 90px;
    }

    .daily-title.noImg {
        padding-left: 5px;
    }
</style>