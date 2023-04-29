<template>
  <div class="container flex-center">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>青縠博客后台管理系统</span>
          <el-button class="button" text>忘记密码？</el-button>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item class="form-bottom">
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.pass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('pass', () => null)
    }
    callback()
  }
}
const validateUserName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the name'))
  } else {
    if (ruleForm.name !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('name', () => null)
    }
  }
  callback()
}

const ruleForm = reactive({
  pass: '',
  name: ''
})

const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  name: [{ validator: validateUserName, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(formEl, 'submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .form-bottom {
    margin-left: 0px;
    :deep(.el-form-item__content) {
      justify-content: center;
    }
  }
}
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

.box-card {
  width: 480px;
}
</style>
