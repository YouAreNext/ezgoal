<template>
  <div class="app-container">
    <h1 class="main-header">Materials</h1>
    <el-row class="masonry-container">
      <el-col
        :span="4"
        v-for="(item, index) in materials"
        :key="index"
        class="item-card-masonry"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.image" class="image" />
          <div style="padding: 14px;">
            <h3>
              <a :href="item.url" target="_blank">{{ item.title }}</a>
            </h3>
            <div class="bottom" v-html="item.description"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card
          :body-style="{ padding: '0px' }"
          class="card-append__material"
          @click="dialogPvVisible = !dialogPvVisible"
        >
          <div class="el-card__main">
            +
          </div>
          <div class="bottom">Добавить материал</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <material-dialog
    v-model:isOpen="dialogPvVisible"
    @created="created()"
  ></material-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import scrollMonitor from "scrollmonitor";

import GET_MATERIALS from "@/graphql/Material/index.graphql";
import MaterialDialog from "@/components/Dialog/Material.vue";

export default defineComponent({
  components: {
    MaterialDialog
  },
  setup() {
    const dialogPvVisible = ref(false);
    const { loading, result, fetchMore } = useQuery(GET_MATERIALS);
    const limit = 17;
    let page = 1;

    const materials = useResult(result, null, data => data.materials);
    const paginatorInfo = useResult(result, null, data => data.paginatorInfo);

    const fetchMoreHandler = () => {
      page++;

      fetchMore({
        variables: {
          offset: limit * page,
          limit
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          return {
            ...previousResult,
            materials: [
              ...previousResult.materials,
              ...fetchMoreResult.materials
            ]
          };
        }
      });
    };

    const handleScroll = async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (
          page >= Math.ceil(paginatorInfo.value.aggregate.count / limit) ||
          loading.value
        ) {
          return;
        }

        fetchMoreHandler();
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const created = () => {
      // TODO: for masonry ReInit
      console.log("mas");
    };

    return { dialogPvVisible, materials, created };
  }
});
</script>
