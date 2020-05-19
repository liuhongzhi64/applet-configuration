<template>
    <div class="subline">
        <div class="sublineTop">辅助线编辑</div>
                <!-- 背景色 -->
        <div class="background">
            <div>背景色:</div>
            <div class="btn">
                <el-color-picker v-model="backgroundColor"></el-color-picker> 
                <div class="reset" @click="resetBackgroundColor">重置</div>
            </div>                   
        </div>
        <!-- 颜色 -->
        <div class="color">
           <div>颜色:</div>
            <div class="btn">
                 <el-color-picker v-model="colors"></el-color-picker>
                <div class="reset" @click="resetColor">重置</div>
            </div> 
        </div>
        <!-- 边距 -->
        <div class="setPadding">
            <div class="padding">边距：</div>
            <div class="block">
                <el-slider
                v-model="padding"
                show-input
                :max=100>
                </el-slider>
            </div>
        </div>
        <!-- 粗细 -->
        <div class="setThickness">
            <div class="thickness">粗细：</div>
            <div class="block">
                <el-slider
                v-model="thickness"
                show-input
                :max=100
                :min=1>
                </el-slider>
            </div>
        </div>
        <!-- 样式 -->
        <div class="setStyle">
            <div class="style">样式:</div>
            <div class="block">
                <el-radio v-model="styleRadio" label="1">实线</el-radio>
                <el-radio v-model="styleRadio" label="2">虚线</el-radio>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                backgroundColor:'',//背景色
                colors:'',//颜色
                padding:10,//边距
                thickness:1,//粗细
                styleRadio:'1',
            }
        },
        methods:{
            // 点击背景颜色
            resetBackgroundColor(){
                this.backgroundColor = ""
            },
            // 重置颜色
            resetColor(){
                this.colors = ''
            }
        },
        watch:{
            // 监听默认地址背景颜色改变事件
            backgroundColor(){
                this.$emit('getData',this.backgroundColor,'辅助线')
            },
            // 颜色监听
            colors(){
                console.log(this.colors)
                this.$emit('colors',this.colors,'辅助线')
            },
            // 监听内边距
            padding(){
                this.$emit('padding',this.padding,'辅助线')
            },
            // 监听样式
            styleRadio(){
                this.$emit('styleRadio',this.styleRadio,'辅助线')
            },
            // 粗细
            thickness(){
                this.$emit('thickness',this.thickness,'辅助线')
            }
        },
    }
</script>

<style lang="less" scoped>
.subline{
    .sublineTop{
        background-color: #ccc;
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
    .setPadding,.setThickness,.setStyle{
        .padding,.thickness,.style{
            background-color: #eee;
        }
        .block{
            padding: 10px 100px;
            z-index: 1;
        }
    }
}
</style>