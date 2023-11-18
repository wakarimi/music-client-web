<template>
 <div class="account-tab">
   <CustomButton
       class="logout"
       button-text="Выход"
       background-color="#F8A0A0"
       background-color-hover="#F25757"
       background-color-active="#F25757"
       border-color="#F25757"
       border-color-hover="#BD0F0F"
       border-color-active="#BD0F0F"
       text-color="#FAF8F6"
       text-color-hover="#F5F1ED"
       text-color-active="#F5F1ED"
       size-change-percent=2
       @click="logout"
   >

   </CustomButton>
 </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/base/CustomButton.vue";
import { useAccountsStore } from '@/stores/useAccountsStore'
import { useTokensStore } from '@/stores/useTokensStore'
import { useRouter } from 'vue-router'

const accountStore = useAccountsStore()
const tokenStore = useTokensStore()
const router = useRouter()

const logout = async () => {
  try {
    await accountStore.logout()
    await tokenStore.logout()
    await router.push('login')
  } catch (error) {
    /* empty */
  }
}
</script>

<style scoped>

</style>