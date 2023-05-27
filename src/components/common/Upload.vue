<template>
  <div class="container">
    <el-upload
      ref="upload "
      class="avatar-uploader"
      :action="url + '/upload/qiniu_upload'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :limit="1"
      :on-exceed="handleExceed"
    >
      <img v-if="pic" :src="pic" class="avatar" width="300" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
//上传
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
const url = import.meta.env.VITE_APP_BASE_API
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  console.log(response, uploadFile)
  emits('update:pic', response.data.url)
  pic.value = URL.createObjectURL(uploadFile.raw!)
}
const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const emits = defineEmits<{
  (e: 'update:pic', id: string): void
}>()
const props = withDefaults(defineProps<{ pic: string }>(), {
  pic: ''
})
const { pic } = toRefs(props)
const state = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
defineExpose({ state })
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
