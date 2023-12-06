<template>
  <div class="register-view">
    <CustomForm class="register-container" titleText="Регистрация">
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
      <CustomTextField
          v-model="credentials.passwordConfirmation"
          class="form-element"
          placeholder-text="Повтор пароля"
          type="password"
      />
      <CustomButton
          background-color="#AEAEEA"
          background-color-active="#7171DB"
          background-color-hover="#7171DB"
          border-color="#7171DB"
          border-color-active="#2929A3"
          border-color-hover="#2929A3"
          button-text="Зарегистрироваться"
          class="form-element last-form-element"
          text-color="#FAF8F6"
          text-color-active="#F5F1ED"
          text-color-hover="#F5F1ED"
          @click="register"
      />
      <div class="login-link">
        Или
        <router-link to="/login">войти</router-link>
      </div>
    </CustomForm>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import CustomForm from '@/components/base-backup/CustomForm.vue'
import CustomTextField from '@/components/base-backup/CustomTextField.vue'
import CustomButton from '@/components/base-backup/CustomButton.vue'
import {AccountService} from '@/services/AccountService'
import {useRouter} from 'vue-router'

const router = useRouter()

const credentials = ref({
  username: '',
  password: '',
  passwordConfirmation: ''
})

const register = async () => {
  if (credentials.value.password !== credentials.value.passwordConfirmation) {
    alert('Пароли не совпадают')
    return
  }

  try {
    await AccountService.register({
      username: credentials.value.username,
      password: credentials.value.password
    })
    await router.push('/login')
  } catch (error) {
    /* empty */
  }
}
</script>

<style scoped>
.register-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.register-container {
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

.login-link {
  text-align: center;
  padding-top: 10px;
}

.login-link a {
  color: #69a6e3;
  text-decoration: none;
}

.login-link a:hover {
  color: #2066ac;
  text-decoration: underline;
}
</style>
