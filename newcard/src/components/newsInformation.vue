<template>
    <div class="newsInformation">
        <div class="redact">新闻编辑</div>
        <div class="selectSource">选择来源:</div>
        <div class="source">
            <el-radio v-model="radio" label="1">在新闻库选择</el-radio>
            <el-radio v-model="radio" label="2">全部新闻</el-radio>
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
        <el-dialog title="选择新闻" :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="form">
                <el-form-item :label-width="formLabelWidth">
                    <div class="search">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                        <el-button type="info">搜索</el-button>
                    </div>
                    <div class="table">
                          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                            <el-table-column  type="selection" width="55">
                            </el-table-column>
                            <el-table-column label="默认图" width="150">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column  prop="name" label="标题">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                radio: '1',//选择来源的按钮
                backgroundColor: '#ccc',//背景默认颜色
                dialogFormVisible: false,
                form: {
                name: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
                },
                formLabelWidth: '80px',
                tableData: [{
                    checked: true,
                    date: '2016-05-02',
                    name: '王小虎',
                    }, {
                    checked: true,
                    date: '2016-05-04',
                    name: '王小虎',
                    }, {
                    checked: true,
                    date: '2016-05-01',
                    name: '王小虎',
                    }, {
                    checked: true,
                    date: '2016-05-03',
                    name: '王小虎'
                }],
                multipleSelection: [],
            };
        },
        methods:{
            // 点击背景颜色
            resetBackgroundColor(){
                // 重置默认背景颜色
                this.backgroundColor = "#ccc"
                this.$refs.defultBackgroundColor.color.value = this.backgroundColor
                // console.log(this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor)
                this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor = this.backgroundColor
            },
            // 点击全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        watch:{
        // 监听默认地址背景颜色改变事件
            backgroundColor(){
                console.log(this.backgroundColor)
                console.log(this.$refs.defultBackgroundColor.color.value)
                this.$emit('getData',this.backgroundColor,'新闻资讯')
            },
        },
    }
</script>

<style lang="less" scoped>
.newsInformation{
    text-align: center;
    .selectSource{
        background-color: #eee;
    }
    .background,.center{
        margin-top: 5px;
        display: flex;
        justify-content: flex-start;
        div{
            width: 90px;
            line-height: 40px;
        }
        .el-input{
            width: 80%;
        }
        .btn{
            height: 40px;
            display: flex;
            justify-content: center;
            width: 100%;
            color: #2692ff;
            .m-colorPicker{
                height: 40px;
                padding: 12px 0;
                .colorBtn{
                     width: 40px;
                    height: 40px;
                    }
                }
            .reset{
                width: 30%;
                cursor: pointer;
            }
        }
    }
    .hint{
        font-size: 14px;
        color: #606266;
    }
    .center{
        margin-top: 30px;
    }
    .search{
        display: flex;
        button{
            margin-left: 30px;
        }
    }
}
</style>