<template>
    <div class="author-list">
        <h1>主席团</h1>
        <div class="author-list-wrapper user-list custom-loading-svg" v-loading="loading" :element-loading-svg="svg"
            element-loading-svg-view-box="-10, -10, 50, 50">
            <div v-for="author in authors" v-bind:key="author.id" class="user-card">
                <div class="avatar">
                    <a :href="author.link" target="_blank">
                        <img :src="author.avatar" :alt="author.description" />
                    </a>
                </div>
                <a class="username" :href="author.link" target="_blank">{{ author.title }}</a>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'AuthorList',
    data() {
        return {
            authors: [],
            loading: true,
            svg: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
        `
        }
    },
    created() {
        axios.get('https://2504.qiangtu.com:8087/author', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                this.authors = response.data.author_list;
                this.loading = false;
                console.log(response.data.author_list)
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
.custom-loading-svg {
    min-height: 92px;
}

.user-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.user-card {
    width: 75px;
    padding: 5px;
    margin: 5px;
    text-align: center;
    /* background-color: #fff;
    border-radius: 5px; */
}

.avatar:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.avatar {
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    font-size: 20px;
    background-color: #f2f2f2;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
}

.avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.username {
    margin-top: 5px;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    max-width: 50px;
}

.author-list .description {
    margin-top: 0px;
    font-size: 12px;
    color: #888;
}
</style>