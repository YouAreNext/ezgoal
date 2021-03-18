<template>
  <el-dialog :modelValue="isOpen" @close="close()" title="Create Material">
    <el-row>
      <el-col :span="14">
        <el-form
          ref="dataForm"
          :rules="rules"
          label-position="left"
          label-width="100px"
        >
          <el-form-item label="URL" prop="url">
            <el-col>
              <el-input v-model="material.url">
                <template #append>
                  <div
                    @click="handleParseMaterial()"
                    class="curp icon-container"
                  >
                    <div v-if="parseLoading" v-loading="parseLoading"></div>
                    <div v-else><svg-icon name="search"></svg-icon></div>
                  </div>
                </template>
              </el-input>
              <div class="sub-title tal">
                Example for parse:
                https://dev.to/bytebodger/do-you-even-npm-bro-1h3e
              </div>
            </el-col>
          </el-form-item>

          <el-form-item label="Title" prop="name">
            <el-input v-model="material.title" />
          </el-form-item>
          <el-form-item label="Image" prop="image">
            <el-input v-model="material.image" />
          </el-form-item>
          <el-form-item v-if="material.image" class="tal">
            <el-col>
              <img
                :src="material.image"
                alt="material.title"
                style="width: 200px"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="Type">
            <select-pre-async
              :getOptions="getOptions"
              v-model:value="material.type"
            ></select-pre-async>
          </el-form-item>
          <el-form-item label="Description">
            <el-input
              v-model="material.description"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleCreateMaterial"
              >Create</el-button
            >
            <el-button @click="close()">Cancel {{ isOpen }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
        <div v-if="parsedImages.length > 0">
          <div class="parse-image__preview" v-if="mainImage">
            <img
              :src="mainImage"
              alt="material.title"
              style="width: 200px"
              @click="material.image = mainImage"
            />
          </div>
          <div
            class="parse-image__preview"
            v-for="(img, index) in parsedImages"
            :key="index"
          >
            <img
              :src="img"
              alt=""
              style="max-width: 200px"
              @click="material.image = img"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Material } from "@/@types/material/index";
import { ElMessage } from "element-plus";
import SvgIcon from "@/components/SvgIcon.vue";
import SelectPreAsync from "@/components/Select/Common/SelectPreAsync.vue";
import getOptions from "@/graphql/Material/types";
import createMaterialMutation from "@/graphql/Material/create";
import PARSE_MATERIAL_MUTATION from "@/graphql/Material/parse.graphql";
import { useMutation } from "@vue/apollo-composable";

export default defineComponent({
  components: {
    SvgIcon,
    SelectPreAsync
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const material = reactive<Material>({
      title: "",
      type: "article",
      image: "",
      url: "",
      description: ""
    });

    const parsedImages = ref([]);

    const close = () => {
      ctx.emit("update:isOpen", false);
    };

    const { loading: parseLoading, mutate: parseMaterial } = useMutation(
      PARSE_MATERIAL_MUTATION
    );

    const mainImage = ref("");

    const handleParseMaterial = async () => {
      if (!parseLoading.value) {
        try {
          const {
            data: { parse_material }
          } = await parseMaterial({ url: material.url });

          mainImage.value = parse_material.image;
          parsedImages.value = parse_material.images;
          material.title = parse_material.title;
          material.image = parse_material.image;
          material.description = parse_material.description;
        } catch (e) {
          ElMessage({
            type: "error",
            message: `Parse error, try another link`
          });
        }
      }
    };

    const m = createMaterialMutation();
    const handleCreateMaterial = async () => {
      try {
        await m.createMaterial({ object: material });
        ctx.emit("created");
        ElMessage({
          type: "success",
          message: `Material was created`
        });
        close();
      } catch (e) {
        ElMessage({
          type: "error",
          message: `Create material error`
        });
      }
    };

    return {
      close,
      material,
      getOptions,
      handleParseMaterial,
      parsedImages,
      handleCreateMaterial,
      parseLoading,
      mainImage
    };
  }
});
</script>
