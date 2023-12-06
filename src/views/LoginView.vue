<template>
  <div class="login-view">
    <CustomForm class="login-container" titleText="Вход">
      <CustomTextField
          v-model="credentials.username"
          class="form-element"
          placeholder-text="Логин"
      />
      <CustomTextField
          v-model="credentials.password"
          class="form-element"
          placeholder-text="Пароль"
          type="password"
      />
      <CustomButton
          background-color="#AEAEEA"
          background-color-active="#7171DB"
          background-color-hover="#7171DB"
          border-color="#7171DB"
          border-color-active="#2929A3"
          border-color-hover="#2929A3"
          button-text="Войти"
          class="form-element last-form-element"
          text-color="#FAF8F6"
          text-color-active="#F5F1ED"
          text-color-hover="#F5F1ED"
          @click="login"
      />
      <div class="register-link">
        Или
        <router-link to="/register">зарегистрироваться</router-link>
      </div>
    </CustomForm>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import CustomForm from '@/components/base-backup/CustomForm.vue'
import CustomTextField from '@/components/base-backup/CustomTextField.vue'
import CustomButton from '@/components/base-backup/CustomButton.vue'
import {useTokensStore} from '@/stores/useTokensStore'
import {useRouter} from 'vue-router'

const router = useRouter()
const tokenStore = useTokensStore()

const credentials = ref({
  username: '',
  password: ''
})

const login = async () => {
  try {
    await tokenStore.login(credentials.value.username, credentials.value.password)
    await router.push('music')
  } catch (error) {
    /* empty */
  }
}
</script>

<style scoped>
.login-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-element {
  width: 400px;
  height: 50px;
  margin-bottom: 20px;
}

.last-form-element {
  margin-bottom: 00px;
}

.register-link {
  text-align: center;
  padding-top: 10px;
}

.register-link a {
  color: #69a6e3;
  text-decoration: none;
}

.register-link a:hover {
  color: #2066ac;
  text-decoration: underline;
}
</style>
