<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">设置
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处指定你的MEMOS API和广场KEY。</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <el-form-item label="MEMOS KEY">
                            <el-input v-model="form.memos_key" />
                        </el-form-item>
                        <el-form-item label="RSS KEY">
                            <el-input v-model="form.square_key" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                            <el-button @click="onCancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">页内导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item"><a class="toc-link" href="#接口配置" title="接口配置">
                                <p>接口配置</p>
                            </a></li>

                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  
<script>
import { h, ref, inject, reactive } from 'vue';
import { ElMessageBox } from 'element-plus'
export default {
    name: 'SettingCard',
    setup() {
        const changeDisplayView = inject('changeDisplayView');
        const form = reactive({
            memos_key: '',
            square_key: '' 
        })
        const onLoad = () => {
            let json = localStorage.getItem("setting");
            if (json && json.length > 0 && json != undefined && json != 'undefined') { 
                let data = JSON.parse(json);
                form.memos_key = data.memos_key;
                form.square_key = data.square_key;
            }
        };
        onLoad();
        const onSubmit = () => {
            localStorage.setItem("setting", JSON.stringify(form));

            ElMessageBox({
                title: '成功',
                message: h('p', null, [
                    h('span', null, '本地配置提交成功'),
                    // h('i', { style: 'color: teal' }, 'VNode'),
                ]),
            })

        };
        const onCancel = () => {
            changeDisplayView.value = 'CardList';
        };
        const isShowSettingCard = ref(false);
        const isOverlayShow = ref(false);
        const showSettingCard = () => {
            isOverlayShow.value = true;
            isShowSettingCard.value = true;
        };
        // const hideSettingCard = () => {
        //     isOverlayShow.value = false;
        //     isShowSettingCard.value = false;
        // };
        return {
            onLoad,
            onSubmit,
            onCancel,
            form,
            showSettingCard,
            // hideSettingCard,
            isShowSettingCard
        };
    }
}
</script>