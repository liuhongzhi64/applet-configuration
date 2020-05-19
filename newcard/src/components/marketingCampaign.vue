<template>
  <div class="marketingCampaign">
    <div class="marketingCampaignTop">营销活动编辑</div>
    <!-- 选择模板 -->
    <div class="setTemplate">
      <div class="template">选择模板</div>
      <div class="bolck">
        <div
          class="one"
          @click="changeTemplate(1)"
          :v-bind="changeTemplateImg"
          :style="{'border': (changeTemplateImg1 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/marketingCampaignOne.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(2)"
          :style="{'border': (changeTemplateImg2 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/marketingCampaignTwo.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(3)"
          :style="{'border': (changeTemplateImg3 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/marketingCampaignThree.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(4)"
          :style="{'border': (changeTemplateImg4 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/marketingCampaignFour.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(5)"
          :style="{'border': (changeTemplateImg5 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/marketingCampaignfive.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(6)"
          :style="{'border': (changeTemplateImg6 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/marketingCampaignSix.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(7)"
          :style="{'border': (changeTemplateImg7 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/marketingCampaignSeven.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(8)"
          :style="{'border': (changeTemplateImg8 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/marketingCampaignEight.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(9)"
          :style="{'border': (changeTemplateImg9 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/marketingCampaignNine.png" alt />
        </div>
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
        <el-slider v-model="padding" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 单个圆角 -->
    <div class="setRadius">
      <div class="radius">圆角设置：</div>
      <div class="block">
        <el-slider v-model="oneRadius" show-input :max="50"></el-slider>
      </div>
    </div>
    <!-- 背景圆角 -->
    <div class="setBackgroundRadius">
      <div class="radius">背景圆角设置：</div>
      <div class="block">
        <el-slider v-model="backgroundRadius" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 图片间距 -->
    <div class="setSpaceBetweenRadius" v-if="changeTemplateImg2||changeTemplateImg3||changeTemplateImg9">
      <div class="radius">图片间距：</div>
      <div class="block">
        <el-slider v-model="spaceBetweenRadius" show-input :max="10"></el-slider>
      </div>
    </div>
    <!-- 图片宽度 -->
    <div class="setWideRadius" v-if="changeTemplateImg2||changeTemplateImg3||changeTemplateImg9">
      <div class="radius">图片宽度：</div>
      <div class="block">
        <el-slider v-model="wideRadius" show-input :max="50"></el-slider>
      </div>
    </div>
    <!-- 图文内容 -->
    <div class="setImageTextCentent">
      <div class="imageTextCentent">图文内容</div>
      <div class="pictureList">
        <div class="pictureItem" v-for="(i,k) in pictureItemList" :key="k">
          <div class="uploadingImg">
            <div class="backgroundImgs" @click="centerDialogVisible = true">
              <i class="el-icon-plus"></i>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
          <div class="links">
            <!-- <span @click="dialogLIink = true">编辑内容</span> -->
            <div class="setCenter">
              链接：
              <el-button type="info" @click="dialogNewLIink(i)">编辑内容</el-button>
            </div>
          </div>
          <div class="del" @click="delElement(i)"></div>
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
        <!-- 图片 -->
        <el-dialog title="图库" :visible.sync="centerDialogVisible" width="860px" center>
          <mapDepot />
          <!-- 确定和取消按钮 -->
          <div class="footer">
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
          </div>
        </el-dialog>
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
      backgroundColor: "", //背景色
      changeTemplateImg1: false, //图片的选择样式
      changeTemplateImg2:true , //图片的选择样式
      changeTemplateImg3: false, //图片的选择样式
      changeTemplateImg4: false, //图片的选择样式
      changeTemplateImg5: false, //图片的选择样式
      changeTemplateImg6: false, //图片的选择样式
      changeTemplateImg7: false, //图片的选择样式
      changeTemplateImg8: false, //图片的选择样式
      changeTemplateImg9: false, //图片的选择样式
      oneRadius: 0, //单个圆角
      backgroundRadius: 0, //背景圆角
      margin: 0, //外边距
      padding: 10, //内边距
      spaceBetweenRadius: 10, //图片边距
      wideRadius: 150, //图片宽度
      dialogImageUrl: "",
      dialogVisible: false,
      centerDialogVisible: false, //上传图片
      pictureItemList: ["1","2"],
      num: 1,
      dialogLIink: false,
      changeTemplateImg:2,//模板
    };
  },
  methods: {
    // 点击重置背景颜色
    resetBackgroundColor() {
      this.backgroundColor = "";
    },
    // 选择模板
    changeTemplate(i) {
      if (i == 1) {
        this.changeTemplateImg1 = true;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg4 = false;
        this.changeTemplateImg5 = false;
        this.changeTemplateImg6 = false;
        this.changeTemplateImg7 = false;
        this.changeTemplateImg8 = false;
        this.changeTemplateImg9 = false;
        this.pictureItemList = ['1']
        this.changeTemplateImg = 1
      } else if (i == 2) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = true;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg4 = false;
        this.changeTemplateImg5 = false;
        this.changeTemplateImg6 = false;
        this.changeTemplateImg7 = false;
        this.changeTemplateImg8 = false;
        this.changeTemplateImg9 = false;
        this.pictureItemList = ["1","2"]
        this.changeTemplateImg = 2
      } else if (i == 3) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = true;
        this.changeTemplateImg4 = false;
        this.changeTemplateImg5 = false;
        this.changeTemplateImg6 = false;
        this.changeTemplateImg7 = false;
        this.changeTemplateImg8 = false;
        this.changeTemplateImg9 = false;
        this.pictureItemList = ["1","2","3"]
        this.changeTemplateImg = 3
      } else if (i == 4) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg4 = true;
        this.changeTemplateImg5 = false;
        this.changeTemplateImg6 = false;
        this.changeTemplateImg7 = false;
        this.changeTemplateImg8 = false;
        this.changeTemplateImg9 = false;
        this.pictureItemList = ["1","2","3"]
        this.changeTemplateImg = 4
      } else if (i == 5) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg4 = false;
        this.changeTemplateImg5 = true;
        this.changeTemplateImg6 = false;
        this.changeTemplateImg7 = false;
        this.changeTemplateImg8 = false;
        this.changeTemplateImg9 = false;
        this.pictureItemList = ["1","2","3"]
        this.changeTemplateImg = 5
      } else if (i == 6) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg4 = false;
        this.changeTemplateImg5 = false;
        this.changeTemplateImg6 = true;
        this.changeTemplateImg7 = false;
        this.changeTemplateImg8 = false;
        this.changeTemplateImg9 = false;
        this.pictureItemList = ["1","2","3",'4']
        this.changeTemplateImg = 6
      } else if (i == 7) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg4 = false;
        this.changeTemplateImg5 = false;
        this.changeTemplateImg6 = false;
        this.changeTemplateImg7 = true;
        this.changeTemplateImg8 = false;
        this.changeTemplateImg9 = false;
        this.pictureItemList = ["1","2","3",'4']
        this.changeTemplateImg = 7
      } else if (i == 8) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg4 = false;
        this.changeTemplateImg5 = false;
        this.changeTemplateImg6 = false;
        this.changeTemplateImg7 = false;
        this.changeTemplateImg8 = true;
        this.changeTemplateImg9 = false;
        this.pictureItemList = ["1","2","3",'4']
        this.changeTemplateImg = 8
      } else if (i == 9) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg4 = false;
        this.changeTemplateImg5 = false;
        this.changeTemplateImg6 = false;
        this.changeTemplateImg7 = false;
        this.changeTemplateImg8 = false;
        this.changeTemplateImg9 = true;
        this.pictureItemList = ["1","2","3",'4']
        this.changeTemplateImg = 9
      }
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
    // 编辑内容（链接）
    dialogNewLIink(e) {
      this.dialogLIink = true;
      console.log(e);
    },
  },
  watch: {
    // 监听默认地址背景颜色改变事件
    backgroundColor() {
      console.log(this.backgroundColor);
      this.$emit("getData", this.backgroundColor, "营销活动");
    },
    // 单个圆角
    oneRadius() {
      this.$emit("oneRadius", this.oneRadius, "营销活动");
    },
    // 背景圆角
    backgroundRadius() {
      this.$emit("radius", this.backgroundRadius, "营销活动");
    },
    //图片边距
    spaceBetweenRadius() {
      this.$emit("spaceBetweenRadius", this.spaceBetweenRadius, "营销活动");
    },
    //图片宽度
    wideRadius() {
      this.$emit("wideRadius", this.wideRadius, "营销活动");
    },
    // 监听外边距
    margin() {
      this.$emit("margin", this.margin, "营销活动");
    },
    // 监听内边距
    padding() {
      this.$emit("padding", this.padding, "营销活动");
    },
      // 监听模板样式
    changeTemplateImg(){
      this.$emit("changeTemplate", this.changeTemplateImg, "营销活动");
      // console.log(this.changeTemplateImg)
    },
  }
};
</script>

<style lang="less" scoped>
.marketingCampaign {
    height:860px;
    overflow-y: auto;
  width: 500px;
  margin: 0 auto;
  .marketingCampaignTop {
    background-color: #eee;
    margin: 10px 0;
  }
 .setRadius,
  .setMargin,
  .setPadding,
  .setOneRadius,
  .setBackgroundRadius,.setBackgroundRadius ,.setSpaceBetweenRadius,.setSpaceBetweenRadius,.setWideRadius{
    .template,
    .radius,
    .margin,
    .padding {
      background-color: #eee;
    }
    .block {
      padding: 5px 20px;
      z-index: 1;
    }
  }
  .background {
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
  .setTemplate {
    width: 100%;
    .template {
      background-color: #eee;
      margin: 5px 0;
    }
    .bolck {
      margin: 0 auto;
      // width: 70%;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      flex-wrap: wrap;
      .one {
        cursor: pointer;
        padding: 5px;
      }
      .one:hover {
        background-color: #eee;
      }
    }
  }
  .pictureList {
    padding: 0 10px;
    // height: 240px;
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
          margin-top: 10px;
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
        display: flex;
        justify-content: center;
        flex-direction: column;
        color: #31708f;
        margin-left: 20px;
        .title,
        .price {
          display: flex;
          margin: 5px 0;
          span {
            width: 30%;
            line-height: 40px;
          }
        }
        span {
          cursor: pointer;
        }
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
  .footer {
    display: flex;
    justify-content: center;
  }
}
</style>