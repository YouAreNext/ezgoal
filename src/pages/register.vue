<template>
  <el-form
    :model="registerForm"
    class="auth-form"
    :rules="registerRules"
    ref="form"
  >
    <el-form-item prop="email" :error="registerFormErrors.email">
      <el-input
        ref="email"
        v-model="registerForm.email"
        placeholder="email, example: test@mail.ru"
        name="email"
        type="text"
        tabindex="1"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item prop="password" :error="registerFormErrors.password">
      <el-input
        ref="password"
        v-model="registerForm.password"
        placeholder="password, example: 123456"
        name="password"
        type="password"
        tabindex="1"
        autocomplete="on"
      />
    </el-form-item>
    <el-button
      type="primary"
      style="width:100%;margin-bottom:30px;"
      @click="handleRegister()"
      >Register</el-button
    >
    <router-link to="login" class="register-btn">Login</router-link>
  </el-form>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, reactive, ref, nextTick } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { ElMessage } from "element-plus";

import REGISTER_QUERY from "@/graphql/register.graphql";

export default defineComponent({
  setup() {
    const router = useRouter();
    const registerForm = reactive({
      email: "",
      password: ""
    });
    const registerFormErrors = reactive<any>({});
    const registerRules = reactive({
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
        },
        {
          min: 6
        }
      ]
    });
    const form = ref<null | { validate: (valid: any) => null }>(null);

    const saveUserLocal = (token: string): void => {
      localStorage.setItem("AUTH_TOKEN", token);
    };

    const { mutate: registerQuery } = useMutation(REGISTER_QUERY);

    const handleRegister = async () => {
      form.value?.validate(async (valid: any) => {
        if (valid) {
          try {
            const {
              data: { register }
            } = await registerQuery(registerForm);
            saveUserLocal(register.access_token);
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
      registerForm,
      capsTooltip,
      handleRegister,
      form,
      registerRules,
      registerFormErrors
    };
  }
});
</script>
