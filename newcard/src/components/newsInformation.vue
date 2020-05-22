<template>
  <div class="newsInformation">
    <div class="redact">新闻编辑</div>
    <div class="selectSource">选择来源:</div>
    <div class="source">
      <el-radio v-model="radio" label="1" @change='change(1)'>在新闻库选择</el-radio>
      <el-radio v-model="radio" label="2" @change='change(2)'>全部新闻</el-radio>
    </div>
    <!-- 背景色 -->
    <div class="background">
      <div>背景色:</div>
      <div class="btn">
        <el-color-picker v-model="backgroundColor" ref="defultBackgroundColor"></el-color-picker>
        <!-- <colorPicker v-model="backgroundColor"  ref="defultBackgroundColor"></colorPicker>  -->
        <div class="reset" @click="resetBackgroundColor">重置</div>
      </div>
    </div>
    <!-- 提示 -->
    <div class="hint">前端默认展示3条，大于3条时，需点击【查看更多】跳转到勾选的所有新闻界面</div>
    <!-- 内容 -->
    <div class="center" v-show="radio == '1'">
      <div>内容：</div>
      <el-button type="info" @click="dialogFormVisible = true">选择文章</el-button>
    </div>
    <!-- 要显示的新闻 -->
    <div class="centerContent" v-if="multipleSelection.length >0 && radio == '1'">
      <div class="content" v-for="(i,k) in newList" :key="k" :index="k">
        <span>测试文字 {{i.name}}</span>
        <div class="del" @click="delElement(i)"></div>
      </div>
      <!-- 删除 -->
      <div class="del" @click="delElementAll()"></div>
    </div>
    <el-dialog title="选择新闻" :visible.sync="dialogFormVisible" width="70%" top="5vh">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth">
          <div class="search">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            <el-button type="info">搜索</el-button>
          </div>
          <div class="table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="默认图" width="80" align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.url" alt style="height:40px" />
                </template>
              </el-table-column>
              <el-table-column prop="name" label="标题" align="center"></el-table-column>
              <el-table-column width="150" label="时间" align="center">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>

      <!-- 底部分页 -->
      <div class="footerPaging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="20"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmTable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1", //选择来源的按钮
      backgroundColor: "", //背景默认颜色
      dialogFormVisible: false,
      form: {
        name: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "80px",
      tableData: [
        {
          checked: true,
          date: "2016-05-02",
          name: "王小",
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314020&di=c704776db54e44c01ccd4f006a04090f&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190508%2F19%2F1557313363-hKmMzHUxPj.jpg"
        },
        {
          checked: true,
          date: "2016-05-04",
          name: "王小虎",
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868313881&di=4873bca5cf12ae9a86c738f9d7d8d036&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190324%2F17%2F1553419572-MTKUiPedpQ.jpeg"
        },
        {
          checked: true,
          date: "2016-05-01",
          name: "王小豹",
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868336747&di=69504e1624b89f6c32eb57d95a453c6e&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3416193591%2C1286732188%26fm%3D214%26gp%3D0.jpg"
        },
        {
          checked: true,
          date: "2016-05-03",
          name: "王小明",
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314023&di=e302bfb9948dd4567e8fcfca6c1b86c2&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20191101%2F23%2F1572622192-OcRVLodZxP.jpg"
        },
        {
          checked: true,
          date: "2016-05-03",
          name: "王小花",
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314021&di=0c5b9316f7e5dca3e3ad8330e09dc1c5&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F54781ec539af8.jpg"
        }
      ],
      multipleSelection: [],
      currentPage: 1, //当前页
      newList:[]//新闻列表
    };
  },
  methods: {
    // 点击背景颜色
    resetBackgroundColor() {
      // 重置默认背景颜色
      this.backgroundColor = "";
      this.$refs.defultBackgroundColor.color.value = this.backgroundColor;
      this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor = this.backgroundColor;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 点击全部新闻和选择新闻
    change(i){
        if(i == 2){         
            this.newList = this.tableData
            if(this.multipleTable){
                this.$refs.multipleTable.clearSelection()
            }
            // console.log(this.newList)clearSelection
        }else{
            this.newList =  []
            this.multipleSelection =  []
        }
    },
    toggleSelection(row) {
      this.$refs.multipleTable.toggleRowSelection(row ,false) ;
      this.newList = this.multipleSelection
    },
    // 点击全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    //   console.log(val);
    },
    // 点击确定
    confirmTable() {
    //   console.log(this.multipleSelection);
      this.dialogFormVisible = false;
      this.newList = this.multipleSelection
    },
    // 点击删除
    delElement(item) {
        this.toggleSelection(item)
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i] == item) {
          this.multipleSelection.splice(i, 1);
          this.newList = this.multipleSelection
          return ;
        }
      }
      
    },
    // 点击内容中的删除所有按钮
    delElementAll() {
      this.$refs.multipleTable.clearSelection()
      this.newList = this.multipleSelection
    }
  },
  watch: {
    // 监听默认地址背景颜色改变事件
    backgroundColor() {
      this.$emit("getData", this.backgroundColor, "新闻资讯");
    },
    // 监听选中的数组的变化
    newList(){
        this.$emit('multipleSelectionList',this.newList,'新闻资讯')
    },
  }
};
</script>

<style lang="less" scoped>
.newsInformation {
  text-align: center;
  .selectSource {
    background-color: #eee;
  }
  .background,
  .center {
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
  .hint {
    font-size: 14px;
    color: #606266;
  }
  .center {
    margin-top: 30px;
  }
  .search {
    display: flex;
    button {
      margin-left: 30px;
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  .footerPaging {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    div {
      line-height: 30px;
    }
  }
  .centerContent {
    border: 1px solid #ccc;
    min-height: 100px;
    width: 350px;
    border-radius: 2px;
    position: relative;
    padding: 10px 0;
    text-align: center;
    margin: 15px 20px 10px;
    .content {
      border: 1px solid #ccc;
      min-height: 30px;
      line-height: 30px;
      font-size: 13px;
      color: #999;
      text-align: left;
      position: relative;
      padding: 10px;
      margin-top: 10px;
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
  .centerContent:hover {
    .del {
      display: block;
    }
  }
}
</style>