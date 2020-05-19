<template>
  <div class="commodityStyle">
    <div class="commodityStyleTop">商品编辑</div>
    <!-- 背景圆角 -->
    <div class="setBackgroundRadius">
      <div class="radius">背景圆角设置：</div>
      <div class="block">
        <el-slider v-model="backgroundRadius" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 图片圆角设置 -->
    <div class="setRadius">
      <div class="radius">图片圆角设置：</div>
      <div class="block">
        <el-slider v-model="radius" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 单个圆角 -->
    <div class="setOneRadius">
      <div class="radius">商品圆角设置：</div>
      <div class="block">
        <el-slider v-model="oneRadius" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 外边距 -->
    <div class="setMargin">
      <div class="margin">外边距：</div>
      <div class="block">
        <el-slider v-model="margin" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 内边距 -->
    <div class="setPadding">
      <div class="padding">内边距：</div>
      <div class="block">
        <el-slider v-model="padding" show-input :max="80"></el-slider>
      </div>
    </div>
    <!-- 商品间距 -->
    <div class="setSpaceBetweenRadius">
      <div class="radius">商品间距：</div>
      <div class="block">
        <el-slider v-model="spaceBetweenRadius" show-input :max="20"></el-slider>
      </div>
    </div>
    <!-- 商品宽度 -->
    <div class="setWideRadius">
      <div class="radius">商品宽度：</div>
      <div class="block">
        <el-slider v-model="wideRadius" show-input :max="50"></el-slider>
      </div>
    </div>
    <!-- 商品内间距 -->
    <div class="setSpaceBetweenRadius">
      <div class="radius">商品内间距：</div>
      <div class="block">
        <el-slider v-model="spaceBetweenMarginRadius" show-input :max="50"></el-slider>
      </div>
    </div>

    <!-- 背景色 -->
    <div class="background">
      <div>背景色:</div>
      <div class="btn">
        <el-color-picker v-model="backgroundColor"></el-color-picker>
        <div class="reset" @click="resetBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 标题颜色 -->
    <div class="nameBackgroundColor" >
      <div>名字颜色:</div>
      <div class="btn">
        <el-color-picker v-model="NameBackgroundColor"></el-color-picker>
        <div class="reset" @click="setNameBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 价格颜色 -->
    <div class="priceBackgroundColor">
      <div>价格颜色:</div>
      <div class="btn">
        <el-color-picker v-model="priceBackgroundColor"></el-color-picker>
        <div class="reset" @click="setPriceBackgroundColor">重置</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundColor: "", //背景色
      radius: 0, //图片圆角设置
      oneRadius: 0, //单个圆角
      backgroundRadius: 0, //背景圆角
      margin: 0, //外边距
      padding: 0, //内边距
      spaceBetweenRadius: 10, //商品边距
      spaceBetweenMarginRadius: 10, //商品内边距
      wideRadius: 150, //商品宽度
      NameBackgroundColor:'#000',//名字颜色
      priceBackgroundColor:'#000',//价格颜色
    };
  },
  methods: {
    // 点击重置背景颜色
    resetBackgroundColor() {
      this.backgroundColor = "";
    },
    // 名字颜色
    setNameBackgroundColor() {
      this.NameBackgroundColor = "";
    },
    // 价格颜色
    setPriceBackgroundColor() {
      this.priceBackgroundColor = "";
    }
  },
  watch: {
    backgroundColor() {
      this.$emit("getData", this.backgroundColor, "商品");
    },
    oneBackgroundColor() {
      this.$emit("onebackgroundColor", this.oneBackgroundColor, "商品");
    },
    // 监听圆角改变
    radius() {
      // console.log(123456789)
      this.$emit("radius", this.radius, "商品");
    },
    // 单个圆角
    oneRadius() {
      this.$emit("oneRadius", this.oneRadius, "商品");
    },
    // 背景圆角
    backgroundRadius() {
      this.$emit("backgroundRadius", this.backgroundRadius, "商品");
    },
    // 监听外边距
    margin() {
      this.$emit("margin", this.margin, "商品");
    },
    // 监听内边距
    padding() {
      this.$emit("padding", this.padding, "商品");
    },
    //商品边距
    spaceBetweenRadius() {
      this.$emit("spaceBetweenRadius", this.spaceBetweenRadius, "商品");
    },
    //商品边距
    spaceBetweenMarginRadius() {
      this.$emit("spaceBetweenMarginRadius", this.spaceBetweenMarginRadius, "商品");
    },
    //商品宽度
    wideRadius() {
      this.$emit("wideRadius", this.wideRadius, "商品");
    },
    // 标题颜色
    NameBackgroundColor(){
      this.$emit("NameBackgroundColor", this.NameBackgroundColor, "商品");
    },
    // 价格颜色
    priceBackgroundColor(){
      this.$emit("setPriceColor", this.priceBackgroundColor, "商品");
    },
  }
};
</script>

<style lang="less" scoped>
.commodityStyle {
  height: 880px;
  overflow-y: auto;
  .commodityStyleTop {
    background-color: #eee;
    margin-top: 5px;
  }
  .background,.nameBackgroundColor,.priceBackgroundColor {
    margin: 5px 0;
    display: flex;
    justify-content: flex-start;
    div {
      width: 100px;
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
  .setRadius,
  .setMargin,
  .setPadding,
  .setOneRadius,
  .setBackgroundRadius,.setSpaceBetweenRadius,.setWideRadius{
    .template,
    .radius,
    .margin,
    .padding {
      background-color: #eee;
    }
    .block {
      padding: 5px 100px;
      z-index: 1;
    }
  }
}
</style>