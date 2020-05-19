<template>
    <div class="text">
        <div class="textTop">文本编辑</div>
        <!-- 背景色 -->
        <div class="background">
            <div>背景色:</div>
            <div class="btn">
                 <el-color-picker v-model="backgroundColor" ref="defultBackgroundColor"></el-color-picker>
                <div class="reset" @click="resetBackgroundColor">重置</div>
            </div>                   
        </div>
        <!-- 文本 -->
        <div class="texts">
            <div class="textConter">文本：</div>
            <div class="block">
                <el-input type="textarea" placeholder="请输入内容" v-model="textarea"  show-word-limit  rows='5'>
                </el-input>
            </div>
        </div>
        <!-- 字体大小 -->
        <div class="fontSize"> 
            <div class="size">字体大小:</div>
            <div class="block">
                <el-radio v-model="radio" label="1">大</el-radio>
                <el-radio v-model="radio" label="2">中</el-radio>
                <el-radio v-model="radio" label="3">小</el-radio>
            </div>
        </div>
        <!-- 字体颜色 -->
        <div class="color">
            <div class="textes">字体颜色:</div>
            <div class="btn">
                 <el-color-picker v-model="fontsColor"></el-color-picker>
                <div class="reset" @click="fontColor">重置</div>
            </div>
        </div>
        <!-- 加粗 -->
        <div class="strong">
            <div>是否加粗:</div>
                <div class="set-strong">
                    <el-switch
                    v-model="strong"
                    active-color="#2692ff"
                    inactive-color="#eee"
                    >
                    </el-switch>
                    <div v-bind:style="{'color': strong ?'#2692ff':'#606266'}">加粗</div>
                </div>
        </div>
        <!-- 显示位置 -->
        <div class="showSide">
            <div>显示位置:</div>
            <div class="block">
                <el-radio v-model="sideRadio" label="1">居左</el-radio>
                <el-radio v-model="sideRadio" label="2">居中</el-radio>
                <el-radio v-model="sideRadio" label="3">居右</el-radio>
            </div>
        </div>
        <!-- 圆角设置 -->
        <div class="setRadius">
            <div class="radius">圆角设置：</div>
            <div class="block">
                <el-slider
                v-model="radius"
                show-input
                :max=80>
                </el-slider>
            </div>
        </div>
        <!-- 外边距 -->
        <div class="setMargin">
            <div class="margin">外边距：</div>
            <div class="block">
                <el-slider
                v-model="margin"
                show-input
                :max=80>
                </el-slider>
            </div>
        </div>
        <!-- 内边距 -->
        <div class="setPadding">
            <div class="padding">内边距：</div>
            <div class="block">
                <el-slider
                v-model="padding"
                show-input
                :max=80>
                </el-slider>
            </div>
        </div>
        <!-- 链接 -->
        <div class="links">
            链接:
            <span  class="link" @click="dialogNewLIink">编辑内容</span>
        </div>
        <!-- 链接的对话框 -->
        <el-dialog
            title="选择链接"
            :visible.sync="dialogLIink"
            v-if="dialogLIink"
            width="70%"
            center
        >
            <!-- 中间主体部分 -->
            <Link ref="newOrderDetail"  />

            <!-- 页脚 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogLIink = false">取 消</el-button>
                <el-button type="primary" @click="dialogLIink = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Link from '../components/link'
    export default {
        components: {Link},
    data() {
            return {
                backgroundColor: '',//背景默认颜色
                radio: '1',//字体大小
                fontsColor:'#000',//字体颜色
                strong:false,//是否加粗
                sideRadio:'1',//显示位置
                radius:0,//圆角的初始值
                margin:0,//外边距
                padding:0,//内边距
                textarea: '',//文本内容
                dialogLIink: false,//打开对话框
            };
        },
        methods:{
            // 点击背景颜色
            resetBackgroundColor(){
                // 重置默认背景颜色
                this.backgroundColor = ""
                // this.$refs.defultBackgroundColor.color.value = this.backgroundColor
                // this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor = this.backgroundColor
            },
            //点击字体颜色重置
            fontColor(){
                this.fontsColor = '#000'
                // this.$refs.fontsColor.color.value = this.fontsColor
                // this.$refs.fontsColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor = this.fontsColor
            },
            // 编辑内容（链接）
            dialogNewLIink(){
                this.dialogLIink = true
            },
        },
        watch:{
            // 监听默认地址背景颜色改变事件
            backgroundColor(){
                // console.log(this.backgroundColor)
                // console.log(this.$refs.defultBackgroundColor.color.value)
                this.$emit('getData',this.backgroundColor,'文本')
            },
            // 监听字体大小
            radio(){
                console.log(this.radio)
                this.$emit('radio',this.radio,'文本')
            },
            // 监听文本内容
            textarea(){
                // console.log(this.textarea)
                this.$emit('textarea',this.textarea,'文本')
            },
            // 监听字体颜色
            fontsColor(){
                // console.log(this.fontsColor)
                // console.log(this.$refs.fontsColor.color.value)
                this.$emit('fontColor',this.fontsColor,'文本')
            },
            // 监听是否加粗
            strong(){
                this.$emit('strong',this.strong,'文本')
            },
            // 监听显示位置
            sideRadio(){
                // console.log(this.sideRadio)
                this.$emit('sideRadio',this.sideRadio,'文本')
            },
            // 监听圆角改变
            radius(){
                // console.log(123456789)
                this.$emit('radius',this.radius,'文本')
            },
            // 监听外边距
            margin(){
                this.$emit('margin',this.margin,'文本')
            },
            // 监听内边距
            padding(){
                this.$emit('padding',this.padding,'文本')
            },
        }
    }
</script>

<style lang="less" scoped>
.text{
    .textTop{
        background-color:#ccc;
    }
    .background,.color{
        margin: 10px 0 ;
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
    .texts,.setRadius,.setMargin,.setPadding{
        .textConter,.radius,.margin,.padding{
            background-color: #eee;
        }
        .block{
            padding: 10px 100px;
            z-index: 1;
        }
    }
    .fontSize{
        display: flex;
        margin: 10px 0;
        .size{
            margin-right: 40px;
            margin-bottom: 10px;
        }
    }
    .strong,.showSide{
        display: flex;
        margin: 10px 0;
        .set-strong{
            display: flex;
            margin-left: 40px;
            cursor: pointer;
            width: 30%;
            .el-switch{
                width: 50px;
            }
            div{
                width: 100px;
            }
        }
    }
    .showSide{
        padding: 10px 0;
        .block{
            margin-left: 40px;
        }
    }
    .links{
        padding: 20px;
        .link{
            cursor: pointer;
            color: #2692ff;
        }
    }
}
</style>
