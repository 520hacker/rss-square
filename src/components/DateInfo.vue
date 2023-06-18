<template>
    <div class="date-changed">
        <span>{{ formattedTime }}</span>
    </div>
</template>

<script>
// import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

export default {
    name: 'DateInfo',
    data() {
        return {
            formattedTime: ""
        }
    },
    created() {
        // 扩展功能插件
        dayjs.extend(relativeTime)
        // 本地化语言
        dayjs.locale('zh-cn')
        // // 拿来就用
        // dayjs('1999-01-01').fromNow() // 22 年前
        console.log(this.pubDate)
        const timestamp = this.pubDate; // 替换为您的时间戳数据
        const formatted = dayjs(new Date(timestamp * 1000)).fromNow();
        this.formattedTime = formatted;
    },
    // setup() {
    //     const formattedTime = ref('');

    //     onMounted(() => {
    //         console.log(this.pubDate)
    //         const timestamp = this.pubDate; // 替换为您的时间戳数据
    //         const formatted = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
    //         formattedTime.value = formatted;
    //     });

    //     return {
    //         formattedTime,
    //     };
    // },
    props: {
        pubDate: String
    }
};
</script>
  
<style>
</style>
