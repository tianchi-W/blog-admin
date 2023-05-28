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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="验证码" prop="pverityCodeass">
          <el-row :gutter="20" style="width: 100%">
            <el-col :span="14">
              <el-input v-model="verityCode" type="text" autocomplete="off"
            /></el-col>
            <el-col :span="6"
              ><div class="verityCode" v-html="codeSvg.data" @click="handleVerityCode"></div
            ></el-col>
          </el-row>
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
import { toRaw } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '@/stores/common'
import { reactive, ref } from 'vue'
import { getVerityCode } from '@/request/api'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
const router = useRouter()

const verityCode = ref('')
const codeSvg = ref(await getVerityCode())
const handleVerityCode = async () => {
  codeSvg.value = await getVerityCode()
}
const ruleFormRef = ref<FormInstance>()

const { isLogin } = storeToRefs(useCommonStore())
const { handleLogin } = useCommonStore()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the username'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  password: '',
  username: ''
})

const rules = reactive<FormRules>({
  password: [{ validator: validatePass, trigger: 'blur' }],
  username: [{ validator: validateUsername, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate(async (valid) => {
    if (valid) {
      // if (codeSvg.value.text !== verityCode.value) {
      //   ElNotification({
      //     title: 'Warning',
      //     message: '验证码错误',
      //     type: 'warning'
      //   })
      //   handleVerityCode()
      //   return
      // }
      // console.log(toRaw(ruleForm), 'submit!')

      await handleLogin(toRaw(ruleForm))

      isLogin.value && router.push({ path: '/' })

      ruleForm.password = ''
      ruleForm.username = ''
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
.verityCode {
  width: 100%;
}
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
