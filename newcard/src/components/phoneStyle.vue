<template>
    <div class="phone">
        <!-- 标题 -->
        <div class="redact">电话编辑</div>
        <div class="title">
            <div>联系电话：</div>
            <el-input
            placeholder="请输入内容"
            v-model="getPhone"
            clearable>
            </el-input>
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
        <!-- 标题颜色 -->
        <div class="titleColor">
            <div>标题颜色:</div>
            <div class="btn">
                <el-color-picker v-model="titleColors" ref="titleColor"></el-color-picker>
                <!-- <colorPicker v-model="titleColors"  ref="titleColor"></colorPicker>  -->
                <div class="reset" @click="titleColor">重置</div>
            </div>
        </div>
        <!-- 号码颜色 -->
        <div class="phoneColor">
            <div>号码颜色:</div>
            <div class="btn">
                <el-color-picker v-model="phoneColor" ref="phoneColor"></el-color-picker>
                <!-- <colorPicker v-model="phoneColor"  ref="phoneColor"></colorPicker>  -->
                <div class="reset" @click="sendPhoneColor">重置</div>
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
                :max=100>
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
                :max=100>
                </el-slider>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        // props:['getPhone'],
        data() {
            return {
                // titleName:'',//联系电话名称
                getPhone:'13194782515',//联系电话名称
                backgroundColor: '',//背景默认颜色
                titleColors:'',//标题颜色默认颜色
                phoneColor:'',//号码默认颜色
                radius:0,//圆角的初始值
                margin:0,//外边距
                padding:0,//内边距        
            };
        },
        created:function(){
                this.titleName  =   this.SendPhone
        },
        methods:{
            // 点击背景颜色
            resetBackgroundColor(){
                // 重置默认背景颜色
                this.backgroundColor = ""
                // console.log(this.$refs.defultBackgroundColor.$refs.colorPicker.children[0].style.backgroundColor)
                // // console.log(this.backgroundColor)
                // this.$refs.defultBackgroundColor.$refs.colorPicker.children[0].style.backgroundColor = this.backgroundColor
                // this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor = this.backgroundColor
            },
            //标题颜色
            titleColor(){
                this.titleColors = ""
                // this.$refs.titleColor.$refs.colorPicker.children[0].style.backgroundColor = this.titleColors
                // this.$refs.titleColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor = this.titleColors
            },
            //电话默认颜色
            sendPhoneColor(){
                // console.log(111)
                this.phoneColor = ""
                // this.$refs.phoneColor.$refs.colorPicker.children[0].style.backgroundColor = this.phoneColor
                // this.$refs.phoneColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor = this.phoneColor
            },

        },
        watch:{
            // 监听默认地址背景颜色改变事件
            backgroundColor(){
                this.$emit('getData',this.backgroundColor,'电话')
            },
            // 监听标题颜色默认颜色改变事件
            titleColors(){
                this.$emit('setTitleColor',this.titleColors,'电话')
            },
            // 监听电话默认颜色改变事件
            phoneColor(){ 
                this.$emit('phoneColor',this.phoneColor,'电话')
            },
            // 监听圆角改变
            radius(){
                this.$emit('radius',this.radius,'电话')
            },
            // 监听外边距
            margin(){
                this.$emit('margin',this.margin,'电话')
            },
            // 监听内边距
            padding(){
                this.$emit('padding',this.padding,'电话')
            },
            getPhone(){
                // console.log(this.getPhone)
                this.$emit('SendPhones',this.getPhone,'电话')
            }
        },
    }
</script>

<style lang="less" scoped>
.phone{
    .titleName{
        height: 40px;
        line-height: 40px;       
        font-size: 20px;   
        color: #666;
    }
    .title,.sites,.background,.titleColor,.phoneColor{
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
    }
    .background,.titleColor,.phoneColor{
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
    .setRadius,.setMargin,.setPadding{
        // width: 80%;
        .radius,.margin,.padding{
            background-color: #eee;
        }
        .block{
            padding: 10px 100px;
            z-index: 1;
        }
    }
}
</style>