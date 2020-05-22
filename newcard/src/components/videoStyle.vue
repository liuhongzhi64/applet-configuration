<template>
  <div class="video">
    <div class="videoTop">视频编辑</div>
    <div class="dialog">
      <el-button type="primary" @click="centerDialogVisible = true">点击上传</el-button>
      <div>仅限mp4格式且大小应不超过200MB</div>
    </div>
    <!-- 图片列表 -->
    <el-dialog title="视频库" :visible.sync="centerDialogVisible" width="860px" center top="8vh">
      <!-- 点击新增分组 -->
      <el-dialog width="30%" title="新增分组" :visible.sync="addGrouping" append-to-body>
        <el-input placeholder="请输入内容" v-model="addGroupingName" clearable></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addGrouping = false">取 消</el-button>
          <el-button type="primary" @click="addGroupingFromList(1)">确 定</el-button>
        </span>
      </el-dialog>
      <div class="imgsList">
        <div class="imgsListTab">
          <div class="groupingList">
            <span>视频分组</span>
            <!-- <el-button class="allGrouping">全部分组</el-button> -->
            <el-button
              v-for="i in groupingList"
              :key="i.id"
              :class="{'allGrouping':i.name === '全部分组'}"
            >{{ i.name }}</el-button>
          </div>
          <el-button class="addGrouping" @click="addGrouping = true">+新建分组</el-button>
        </div>
        <!-- 列表 -->
        <div class="imgsLists">
          <!-- 头部搜索款 -->
          <div class="imsListsSearch">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
            >
              <el-button type="primary" @click="addGrouping = false">上传视频</el-button>
            </el-upload>
            <div>
              <el-input placeholder="请输入视频名称" v-model="searchInput" clearable></el-input>
              <el-button type="primary">搜索</el-button>
            </div>
          </div>
          <!-- 中间展示区 -->
          <div class="centerImgList">
            <div class="imgsListsShow">
              <img
                v-for="(i,k) in imagesList"
                :key="k"
                :src="i.url"
                alt
                @click="selectPrint(i,k)"
                ref="pictureUrl"
                v-bind:class="{bg:k==isactive}"
                :index='k'
              />
            </div>
          </div>
          <!-- 底部分页 -->
          <div class="footerPaging">
            <div>共{{ pagers }}条</div>
            <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
          </div>
        </div>
      </div>
      <!-- 确定和取消按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false, //默认设置的点击背景图片的开关
      searchInput: "", //搜索图片框
      pagers: 10, //图片数量
      imagesList: [
        {
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314020&di=c704776db54e44c01ccd4f006a04090f&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190508%2F19%2F1557313363-hKmMzHUxPj.jpg",
          id: 1
        },
        {
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868313881&di=4873bca5cf12ae9a86c738f9d7d8d036&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190324%2F17%2F1553419572-MTKUiPedpQ.jpeg",
          id: 2
        },
        {
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868336747&di=69504e1624b89f6c32eb57d95a453c6e&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3416193591%2C1286732188%26fm%3D214%26gp%3D0.jpg",
          id: 3
        }
      ],
      groupingList: [
        { id: 1, name: "全部分组" },
        { id: 2, name: "未分组" }
      ], //分组列表
      addGrouping: false,
      addGroupingName: "",
      pictureUrl: "",
      isactive: 0
    };
  },
  methods: {
    addGroupingFromList(e) {
      this.addGrouping = false;
      this.groupingList.push({
        name: this.addGroupingName,
        id: this.groupingList.length + 1 + e
      });
    },
    // 点击上传视频
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    selectPrint(i, k) {
      this.pictureUrl = i.url;
      this.isactive = k;
    }
  }
};
</script>

<style lang="less" scoped>
.video {
  .videoTop {
    background-color: #ccc;
    text-align: center;
  }
  .dialog {
    padding-top: 20px;
    div {
      font-size: 12px;
      color: #606266;
      margin-top: 7px;
    }
  }
  .imgsList {
    display: flex;
    flex-direction: row;
    .imgsListTab {
      display: flex;
      width: 140px;
      height: 400px;
      flex-direction: column;
      text-align: center;
      .groupingList {
        height: 100%;
        button {
          margin-top: 20px;
          width: 120px;
        }
        .allGrouping {
          margin-left: 10px;
        }
      }

      .addGrouping {
        margin-right: 5px;
        margin-left: 20px;
        margin-top: 10px;
      }
    }
    .imgsLists {
      flex: 1;
      display: flex;
      flex-direction: column;
      .imsListsSearch {
        display: flex;
        justify-content: space-between;
        input {
          width: 120px;
        }
        div {
          display: flex;
          button {
            margin-left: 10px;
          }
        }
      }
      .centerImgList {
        flex: 1;
        .imgsListsShow {
          img {
            margin-top: 10px;
            margin-right: 12px;
            padding: 25px;
            width: 100px;
            height: 100px;
          }
        }
        img:hover {
          background-color: #ccc;
        }
        .bg {
          background-color: #ccc;
        }
      }
      .footerPaging {
        display: flex;
        justify-content: center;
        div {
          line-height: 30px;
        }
      }
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
}
</style>