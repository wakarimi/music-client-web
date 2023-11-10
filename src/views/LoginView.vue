<template>
  <div class="login-view">
    <EmptyForm
        class="login-container"
        titleText="Вход"
    >
      <CustomTextField
          class="form-element"
          placeholder-text="Логин"
      />
      <CustomTextField
          class="form-element"
          placeholder-text="Пароль"
      />
      <CentralTextButton
          class="submit-button form-element submit"
          button-type="submit"
          button-text="Войти"
          custom-background-color="#AEAEEA"
          custom-background-color-hover="#7171DB"
          custom-background-color-active="#7171DB"
          custom-border-color="#7171DB"
          custom-border-color-hover="#2929A3"
          custom-border-color-active="#2929A3"
      />
      <div class="register-link form-element">
        Или
        <router-link to="/register">зарегистрироваться</router-link>
      </div>
    </EmptyForm>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import EmptyForm from "@/components/base/form/EmptyForm.vue";
import BaseButton from "@/components/base/interactive/button/ImageTextButton.vue";
import CentralTextButton from "@/components/base/interactive/button/CentralTextButton.vue";
import BaseInteractive from "@/components/base/interactive/BaseInteractive.vue";
import CustomTextField from "@/components/base/CustomTextField.vue";

const credentials = ref({
  username: '',
  password: ''
});

function login() {
  // Логика входа
  console.log(credentials.value);
}
</script>

<style scoped>
.login-view {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-element {
  width: 400px;
  height: 50px;
  margin-bottom: 10px;
}

.form-element:last-child {
  margin-bottom: 0;
}

.submit-button {
  height: auto;
}
</style>
