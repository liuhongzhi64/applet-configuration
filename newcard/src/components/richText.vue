<template>
  <div class="richText">
    富文本编辑{{ msg }}
    <div class="rich">
      <div></div>
      <div>富文本编辑</div>
      <div>
        <el-button type="primary" @click="centerDialogVisible = true">插入图片</el-button>
      </div>
    </div>
    <!-- <tinymce-editor v-model="msg" :disabled="disabled" @onClick="onClick" ref="editor"></tinymce-editor> -->
    <tinymce-editor v-model="msg" :disabled="disabled" ref="editor"></tinymce-editor>
    <div class="btn">
      <el-button type="primary" @click="clear">清空内容</el-button>
    </div>
    <!-- 图片 -->
    <el-dialog title="图库" :visible.sync="centerDialogVisible" width="860px" center>
      <mapDepot @setPicture="setPicture" />
      <!-- 确定和取消按钮 -->
      <div class="footer">
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setPictures()">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TinymceEditor from "./tinymce-editor";
import mapDepot from "../components/mapDepot";
export default {
  components: {
    TinymceEditor,
    mapDepot
  },
  data() {
    return {
      msg: " ",
      disabled: false,
      centerDialogVisible: false, //默认设置的点击背景图片的开关
      searchInput: "", //搜索图片框
      defultBackgroundImg: "", //背景图
      pictureBackgroundPicture: "" //富文本的背景图
    };
  },
  methods: {
    // //鼠标单击的事件
    // onClick(e, editor) {
    //   let content = e.target.innerHTML
    //   this.msg = content
    //   console.log(e.target.innerHTML);
    //   console.log(editor);
    // },
    //清空内容
    clear() {
      this.$refs.editor.clear();
    },
    // 点击图片改变背景
    setPicture(data) {
      this.defultBackgroundImg = data;
    },
    setPictures() {
      this.pictureBackgroundPicture = this.defultBackgroundImg;
      this.centerDialogVisible = false;
    }
  },
  watch: {
    msg() {
      this.$emit("richTextContent", this.msg, "富文本");
      console.log(this.msg);
    }
  }
};
</script>

<style lang="less" scoped>
.richText {
  height: 100%;
  .rich {
    background-color: #ccc;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
  }
  .footer {
    display: flex;
    justify-content: center;
  }
  .btn {
    margin-top: 20px;
  }
}
</style>