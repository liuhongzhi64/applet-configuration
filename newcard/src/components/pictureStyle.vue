<template>
  <div class="picture">
    <!-- 标题 -->
    <div class="title">
      <div>图片编辑</div>
    </div>
    <!-- 背景色 -->
    <div class="background">
      <div>背景色:</div>
      <div class="btn">
        <el-color-picker v-model="backgroundColor" ref="defultBackgroundColor"></el-color-picker>
        <div class="reset" @click="resetBackgroundColor">重置</div>
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
    <!-- 上传图片列表 -->
    <div class="pictureList">
      <div class="pictureItem" v-for="(i,k) in pictureItemList" :key="k" :index="k">
        <div class="uploadingImg">
          <div
            class="backgroundImgs"
            @click="openPictureVisible(i,k)"
            :style="{'background': `url(${i.pictureUrl}) 0% 0% / 100% 100%  no-repeat `}"
          >
            <i class="el-icon-plus" v-if="!i.pictureUrl" style="color:#fff"></i>
            <i class="el-icon-plus" v-if="i.pictureUrl" style="color:#fff"></i>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
          <!-- 图片 -->
          <el-dialog title="图库" :visible.sync="centerDialogVisible" width="860px" center :index="k">
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
        <!-- 链接 -->
        <div class="links">
          链接：
          <el-button type="info" @click="dialogNewLIink(i)">{{linkText}}</el-button>
          <el-button type="info" @click="clearLink()" v-if="clearLinkShow">清空</el-button>
        </div>
        <!-- 链接的对话框 -->
        <el-dialog
          title="选择链接"
          :visible.sync="dialogLIink"
          v-if="dialogLIink"
          width="70%"
          center
          :index="k"
        >
          <!-- 中间主体部分 -->
          <Link ref="newOrderDetail" @multipleSelection="multipleSelection" />
          <!-- 页脚 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogLIink = false">取 消</el-button>
            <el-button type="primary" @click="confirmLink()">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 删除 -->
        <div class="del" @click="delElement(i)"></div>
      </div>
      <!-- 上传图片 -->
      <div class="uploading" @click="addPicture(1)">
        <div>+添加图片</div>
      </div>
    </div>
  </div>
</template>

<script>
import Link from "../components/link";
import mapDepot from "../components/mapDepot";
export default {
  components: { Link, mapDepot },
  data() {
    return {
      backgroundColor: "", //背景默认颜色
      radius: 0, //圆角的初始值
      margin: 0, //外边距
      padding: 0, //内边距
      dialogImageUrl: "",
      dialogVisible: false, //上传图片
      centerDialogVisible: false, //上传图片
      pictureBackgroundPicture: "", //图片的选择框的背景图
      defultBackgroundImg: "", //背景图
      pictureItemList: [
        {
          id: 1,
          pictureUrl: require("../assets/imgs/picture.png"),
          pictureLink: []
        }
      ],
      num: 1,
      dialogLIink: false, //打开对话框
      pictureObj: {},
      pictureListUrl: "",
      key: 0,
      pictureLinkList: [],
      linkText:'编辑内容',
      clearLinkShow:false,
    };
  },
  methods: {
    // 重置默认背景颜色
    resetBackgroundColor() {
      this.backgroundColor = "";
      this.$refs.defultBackgroundColor.color.value = this.backgroundColor;
      this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor = this.backgroundColor;
    },
    // 编辑内容（链接）
    dialogNewLIink(i) {
      this.dialogLIink = true;
      console.log(i);
    },
    // 打开选择图片的弹窗
    openPictureVisible(i, k) {
      this.centerDialogVisible = true;
      this.key = k;
    },

    // 点击删除
    delElement(item) {
      for (let i = 0; i < this.pictureItemList.length; i++) {
        if (this.pictureItemList[i] == item) {
          // console.log(i)
          this.pictureItemList.splice(i, 1);
          return;
        }
      }
    },
    // 点击图片改变背景
    setPicture(data) {
      this.defultBackgroundImg = data;
    },
    setPictures() {
      this.pictureBackgroundPicture = this.defultBackgroundImg;
      this.pictureListUrl = this.defultBackgroundImg;
      this.centerDialogVisible = false;
      //   i.pictureUrl = this.defultBackgroundImg
      this.pictureItemList[this.key].pictureUrl = this.defultBackgroundImg;
      //   console.log(this.pictureItemList)
    },
    // 点击添加图片
    addPicture(i) {
      this.pictureObj = {
        id: this.num + i,
        pictureUrl: require("../assets/imgs/picture.png"),
        pictureLink: []
      };
      this.num = this.num + i;
      // console.log(i,this.num)
      this.pictureItemList.push(this.pictureObj);
      // console.log(this.pictureItemList)
    },
    // 点击链接的确定按钮
    confirmLink() {
      this.dialogLIink = false;
      // console.log(this.pictureLinkList);
      this.linkText = '已选择：' + this.pictureLinkList.length +'件商品'
      this.clearLinkShow  = true
    },
    clearLink(){
      this.linkText = '编辑内容'
      this.clearLinkShow  = false
    },
    // 监听到链接的传过来的值
    multipleSelection(item) {
      this.pictureLinkList = item;
      this.pictureItemList[this.key].pictureLink = this.pictureLinkList
    }
  },
  watch: {
    // 监听默认背景颜色改变事件
    backgroundColor() {
      this.$emit("getData", this.backgroundColor, "图片");
    },
    // 监听圆角改变
    radius() {
      // console.log(123456789)
      this.$emit("radius", this.radius, "图片");
    },
    // 监听外边距
    margin() {
      this.$emit("margin", this.margin, "图片");
    },
    // 监听内边距
    padding() {
      this.$emit("padding", this.padding, "图片");
    },
    pictureBackgroundPicture() {
      //   console.log(this.pictureItemList)
      this.$emit(
        "pictureBackgroundPicture",
        this.pictureBackgroundPicture,
        "图片"
      );
    },
    pictureListUrl() {
      this.$emit("pictureList", this.pictureItemList, "图片");
      // console.log(this.pictureItemList)
    }
  }
};
</script>

<style lang="less" scoped>
.picture {
  .title {
    div {
      background-color: #eee;
    }
  }
  .sites,
  .background {
    margin-top: 5px;
    display: flex;
    justify-content: flex-start;
    div {
      width: 90px;
      line-height: 40px;
    }
    .el-input {
      width: 80%;
    }
  }
  .background {
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
  .setPadding {
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
  .pictureList {
    padding: 10px;
    height: 450px;
    overflow-y: auto;
    .pictureItem {
      position: relative;
      border: 1px solid #e9ebee;
      display: flex;
      padding: 10px;
      margin-top: 10px;
      .uploadingImg {
        width: 30%;
        .backgroundImgs {
          cursor: pointer;
          margin: 0 atut;
          margin-top: 25px;
          margin-left: 20%;
          width: 100px;
          height: 100px;
          background-color: #eee;
          font-size: 40px;
          font-weight: 400;
          border: 1px solid #ddd;
          border-radius: 5px;
          text-align: center;
          display: flex;
          -webkit-box-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          align-items: center;
        }
      }
      .links {
        line-height: 148px;
      }
    }
    .pictureItem:hover {
      border: 1px solid rgb(90, 136, 235);
      .del {
        display: block;
      }
    }
    .del {
      cursor: pointer;
      background: url("../assets/imgs/del.png") no-repeat;
      background-size: 100%;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      position: absolute;
      top: -10px;
      right: -10px;
      display: none;
    }
  }
  .uploading {
    cursor: pointer;
    padding: 10px;
    div {
      height: 34px;
      line-height: 34px;
      border: 1px solid #e9ebee;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;
      color: rgb(90, 136, 235);
    }
  }
  .uploading div:hover {
    border: 1px solid rgb(90, 136, 235);
  }
  .footer {
    display: flex;
    justify-content: center;
  }

}
</style>