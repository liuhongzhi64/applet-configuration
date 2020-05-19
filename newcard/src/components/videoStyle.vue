<template>
    <div class="video">
        <div class="videoTop">视频编辑</div>
        <div class="dialog">
            <el-button type="primary" @click="centerDialogVisible = true">点击上传</el-button>
            <div>仅限mp4格式且大小应不超过200MB</div>
        </div>
   <!-- 图片列表 -->
        <el-dialog
            title="视频库"
            :visible.sync="centerDialogVisible"
            width="860px"
            center
            top="8vh"
        >
            <!-- 点击新增分组 -->
            <el-dialog
                width="30%"
                title="新增分组"
                :visible.sync="addGrouping"
                append-to-body>
                <el-input
                    placeholder="请输入内容"
                    v-model="addGroupingName"
                    clearable>
                </el-input>
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
                        <el-button v-for="i in groupingList" :key="i.id" :class="{'allGrouping':i.name === '全部分组'}">{{ i.name }}</el-button>
                    </div>
                    <el-button class="addGrouping" @click="addGrouping = true">+新建分组</el-button>
                </div>
                <!-- 列表 -->
                <div class="imgsLists">
                    <!-- 头部搜索款 -->
                    <div class="imsListsSearch">
                        <!-- 上传图片 -->
                        <!-- <el-button type="primary">上传图片</el-button> -->
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-change="handleChange"
                            >
                            <!-- :file-list="fileList" -->
                            <el-button  type="primary" @click="addGrouping = false">上传视频</el-button>
                        </el-upload>
                        <div>
                            <el-input
                            placeholder="请输入视频名称"
                            v-model="searchInput"
                            clearable>
                            </el-input>
                            <el-button type="primary">搜索</el-button>
                        </div>
                    </div>
                    <!-- 中间展示区 -->
                    <div class="centerImgList">
                        <div class="imgsListsShow">
                            <img v-for="i in imagesList" :key="i.id" :src="i.url" alt="">
                        </div>
                    </div>
                    <!-- 底部分页 -->
                    <div class="footerPaging">
                        <div>共{{ pagers }}条</div>
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="100">
                        </el-pagination>
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
                centerDialogVisible: false,//默认设置的点击背景图片的开关 
                searchInput:'',//搜索图片框
                pagers:10,//图片数量
                imagesList:[
                    {url:'/img/login.d3c4bad8.png',id:1},
                ],
                groupingList:[
                    {id:1,name:'全部分组'},
                    {id:2,name:'未分组'},
                ],//分组列表
                addGrouping:false,
                addGroupingName:'',
            };
        },
        methods: {
            //鼠标单击的事件
            onClick(e, editor) {
                console.log(e.target.innerHTML)
                console.log(editor)
            },
            //清空内容
            clear() {
                this.$refs.editor.clear()
            },
            addGroupingFromList(e){
                this.addGrouping = false
                // console.log(this.groupingList.push({name:this.addGroupingName,id:this.groupingList.length+1+e}))
                this.groupingList.push({name:this.addGroupingName,id:this.groupingList.length+1+e})
            },
            // 点击上传图片
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
            },
        },
    }
</script>

<style lang="less" scoped>
.video{
    .videoTop{
        background-color: #ccc;
        text-align: center;
    }
    .dialog{
        padding-top:20px;
        div{
            font-size: 12px;
            color: #606266;
            margin-top: 7px;
        }
    }
    .imgsList{ 
            display: flex;
            flex-direction: row ;
            .imgsListTab{
                display: flex;
                width: 140px;
                height: 400px;
                flex-direction:column;
                text-align: center;
                .groupingList{
                    height: 100%;
                    button{
                        margin-top: 20px;
                        width: 120px;
                    }
                    .allGrouping{
                        margin-left: 10px;
                    }
                }
               
                .addGrouping{
                    margin-right: 5px;
                    margin-left: 20px;
                    margin-top: 10px;
                }
            }
            .imgsLists{
                flex: 1;
                display: flex;
                flex-direction:column;
                .imsListsSearch{
                    display: flex;
                    justify-content: space-between;
                    input{
                        width: 120px;
                    }
                    div{
                        display: flex;
                        button{
                            margin-left: 10px;
                        }
                    }
                }
                .centerImgList{
                    flex: 1;
                    // width: 650px;
                    .imgsListsShow{
                        img{
                            margin-top: 10px;
                            margin-right: 12px;
                            width: 80px;
                            height:80px;
                            padding: 20px;
                        }
                        img:hover{
                            background-color: #ccc;
                        }
                    }
                }
                .footerPaging{
                    display: flex;
                    justify-content: flex-end;
                    div{
                        line-height: 30px;
                    }
                }
            }
    }
}
</style>