<template>
  <div class="labelCommodity">
    <div class="labelCommodityTop">标签商品编辑</div>
    <!-- 选择模板 -->
    <div class="setTemplate">
      <div class="template">选择模板</div>
      <div class="bolck">
        <div
          class="one"
          @click="changeTemplate(1)"
          :style="{'border': (changeTemplateImg1 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/labelCommodityOne.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(2)"
          :style="{'border': (changeTemplateImg2 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/labelCommodityTwo.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(3)"
          :style="{'border': (changeTemplateImg3 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/labelCommodityThree.png" alt />
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
    <!-- 商品背景色 -->
    <div class="background">
      <div>商品背景色:</div>
      <div class="btn">
        <el-color-picker v-model="commodityBackgroundColor"></el-color-picker>
        <div class="reset" @click="resetcommodityBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 名称颜色 -->
    <div class="background">
      <div>名称颜色:</div>
      <div class="btn">
        <el-color-picker v-model="nameColor"></el-color-picker>
        <div class="reset" @click="resetnameColor">重置</div>
      </div>
    </div>
    <!-- 价格颜色 -->
    <div class="background">
      <div>价格颜色:</div>
      <div class="btn">
        <el-color-picker v-model="priceColors"></el-color-picker>
        <div class="reset" @click="resetpriceColor">重置</div>
      </div>
    </div>
    <!-- 标签颜色 -->
    <div class="setBackgroundRadius" style="margin-bottom:10px;">
        <div class="radius">标签颜色:</div>
        <!-- 默认颜色 -->
        <div class="background">
        <div >默认颜色:</div>
            <div class="btn">
                <el-color-picker v-model="labelColors"></el-color-picker>
                <div class="reset" @click="labelColor">重置</div>
            </div>
        </div>
        <!-- 默认颜色 -->
        <div class="background">
        <div >选中颜色:</div>
            <div class="btn">
                <el-color-picker v-model="checkedColors"></el-color-picker>
                <div class="reset" @click="checkedColor">重置</div>
            </div>
        </div>
    </div>
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
    <!-- 商品间距： -->
    <div class="setSpaceBetweenRadius">
      <div class="radius">商品间距：</div>
      <div class="block">
        <el-slider v-model="spaceBetweenRadius" show-input :max="10"></el-slider>
      </div>
    </div>
    <!-- 商品宽度： -->
    <div class="setWideRadius">
      <div class="radius">商品宽度：</div>
      <div class="block">
        <el-slider v-model="wideRadius" show-input :max="50"></el-slider>
      </div>
    </div>
    <!-- 商品内间距 -->
    <div class="setWideRadius">
      <div class="radius">商品内间距：</div>
      <div class="block">
        <el-slider v-model="commodityRadius" show-input :max="50"></el-slider>
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

    <!-- 图文内容1 -->
    <div class="setImageTextCentent" v-if="changeTemplateImg1">
      <div class="imageTextCentent">图文内容</div>
      <div class="pictureList">
        <!-- 上传图片 -->
        <div class="uploading" @click="addPicture(1)">
          <div>+添加商品标签</div>
        </div>
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
    <!-- 图文内容2 -->
    <div class="setImageTextCentent" v-if="changeTemplateImg2">
      <div class="imageTextCentent">图文内容2</div>
      <div class="pictureList">
        <!-- 上传图片 -->
        <div class="uploading" @click="addPicture(1)">
          <div>+添加商品标签</div>
        </div>
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
            <div class="title">
              <span>标题：</span>
              <el-input placeholder="请输入内容" v-model="titleInput" clearable></el-input>
            </div>
            <div class="price">
              <span>价格：</span>
              <el-input placeholder="请输入内容" v-model="priceInput" clearable></el-input>
            </div>
            <span @click="dialogLIink = true">编辑内容</span>
            <!-- <el-button type="info" @click="dialogNewLIink(i)">编辑内容2</el-button> -->
          </div>
          <div class="del" @click="delElement(i)"></div>
        </div>
        <!-- 链接的对话框 -->
        <el-dialog title="选择链接" :visible.sync="dialogLIink" v-if="dialogLIink" width="70%" center>
          <!-- 中间主体部分 -->
          <Link ref="newOrderDetail" />
          <!-- 页脚 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogLIink = false">取 消2</el-button>
            <el-button type="primary" @click="dialogLIink = false">确 定2</el-button>
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
    <!-- 图文内容3 -->
    <div class="setImageTextCentent" v-if="changeTemplateImg3">
      <div class="imageTextCentent">图文内容3</div>
      <div class="pictureList">
        <!-- 上传图片 -->
        <div class="uploading" @click="addPicture(1)">
          <div>+添加商品标签</div>
        </div>
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
            <div class="title">
              <span>标题：</span>
              <el-input placeholder="请输入内容" v-model="titleInput" clearable></el-input>
            </div>
            <div class="price">
              <span>价格：</span>
              <el-input placeholder="请输入内容" v-model="priceInput" clearable></el-input>
            </div>
            <span @click="dialogLIink = true">编辑内容3</span>
            <!-- <el-button type="info" @click="dialogNewLIink(i)">编辑内容2</el-button> -->
          </div>
          <div class="del" @click="delElement(i)"></div>
        </div>
        <!-- 链接的对话框 -->
        <el-dialog title="选择链接" :visible.sync="dialogLIink" v-if="dialogLIink" width="70%" center>
          <!-- 中间主体部分 -->
          <Link ref="newOrderDetail" />
          <!-- 页脚 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogLIink = false">取 消2</el-button>
            <el-button type="primary" @click="dialogLIink = false">确 定2</el-button>
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
      commodityBackgroundColor:'',//商品背景色
      nameColor:'',//名称颜色
      priceColors:'',//价格颜色
      labelColors:'',//默认标签颜色
      checkedColors:'',//选中颜色
      radius: 0, //图片圆角设置
      oneRadius: 0, //单个圆角
      backgroundRadius: 0, //背景圆角
      margin: 0, //外边距
      padding: 0, //内边距
      pictureItemList: ["1"],
      num: 1,
      dialogImageUrl: "",
      dialogVisible: false,
      dialogLIink: false,
      centerDialogVisible: false, //上传图片
      changeTemplateImg1: true, //图片的选择样式
      changeTemplateImg2: false, //图片的选择样式
      changeTemplateImg3: false, //图片的选择样式
      titleInput: "", //标题框内容
      priceInput: "", //价格框内容
      spaceBetweenRadius:0,//商品间距
      wideRadius:0,//商品宽度
      commodityRadius:0,//s商品内间距
    };
  },
  methods: {
    // 点击重置背景颜色
    resetBackgroundColor() {
      this.backgroundColor = "";
    },
    // 商品背景颜色
    resetcommodityBackgroundColor() {
      this.commodityBackgroundColor = "";
    },
    // 名称颜色
    resetnameColor() {
      this.nameColor = "";
    },
    // 价格颜色
    resetpriceColor() {
      this.priceColors = "";
    },
    // 标签默认颜色
    labelColor(){
        this.labelColors = "";
    },
    // 标签选中颜色
    checkedColor(){
        this.checkedColors = "";
    },
    // 单个
    setoneBackgroundColor() {
      this.oneBackgroundColor = "";
    },
    // 标题
    setTitleBackgroundColor() {
      this.titleBackgroundColor = "";
    },
    // 价格
    setPriceBackgroundColor() {
      this.priceBackgroundColor = "";
    },
    // 编辑内容（链接）
    dialogNewLIink(e) {
      this.dialogLIink = true;
      console.log(e);
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
    // 点击添加图片
    addPicture(i) {
      this.num = this.num + i;
      // console.log(i,this.num)
      this.pictureItemList.push(this.num);
    },
    // 选择模板
    changeTemplate(i) {
      if (i == 1) {
        this.changeTemplateImg1 = true;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = false;
        this.pictureItemList = ["1"];
      } else if (i == 2) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = true;
        this.changeTemplateImg3 = false;
        this.pictureItemList = ["1", "2", "3"];
      } else {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = true;
        this.pictureItemList = ["1", "2"];
      }
    }
  },
  watch: {
    // 监听默认地址背景颜色改变事件
    backgroundColor() {
      this.$emit("getData", this.backgroundColor, "标签商品");
    },
    // 商品背景色
    commodityBackgroundColor(){
        this.$emit("getCommodityData", this.commodityBackgroundColor, "标签商品");
    },
    // 单个圆角
    oneRadius() {
      this.$emit("oneRadius", this.oneRadius, "标签商品");
    },
    // 背景圆角
    backgroundRadius() {
      this.$emit("backgroundRadius", this.backgroundRadius, "标签商品");
    },
    // 监听外边距
    margin() {
      this.$emit("margin", this.margin, "标签商品");
    },
    // 监听内边距
    padding() {
      this.$emit("padding", this.padding, "标签商品");
    }
  }
};
</script>

<style lang="less" scoped>
.labelCommodity {
  height: 880px;
  overflow-y: auto;
  .labelCommodityTop {
    background-color: #eee;
  }
  .setTemplate {
    .template {
      background-color: #ccc;
    }
    .bolck {
      display: flex;
      justify-content: space-around;
      .one {
        cursor: pointer;
        padding: 5px;
      }
      .one:hover {
        background-color: #eee;
      }
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
  .setRadius,
  .setMargin,
  .setPadding,
  .setOneRadius,.setBackgroundRadius,.setSpaceBetweenRadius,.setWideRadius {
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
  .pictureList {
    padding: 0 10px;
    height: 240px;
    // overflow-y: auto;
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
        // line-height: 148px;
        flex-direction: column;
        color: #31708f;
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
  .uploading {
    cursor: pointer;
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