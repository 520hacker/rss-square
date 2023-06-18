<template>
    <div class="card-list">
        <h1>更新</h1>
        <div v-masonry="containerId" transition-duration="0.3s" item-selector=".item" class="grid custom-loading-svg"
            v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50"
            v-infinite-scroll="load">
            <div v-masonry-tile class="item box" v-for="item in blocks" v-bind:key="item.id">
                <div class="image" v-if="item.image != null">
                    <el-image :src="item.image" :zoom-rate="1.2" :preview-src-list="item.images" :initial-index="4" fit="cover"
                        onerror="this.style.display='none'" />
                    <!-- <img :src="item.image" onerror="this.style.display='none'" /> -->
                </div>
                <div class="author">{{ item.author }}</div>
                <div class="description" v-html="item.description"></div>
                <div class="action-bar">
                    <DateInfo :pubDate="item.pubDate" />
                    <a :href="item.link" target="_blank" class="open-link">
                        <el-icon size="12" color="#000000">
                            <Connection />
                        </el-icon>
                        查看
                    </a>
                </div>
            </div>
        </div>
        <div v-show="loading" class="loading_bar">加载中...</div>
    </div>
</template>
  
<script>
import axios from 'axios';
import DateInfo from './DateInfo.vue'
export default {
    name: 'CardList',
    components: {
        DateInfo
    },
    data() {
        return {
            loading: true,
            blocks: [],
            page: 0,
        }
    },
    created() {
        this.load();
    },
    props: {
        // msg: String
    },
    methods: {
        load() {
            this.page = this.page + 1;
            this.loading = true;
            axios.get('https://rsssquare.qiangtu.com/api/rss?page=' + this.page, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(response => {
                    var list = response.data.rss_list;
                    for (var item in list) {
                        list[item].image = null;
                        list[item].images = [];
                        if (list[item].enclosure != "[]") {
                            try {
                                var enclosure = JSON.parse(list[item].enclosure);
                                console.log(enclosure);
                                for (let i = 0; i < enclosure.length; i++) {
                                    if (enclosure[i].type.startsWith("image")) {
                                        list[item].image = enclosure[i].href;
                                        list[item].images.push(enclosure[i].href)
                                    }
                                }
                            }
                            catch
                            {
                                console.log("get image error");
                            }
                        }
                    }
                    this.blocks = this.blocks.concat(list);
                    this.loading = false;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>
<style>
.box {
    float: left;
    margin: 0 10px 20px 10px;
    width: 254px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.dark .box {
    background: #333;
}

.box:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.box .image,
.box .image img {
    align-items: center;
    max-width: 100%;
    border-radius: 5px 5px 0 0;
}

.box .title {
    font-weight: 700;
    width: 100%;
    height: 40px;
    line-height: 30px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px 10px 0 10px;
    text-overflow: ellipsis;
}

.box .author {
    padding: 10px 0 0 15px;
    font-size: 14px;
    font-weight: 700;
    color: #409eff;
}

.box .description {
    width: 100%;
    max-height: 240px;
    overflow: hidden;
    font-size: 12px;
    line-height: 18px;
    padding: 10px;
}

.box .description img {
    max-width: 95%;
    text-align: center;
    display: none;
}

.action-bar {
    background-color: #e7f8ff;
    height: 42px;
    text-align: center;
    border-radius: 0 0 5px 5px;
    display: block;
}

.dark .action-bar {
    background: #ccc;
}

.action-bar .open-link {
    display: block;
    padding: 10px;
    cursor: pointer;
    float: right;
    margin-right: 10px;
    transition: all .3s ease;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    outline: none;
    border: none;
    color: #333;
    max-width: 100px;
    font-size: 12px;
}

.card-list .box {
    width: 100%;
    margin: 0 0 10px 0;
}

.loading_bar {
    display: block;
    clear: both;
    color: #999;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
}

@media screen and (min-width: 600px) {
    .card-list .box {
        width: 47%;
        margin: 10px 1.5% 10px 1.4%;
    }
}

@media screen and (min-width: 768px) {
    .card-list .box {
        width: 31%;
        margin: 0 10px 10px 10px;
    }
}

@media screen and (min-width: 1000px) {
    .card-list .box {
        margin: 0 10px 20px 10px;
        width: 254px;
    }
}
</style>