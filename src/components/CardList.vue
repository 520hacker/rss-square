<template>
    <div class="card-list">
        <h1>更新</h1>
        <div v-masonry="containerId" transition-duration="0.3s" item-selector=".item" class="grid">
            <div v-masonry-tile class="item box" v-for="item in blocks" v-bind:key="item.id">
                <div class="image" v-if="item.image != null">
                    <img :src="item.image" onerror="this.style.display='none'" />
                </div>
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
            blocks: [],
        }
    },
    created() {
        axios.get('https://2504.qiangtu.com:8087/rss', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                this.blocks = response.data.rss_list;
                for (var item in this.blocks) {
                    this.blocks[item].image = null;
                    if (this.blocks[item].enclosure != "[]") {
                        try {
                            var enclosure = JSON.parse(this.blocks[item].enclosure);
                            console.log(enclosure);
                            for (let i = 0; i < enclosure.length; i++) {
                                if (enclosure[i].type.startsWith("image")) {
                                    this.blocks[item].image = enclosure[i].href;
                                    break;
                                }
                            }
                        }
                        catch
                        {
                            console.log("get image error");
                        }
                    }
                }
                this.loading = false;
            })
            .catch(error => {
                console.error(error);
            });
    },
    props: {
        // msg: String
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

@media screen and (max-width: 540px) {
    .card-list .box {
        width: 100%;
        margin: 0 0 10px 0;
    }
}</style>