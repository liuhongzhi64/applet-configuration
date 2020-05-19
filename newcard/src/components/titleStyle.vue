<template>
  <div class="titleStyle">
    <div class="titleTop">标题编辑</div>
    <!-- 标题名 -->
    <div class="setTitleName">
      <div class="titleName">标题名：</div>
      <div class="block">
        <el-input placeholder="请输入内容" v-model="textarea" clearable></el-input>
      </div>
    </div>
    <!-- 显示位置 -->
    <div class="showSide">
      <div>显示位置:</div>
      <div class="block">
        <el-radio v-model="sideRadio" label="1">居左</el-radio>
        <el-radio v-model="sideRadio" label="2">居中</el-radio>
        <el-radio v-model="sideRadio" label="3">居右</el-radio>
      </div>
    </div>
    <!-- 副标题 -->
    <div class="setSubhead">
      <div class="subhead">副标题：</div>
      <div class="block">
        <el-input placeholder="请输入内容" v-model="Subheadtextarea" clearable></el-input>
      </div>
    </div>
    <!-- 背景色 -->
    <div class="background">
      <div>背景色:</div>
      <div class="btn">
        <el-color-picker v-model="backgroundColor" ref="defultBackgroundColor"></el-color-picker>
        <div class="reset" @click="resetBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 字体颜色 -->
    <div class="color">
      <div class="textes">字体颜色:</div>
      <div class="btn">
        <el-color-picker v-model="fontsColor"></el-color-picker>
        <div class="reset" @click="fontColor">重置</div>
      </div>
    </div>
    <!-- 圆角设置 -->
    <div class="setRadius">
      <div class="radius">圆角设置：</div>
      <div class="block">
        <el-slider v-model="radius" show-input :max="80"></el-slider>
      </div>
    </div>
    <!-- 外边距 -->
    <div class="setMargin">
      <div class="margin">外边距：</div>
      <div class="block">
        <el-slider v-model="margin" show-input :max="80"></el-slider>
      </div>
    </div>
    <!-- 内边距 -->
    <div class="setPadding">
      <div class="padding">内边距：</div>
      <div class="block">
        <el-slider v-model="padding" show-input :max="80"></el-slider>
      </div>
    </div>
    <!-- 链接 -->
    <div class="links">
      链接:
      <span class="link" @click="dialogNewLIink">编辑内容</span>
    </div>
    <!-- 链接的对话框 -->
    <el-dialog title="选择链接" :visible.sync="dialogLIink" v-if="dialogLIink" width="70%" center>
      <!-- 中间主体部分 -->
      <Link ref="newOrderDetail" />

      <!-- 页脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLIink = false">取 消</el-button>
        <el-button type="primary" @click="dialogLIink = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Link from "../components/link";
export default {
  components: { Link },
  data() {
    return {
      backgroundColor: "", //背景默认颜色
      fontsColor: "#000", //字体颜色
      sideRadio: "1", //显示位置
      radius: 0, //圆角的初始值
      margin: 0, //外边距
      padding: 0, //内边距
      dialogLIink: false, //打开对话框
      textarea: "", //标题内容
      Subheadtextarea: "" //副标题内容
    };
  },
  methods: {
    // 点击背景颜色
    resetBackgroundColor() {
      // 重置默认背景颜色
      this.backgroundColor = "";
    },
    //点击字体颜色重置
    fontColor() {
      this.fontsColor = "#000";
    },
    // 编辑内容（链接）
    dialogNewLIink() {
      this.dialogLIink = true;
    }
  },
  watch: {
    // 监听默认地址背景颜色改变事件
    backgroundColor() {
      this.$emit("getData", this.backgroundColor, "标题");
    },
    // 监听标题内容
    textarea() {
      this.$emit("textarea", this.textarea, "标题");
    },
    // 监听副标题内容
    Subheadtextarea() {
      this.$emit("subheadtextarea", this.Subheadtextarea, "标题");
    },
    // 监听字体颜色
    fontsColor() {
      this.$emit("fontColor", this.fontsColor, "标题");
    },
    // 监听显示位置
    sideRadio() {
      // console.log(this.sideRadio)
      this.$emit("sideRadio", this.sideRadio, "标题");
    },
    // 监听圆角改变
    radius() {
      // console.log(123456789)
      this.$emit("radius", this.radius, "标题");
    },
    // 监听外边距
    margin() {
      this.$emit("margin", this.margin, "标题");
    },
    // 监听内边距
    padding() {
      this.$emit("padding", this.padding, "标题");
    }
  }
};
</script>

<style lang="less" scoped>
.titleStyle {
  .titleTop {
    background-color: #ccc;
  }
  .background,
  .color {
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
  .texts,
  .setRadius,
  .setMargin,
  .setPadding {
    .textConter,
    .radius,
    .margin,
    .padding {
      background-color: #eee;
    }
    .block {
      padding: 10px 100px;
      z-index: 1;
    }
  }
  .strong,
  .showSide {
    display: flex;
    margin: 10px 0;
    .set-strong {
      display: flex;
      margin-left: 40px;
      cursor: pointer;
      width: 30%;
      .el-switch {
        width: 50px;
      }
      div {
        width: 100px;
      }
    }
  }
  .showSide {
    padding: 10px 0;
    .block {
      margin-left: 40px;
    }
  }
  .links {
    padding: 20px;
    .link {
      cursor: pointer;
      color: #2692ff;
    }
  }
  .setTitleName,
  .setSubhead {
    margin: 10px 0;
    display: flex;
    line-height: 40px;
  }
}
</style>