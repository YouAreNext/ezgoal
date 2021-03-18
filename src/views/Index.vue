<template>
  <div class="app-container">
    <h1>Main page</h1>
    <el-row>
      <el-col :span="4" v-for="o in 2" :key="o">
        <el-card>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>Yummy hamburger</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">Operating</el-button>
            </div>
          </div>
        </el-card>
        <el-card> </el-card>
      </el-col>
    </el-row>
  </div>
</template>
