<template>
    <div class="card-list">
        <h1>更新 <span class="filter-from" v-show="searchRss != null" v-on:click="removeFilterFrom">来自: {{ searchRss? searchRss.title : ""
        }}</span>
        </h1>
        <div v-masonry="containerId" transition-duration="0.3s" item-selector=".item" class="grid custom-loading-svg"
            v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50"
            v-infinite-scroll="load">
            <div v-masonry-tile class="item box" v-for="item in blocks" v-bind:key="item.id">
                <div class="image" v-if="item.image != null">
                    <el-image :src="item.image" :zoom-rate="1.2" :preview-src-list="item.images" :initial-index="4"
                        fit="cover" onerror="this.style.display='none'" />
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
        <!-- <el-dialog v-model="dialogVisible" title="Tips" width="30%" destroy-on-close>
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog> -->
    </div>
</template>
  
<script>
import { inject, ref } from 'vue';
import axios from 'axios';
import DateInfo from './DateInfo.vue';

export default {
    name: 'CardList',
    components: {
        DateInfo
    },
    props: {
        // msg: String
    },
    setup() {
        const sharedState = inject('sharedState');
        const dialogVisible = ref(false);
        const loading = ref(false);
        const blocks = ref([]);
        const page = ref(0);
        const searchRss = ref(null);

        const handleClose = () => {
            dialogVisible.value = false;
        };

        const load = () => {
            if (loading.value) {
                return;
            }

            page.value = page.value + 1;
            loading.value = true;
            var rssUrl = searchRss.value == null ? "" : searchRss.value.rss;
            axios.get('https://rsssquare.qiangtu.com/api/rss?source=' + rssUrl + '&page=' + page.value, {
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
                            catch {
                                console.log("get image error");
                            }
                        }
                    }
                    blocks.value = blocks.value.concat(list);
                    loading.value = false;
                })
                .catch(error => {
                    console.error(error);
                });
        };

        const doSearch = (author, keyword) => {
            page.value = 0;
            searchRss.value = author;
            blocks.value = [];
            load();
            if (keyword != '')
                console.log(keyword);
        };

        sharedState.triggerSearch = doSearch;

        const removeFilterFrom = () => {
            if (searchRss.value == null) {
                return;
            }

            page.value = 0;
            searchRss.value = null;
            blocks.value = [];
            load();
        };

        return {
            dialogVisible,
            loading,
            blocks,
            page,
            handleClose,
            load,
            sharedState,
            searchRss,
            removeFilterFrom
        };
    }
}

</script>
<style>
.card-list {
    padding-top: 20px;
}

h1 span.filter-from {
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
    margin-top: 23px;
    font-weight: 100;
    text-decoration: line-through;
}

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

.box .el-image__error {
    display: none;
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

@media screen and (min-width: 1900px) {
    .card-list .box {
        margin: 0 10px 20px 10px;
        width: 288px;
    }
}
</style>