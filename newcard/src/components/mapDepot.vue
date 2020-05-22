<template>
  <div>
    <!-- 点击新增分组 -->
    <el-dialog width="30%" title="新增分组" :visible.sync="addGrouping" append-to-body center>
      <el-input placeholder="请输入内容" v-model="addGroupingName" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGrouping = false">取 消</el-button>
        <el-button type="primary" @click="addGroupingFromList(1)">确 定</el-button>
      </span>
    </el-dialog>
    <div class="imgsList">
      <div class="imgsListTab">
        <div class="groupingList">
          <span>图片分组</span>
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
          <!-- 上传图片 -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
          >
            <!-- :file-list="fileList" -->
            <el-button type="primary">上传图片</el-button>
          </el-upload>
          <div>
            <el-input placeholder="请输入内容" v-model="searchInput" clearable></el-input>
            <el-button type="primary">搜索</el-button>
          </div>
        </div>
        <!-- 中间展示区 -->
        <div class="centerImgList">
          <div class="imgsListsShow">
            <img v-for="(i,k) in imagesList" :key="k" id="i.id" :src="i.url" alt  @click="selectPrint(i,k)"  ref="pictureUrl" v-bind:class='{bg:k==isactive}'  :index='k' />
            <!-- <img src="../assets/imgs/login.png" /> -->
          </div>
        </div>
        <!-- 底部分页 -->
        <div class="footerPaging">
          <div>共{{ pagers }}条</div>
          <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      searchInput: "", //搜索图片框
      pagers: 10, //图片数量
      isactive:0,
      imagesList: [
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314020&di=c704776db54e44c01ccd4f006a04090f&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190508%2F19%2F1557313363-hKmMzHUxPj.jpg", id: 1 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868313881&di=4873bca5cf12ae9a86c738f9d7d8d036&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190324%2F17%2F1553419572-MTKUiPedpQ.jpeg", id: 2 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868336747&di=69504e1624b89f6c32eb57d95a453c6e&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3416193591%2C1286732188%26fm%3D214%26gp%3D0.jpg", id: 3 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314023&di=e302bfb9948dd4567e8fcfca6c1b86c2&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20191101%2F23%2F1572622192-OcRVLodZxP.jpg", id: 4 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314022&di=3952a99b4b9be52929f6f3b613819c7d&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180830%2F18%2F1535625449-XrFcLQYkws.jpg", id: 5 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314022&di=fb29837451f213b6e21e53afaeaded32&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181007%2F15%2F1538896650-cXJKpwZjxn.jpg", id: 6 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314022&di=1f986584c807f42c3661c0ffaf98f152&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190713%2F17%2F1563009296-jWsbqHcZUd.jpg", id: 7 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314021&di=e2d7cf45ad5195ae874ad234414b3852&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180801%2F23%2F1533137118-djyIOrVWCZ.jpg", id: 8 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314021&di=0c5b9316f7e5dca3e3ad8330e09dc1c5&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F54781ec539af8.jpg", id: 9 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314021&di=852c6d2faec66ee1c41c34536ed0fc29&imgtype=0&src=http%3A%2F%2Fwww.2qqtouxiang.com%2Fpic%2FPF7876_02.jpg", id: 10 },
        { url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589868314020&di=de5fb5854b307c0e00e4a627430f965f&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180802%2F00%2F1533141821-HnkwUcFiZB.jpg", id: 11 }
      ],
      groupingList: [
        { id: 1, name: "全部分组" },
        { id: 2, name: "未分组" }
      ], //分组列表
      addGrouping: false,
      addGroupingName: "",
      pictureUrl:''
    };
  },
  methods: {
    // 点击上传图片
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    addGroupingFromList(e) {
      this.addGrouping = false;
      this.groupingList.push({
        name: this.addGroupingName,
        id: this.groupingList.length + 1 + e
      });
    },
    selectPrint(i,k){
      // console.log(i.url)
      // console.log(k)
      this.pictureUrl = i.url
      this.isactive=k
    }
  },
  watch:{
    pictureUrl(){
      // console.log(this.pictureUrl)
      this.$emit('setPicture',this.pictureUrl,'图片地址')
    }
  }
};
</script>

<style lang="less" scoped>
.pictureList {
  padding: 0 10px;
  height: 260px;
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
        margin-top: 20px;
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
      width: 650px;
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
      .bg{
        background-color: #ccc;
    }
    }
  }
}
.footerPaging {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  div {
    line-height: 30px;
  }
}
</style>