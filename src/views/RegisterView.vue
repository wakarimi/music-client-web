<template>
  <div class="register-view">
    <CustomForm class="register-container" titleText="Регистрация">
      <CustomTextField
        class="form-element"
        placeholder-text="Логин"
        v-model="credentials.username"
      />
      <CustomTextField
        class="form-element"
        placeholder-text="Пароль"
        type="password"
        v-model="credentials.password"
      />
      <CustomTextField
        class="form-element"
        placeholder-text="Повтор пароля"
        type="password"
        v-model="credentials.passwordConfirmation"
      />
      <CustomButton
        class="form-element last-form-element"
        button-text="Зарегистрироваться"
        background-color="#AEAEEA"
        background-color-hover="#7171DB"
        background-color-active="#7171DB"
        border-color="#7171DB"
        border-color-hover="#2929A3"
        border-color-active="#2929A3"
        text-color="#FAF8F6"
        text-color-hover="#F5F1ED"
        text-color-active="#F5F1ED"
        @click="register"
      />
      <div class="login-link">
        Или
        <router-link to="/login">войти</router-link>
      </div>
    </CustomForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomForm from '@/components/base/CustomForm.vue'
import CustomTextField from '@/components/base/CustomTextField.vue'
import CustomButton from '@/components/base/CustomButton.vue'
import { AccountService } from '@/services/AccountService'
import { useRouter } from 'vue-router'

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
  justify-content: center;
  align-items: center;
}

.register-container {
  display: flex;
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
