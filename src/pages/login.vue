<template>
  <el-form :model="loginForm" class="auth-form" :rules="loginRules" ref="form">
    <el-form-item prop="email" :error="loginFormErrors.email">
      <el-input
        ref="email"
        v-model="loginForm.email"
        placeholder="email"
        name="email"
        type="text"
        tabindex="1"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item prop="password" :error="loginFormErrors.password">
      <el-input
        ref="password"
        v-model="loginForm.password"
        placeholder="password"
        name="password"
        type="password"
        tabindex="1"
        autocomplete="on"
      />
    </el-form-item>
    <el-button
      type="primary"
      style="width:100%;margin-bottom:30px;"
      @click="handleLogin()"
      >Login</el-button
    >
    <router-link to="register" class="register-btn">Register</router-link>
  </el-form>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, reactive, ref, nextTick } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { ElMessage } from "element-plus";

import LOGIN_QUERY from "@/graphql/login.graphql";

export default defineComponent({
  setup() {
    const router = useRouter();
    const loginForm = reactive({
      email: "",
      password: ""
    });
    const loginFormErrors = reactive<any>({});
    const loginRules = reactive({
      email: [
        {
          required: true,
          message: "Required field",
          trigger: "blur"
        },
        {
          type: "email",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "Required field"
        }
      ]
    });
    const form = ref<null | { validate: (valid: any) => null }>(null);

    const saveUserLocal = (token: string): void => {
      localStorage.setItem("AUTH_TOKEN", token);
    };

    const { mutate: loginQuery } = useMutation(LOGIN_QUERY);

    const handleLogin = async () => {
      form.value?.validate(async (valid: any) => {
        if (valid) {
          try {
            const {
              data: { login }
            } = await loginQuery(loginForm);
            saveUserLocal(login.access_token);
            await nextTick();
            router.push({ name: "Index" });
          } catch (e) {
            ElMessage({
              type: "error",
              message: `Something went wrong`
            });
          }
        }
      });
    };

    const capsTooltip = false;
    return {
      loginForm,
      capsTooltip,
      handleLogin,
      form,
      loginRules,
      loginFormErrors
    };
  }
});
</script>
