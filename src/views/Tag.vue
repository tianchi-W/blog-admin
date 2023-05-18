<template>
  <el-card class="box-card" v-loading="loading">
    <template #header>
      <div class="card-header">
        <span>标签管理</span>
      </div>
    </template>
    <el-button style="margin-bottom: 30px" type="primary" @click="postTag">
      <el-icon style="margin-right: 10px">
        <document />
      </el-icon>
      新增标签</el-button
    >
    <el-row class="mt-4">
      <el-tag
        style="margin-left: 20px; cursor: pointer"
        :type="item.type"
        v-for="item in tagList"
        :key="item._id"
        class="large"
        closable
        @click="updateInfo(item)"
        @close="deleteInfo(item)"
        >{{ item.title }}</el-tag
      >
    </el-row>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px; margin-top: 30px"
    >
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.title" :disabled="isStatus == 'add' ? false : true" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="formLabelAlign.introduction" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formLabelAlign.type" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formLabelAlign.status" class="ml-4">
          <el-radio label="true" size="small">展示</el-radio>
          <el-radio label="false" size="small">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item></el-form
    >
  </el-card>
</template>
<script lang="ts" setup>
/*   title,
    introduction,
    type,
    status, */
import { onBeforeMount, onMounted, reactive, ref, computed } from 'vue'
import { getTagById, addTag, delTag, upDateTag, getTagList } from '@/request/api'
const loading = ref(false)
const options = [
  {
    value: 'success',
    label: '冷门'
  },
  {
    value: 'info',
    label: '一般'
  },
  {
    value: 'warning',
    label: '热点'
  },
  {
    value: 'danger',
    label: '热门'
  }
]
const isStatus = ref('add')
const labelPosition = ref('right')
const formLabelAlign = reactive<{
  title: string
  introduction: string
  type: string
  status: string
  _id?: string
}>({
  title: '',
  introduction: '',
  type: '',
  status: ''
})
const tagData = ref()
const tagList = computed(() => {
  return tagData.value?.data.tag
})
const getTags = async () => {
  tagData.value = await getTagList()
}
getTags()
const postTag = async () => {
  isStatus.value = 'add'
  formLabelAlign.introduction = ''
  formLabelAlign.status = ''
  formLabelAlign.title = ''
  formLabelAlign.type = ''
}
const deleteInfo = async (val) => {
  await delTag({ _id: val._id })
  await getTags()
}
const updateInfo = (val) => {
  isStatus.value = 'edit'
  const { title, introduction, type, status, _id } = val
  formLabelAlign.introduction = introduction
  formLabelAlign.status = status
  formLabelAlign.title = title
  formLabelAlign.type = type
  formLabelAlign._id = _id
}

const onSubmit = async () => {
  loading.value = true
  if (formLabelAlign.title) {
    if (isStatus.value === 'add') {
      const res: any = await addTag(formLabelAlign)
      if (res.data.code == 11000) {
        ElNotification({
          title: '警告',
          message: res.message,
          type: 'warning'
        })
      }
      loading.value = false
    } else if ((isStatus.value = 'edit')) {
      await upDateTag(formLabelAlign)
      loading.value = false
    }
  } else {
    ElNotification({
      title: '警告',
      message: '名称不能为空',
      type: 'warning'
    })
    loading.value = false
  }
  await getTags()
}
const emits = defineEmits([])
const state = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
defineExpose({ state })
</script>
<style lang="scss" scoped></style>
