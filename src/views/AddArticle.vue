<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>新增文章</span>
        <div>
          <el-button class="button" type="info">取消</el-button>
          <el-button class="button" type="danger">保存</el-button>
        </div>
      </div>
    </template>
    <el-form ref="ruleFormRef" status-icon :model="form" :rules="rules" label-width="120px">
      <!-- <el-form-item label="文章作者" prop="author">
        <el-input v-model="form.author" />
      </el-form-item> -->
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="文章介绍" prop="introduction">
        <el-input v-model="form.introduction" />
      </el-form-item>
      <el-form-item label="写作时间" prop="date">
        <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" />
      </el-form-item>

      <el-form-item label="写文章" prop="content">
        <v-md-editor v-model="form.content" height="400px"></v-md-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
        <el-button type="danger" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'
import { addArticle, getArticleById, upDateArticle } from '@/request/api'
import { useRoute } from 'vue-router'
import router from '@/router'
const { userName } = storeToRefs(useCommonStore())
const { query } = useRoute()
console.log(userName.value)
const text = ref('')
const form = ref({
  title: '',
  //   author: userName.value,
  introduction: '',
  //   body: '',
  content: '',
  date: ''
})
const getArticle = async () => {
  if (query.id) {
    const res = await getArticleById({ _id: query.id })
    form.value = res.data[0]
  }
}
getArticle()

const rules = reactive<FormRules>({
  title: [{ required: true, type: 'string', message: '请输入文章标题', trigger: 'blur' }],
  //   author: [{ required: true, type: 'string', message: '请输入作者名', trigger: 'blur' }],
  introduction: [{ required: true, type: 'string', message: '请输入描述', trigger: 'blur' }],
  content: [{ required: true, type: 'string', message: '请输入内容', trigger: 'blur' }],
  date: [{ required: true, type: 'date', message: '请输入日期', trigger: 'blur' }]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  console.log(formEl)
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (query.type === 'edit') {
        await upDateArticle({
          _id: query.id,
          title: form.value.title,
          instroduction: form.value.introduction,
          content: form.value.content,
          date: form.value.date
        })
      } else {
        await addArticle(form.value)
      }

      formEl.resetFields()
      router.push({ name: 'article' })
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
