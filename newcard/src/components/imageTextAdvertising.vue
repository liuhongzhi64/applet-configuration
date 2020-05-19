<template>
  <div class="imageTextAdvertising">
    <div class="imageTextAdvertisingTop">图文广告编辑</div>
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
          <img src="../assets/imgs/imageTextOne.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(2)"
          :style="{'border': (changeTemplateImg2 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/imageTextTwo.png" alt />
        </div>
        <div
          class="one"
          @click="changeTemplate(3)"
          :style="{'border': (changeTemplateImg3 ? '1px dashed rgb(90, 136, 235)' : '1px solid #fff')}"
        >
          <img src="../assets/imgs/imageTextThree.png" alt />
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
    <!-- 图片圆角设置 -->
    <div class="setRadius">
      <div class="radius">图片圆角设置：</div>
      <div class="block">
        <el-slider v-model="radius" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 单个圆角 -->
    <div class="setOneRadius">
      <div class="radius">单个圆角设置：</div>
      <div class="block">
        <el-slider v-model="oneRadius" show-input :max="100"></el-slider>
      </div>
    </div>
    <!-- 背景圆角 -->
    <div class="setBackgroundRadius">
      <div class="radius">背景圆角设置：</div>
      <div class="block">
        <el-slider v-model="backgroundRadius" show-input :max="100"></el-slider>
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
    <!-- 单个背景色 -->
    <div class="oneBackgroundColor">
      <div>单个背景色:</div>
      <div class="btn">
        <el-color-picker v-model="oneBackgroundColor"></el-color-picker>
        <div class="reset" @click="setoneBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 标题颜色 -->
    <div class="titleBackgroundColor" v-if="changeTemplateImg2||changeTemplateImg3">
      <div>标题颜色:</div>
      <div class="btn">
        <el-color-picker v-model="titleBackgroundColor"></el-color-picker>
        <div class="reset" @click="setTitleBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 价格颜色 -->
    <div class="priceBackgroundColor" v-if="changeTemplateImg2||changeTemplateImg3">
      <div>价格颜色:</div>
      <div class="btn">
        <el-color-picker v-model="priceBackgroundColor"></el-color-picker>
        <div class="reset" @click="setPriceBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 图文内容1 -->
    <div class="setImageTextCentent" v-if="changeTemplateImg1">
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
            <div class="setCenter">链接： <el-button type="info" @click="dialogNewLIink(i)">编辑内容</el-button> </div>      
          </div>
          <div class="del" @click="delElement(i)"></div>
        </div>
        <!-- 上传图片 -->
        <div class="uploading" @click="addPicture(1)">
          <div>+添加一个图文广告</div>
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
            <div class="title"> <span>标题：</span> <el-input placeholder="请输入内容" v-model="i.titleInput" @input="titleInput(i.titleInput)" clearable></el-input></div>
            <div class="price"><span>价格：</span><el-input placeholder="请输入内容" v-model="i.priceInput" @input="titleInput(i.priceInput)" clearable></el-input></div>
            <span @click="dialogLIink = true">编辑内容</span>
            <!-- <el-button type="info" @click="dialogNewLIink(i)">编辑内容2</el-button> -->
          </div>
          <div class="del" @click="delElement(i)"></div>
        </div>
        <!-- 上传图片 -->
        <div class="uploading" @click="addPicture(1)">
          <div>+添加一个图文广告</div>
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
      <div class="imageTextCentent">图文内容2</div>
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
            <div class="title"> <span>标题：</span> <el-input placeholder="请输入内容" v-model="i.titleInput" clearable></el-input></div>
            <div class="price"><span>价格：</span><el-input placeholder="请输入内容" v-model="i.priceInput" clearable></el-input></div>
            <span @click="dialogLIink = true">编辑内容3</span>
            <!-- <el-button type="info" @click="dialogNewLIink(i)">编辑内容2</el-button> -->
          </div>
          <div class="del" @click="delElement(i)"></div>
        </div>
        <!-- 上传图片 -->
        <div class="uploading" @click="addPicture(1)">
          <div>+添加一个图文广告</div>
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
      oneBackgroundColor: "", //单个背景
      titleBackgroundColor: "#000", //标题颜色
      priceBackgroundColor: "#000", //价格颜色
      radius: 0, //图片圆角设置
      oneRadius: 0, //单个圆角
      backgroundRadius: 0, //背景圆角
      margin: 0, //外边距
      padding: 0, //内边距
      dialogImageUrl: "",
      dialogVisible: false,
      centerDialogVisible: false, //上传图片
      // pictureItemLists: [],
      pictureItemList: [],
      pictureItemLists: [
        // {num:1,titleInput:'',priceInput:''}
      ],
      num: 1,
      dialogLIink: false,
      changeTemplateImg1: true, //图片的选择样式
      changeTemplateImg2: false, //图片的选择样式
      changeTemplateImg3: false, //图片的选择样式
      titleInputs:'',//标题框1内容
      titleInput1:'',//标题框1内容
      priceInput1:'',//价格框1内容
      titleInput2:'',//标题框2内容
      priceInput2:'',//价格框2内容
      titleInput3:'',//标题框2内容
      priceInput3:'',//价格框2内容
      changeTemplateImg:1,//模板
    };
  },
  methods: {
    // 点击重置背景颜色
    resetBackgroundColor() {
      this.backgroundColor = "";
    },
    // 单个
    setoneBackgroundColor() {
      this.oneBackgroundColor = "";
    },
    // 标题
    setTitleBackgroundColor() {
      this.titleBackgroundColor = "#000";
    },
    // 价格
    setPriceBackgroundColor() {
      this.priceBackgroundColor = "#000";
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
      this.pictureItemList.push({num:this.num,titleInput:'',priceInput:''});
    },
    // 选择模板
    changeTemplate(i) {
      if (i == 1) {
        this.changeTemplateImg1 = true;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg = 1
        this.pictureItemList = [{num:1,titleInput:'',priceInput:''}]
      } else if (i == 2) {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = true;
        this.changeTemplateImg3 = false;
        this.changeTemplateImg = 2
        this.pictureItemList = [{num:1,titleInput:'',priceInput:''},{num:1,titleInput:'',priceInput:''}]
      } else {
        this.changeTemplateImg1 = false;
        this.changeTemplateImg2 = false;
        this.changeTemplateImg3 = true;
        this.changeTemplateImg = 3
        this.pictureItemList = [{num:1,titleInput:'',priceInput:''},{num:1,titleInput:'',priceInput:''},{num:1,titleInput:'',priceInput:''}]
      }
    },
    titleInput(i){
      for(let a = 0 ; a<this.pictureItemList.length;a++){
        console.log(this.pictureItemList[a],i)
      }
        // this.pictureItemLists = this.pictureItemList
        console.log(this.pictureItemList)
        // console.log(this.pictureItemLists)
      // this.titleInput1 = i
      // this.pictureItemList = [{num:1,titleInput:i,priceInput:''},{num:1,titleInput:0,priceInput:''}]
    },
  },
  watch: {
    backgroundColor() {
      this.$emit("getData", this.backgroundColor, "图文广告");
    },
    oneBackgroundColor(){
      this.$emit('onebackgroundColor',this.oneBackgroundColor,'图文广告')
    },
    // 监听圆角改变
    radius() {
      // console.log(123456789)
      this.$emit("radius", this.radius, "图文广告");
    },
    // 单个圆角
    oneRadius() {
      this.$emit("oneRadius", this.oneRadius, "图文广告");
    },
    // 背景圆角
    backgroundRadius() {
      this.$emit("backgroundRadius", this.backgroundRadius, "图文广告");
    },
    // 监听外边距
    margin() {
      this.$emit("margin", this.margin, "图文广告");
    },
    // 监听内边距
    padding() {
      this.$emit("padding", this.padding, "图文广告");
    },
    // 监听模板样式
    changeTemplateImg(){
      this.$emit("changeTemplate", this.changeTemplateImg, "图文广告");
      // console.log(this.changeTemplateImg)
    },
    // 标题框内容
    pictureItemLists(){
      this.$emit("titleInput", this.pictureItemLists, "图文广告");
    },
    titleInput(){
      console.log(this.titleInput)
    },
    // 标题颜色
    titleBackgroundColor(){
      this.$emit("setTitleColor", this.titleBackgroundColor, "图文广告");
    },
    // 价格颜色
    priceBackgroundColor(){
      this.$emit("setPriceColor", this.priceBackgroundColor, "图文广告");
    },
  }
};
</script>

<style lang="less" scoped>
.imageTextAdvertising {
  height: 880px;
  overflow-y: auto;
  .imageTextCentent {
    background-color: #ccc;
    margin-bottom: 5px;
  }
  .background,
  .color,
  .oneBackgroundColor ,.titleBackgroundColor,.priceBackgroundColor{
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
  .setBackgroundRadius {
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
        .title,.price{
          display: flex;
          margin: 5px 0;
          span{
            width: 30%;
            line-height: 40px;
          }
        }
        span{
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