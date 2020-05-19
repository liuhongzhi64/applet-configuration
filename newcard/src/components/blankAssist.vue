<template>
  <div class="blankAssist">
    <div class="blankAssistTop">空白辅助</div>
    <!-- 背景色 -->
    <div class="background">
      <div>背景色:</div>
      <div class="btn">
        <el-color-picker v-model="backgroundColor"></el-color-picker>
        <div class="reset" @click="resetBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 当前值（高度） -->
    <div class="setCurrentValueHeigth">
      <div class="currentValueHeigth">当前值：</div>
      <div class="block">
        <el-slider v-model="currentValueHeigthRadius" show-input :max="80" :min='18'></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundColor: "",
      currentValueHeigthRadius: 10 //当前的高度
    };
  },
  methods: {
    // 点击背景颜色
    resetBackgroundColor() {
      this.backgroundColor = "";
    }
  },
  watch: {
    // 监听默认背景颜色改变事件
    backgroundColor() {
        console.log(this.backgroundColor)
      this.$emit("getData", this.backgroundColor, "空白辅助");
    },
    // 监听当前值（高度）改变
    currentValueHeigthRadius() {
      this.$emit("radius", this.currentValueHeigthRadius, "空白辅助");
    }
  }
};
</script>

<style lang="less" scoped>
.blankAssist {
  .blankAssistTop {
    background-color: #eee;
  }
  .background {
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    div {
      width: 90px;
      line-height: 40px;
    }
    .el-input {
      width: 80%;
    }
    .btn {
      height: 40px;
      display: flex;
      justify-content: center;
      width: 100%;
      color: #2692ff;
      .m-colorPicker {
        height: 40px;
        padding: 12px 0;
        .colorBtn {
          width: 40px;
          height: 40px;
        }
      }
      .reset {
        width: 30%;
        cursor: pointer;
      }
    }
  }
  .setCurrentValueHeigth {
    .currentValueHeigth {
      background-color: #eee;
    }
    .block {
      padding: 10px 100px;
      z-index: 1;
    }
  }
}
</style>