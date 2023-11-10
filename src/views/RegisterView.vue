<template>
  <div class="register-view">
    <CustomForm
        class="register-container"
        titleText="Регистрация"
    >
      <CustomTextField
          class="form-element"
          placeholder-text="Логин"
      />
      <CustomTextField
          class="form-element"
          placeholder-text="Пароль"
          type="password"
      />
      <CustomTextField
          class="form-element"
          placeholder-text="Повтор пароля"
          type="password"
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
      />
      <div class="login-link">
        Или
        <router-link to="/login">войти</router-link>
      </div>
    </CustomForm>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import CustomForm from "@/components/base/CustomForm.vue";
import CustomTextField from "@/components/base/CustomTextField.vue";
import CustomButton from "@/components/base/CustomButton.vue";

const credentials = ref({
  username: '',
  password: '',
  passwordOneMoreTime: '',
});

function register() {
  console.log(credentials.value);
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
  color: #69A6E3;
  text-decoration: none;
}

.login-link a:hover {
  color: #2066AC;
  text-decoration: underline;
}
</style>
