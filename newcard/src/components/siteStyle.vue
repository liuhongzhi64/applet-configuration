<template>
    <div class="site">
        <div class="titleName">网页编辑</div>
        <div class="redact">地址设置</div>
        <!-- 标题 -->
        <div class="title">
            <div>名称：</div>
            <el-input
            placeholder="请输入内容"
            v-model="titleName"
            clearable>
            </el-input>
        </div>
        <!-- 地址 -->
        <div class="sites">
            <div>地址：</div>
            <el-input
            placeholder="请输入内容"
            v-model="sitesName"
            clearable>
            </el-input>
        </div>
        <!-- 背景色 -->
        <div class="background">
            <div>背景色:</div>
            <div class="btn">
                <!-- <colorPicker v-model="backgroundColor"  ref="defultBackgroundColor"></colorPicker>  -->
                <el-color-picker v-model="backgroundColor" ref="defultBackgroundColor"></el-color-picker>
                <div class="reset" @click="resetBackgroundColor">重置</div>
            </div>                   
        </div>
        <!-- 标题颜色 -->
        <div class="titleColor">
            <div>标题颜色:</div>
            <div class="btn">
                <!-- <colorPicker v-model="titleColors"  ref="titleColor"></colorPicker>  -->
                <el-color-picker v-model="titleColors" ref="titleColor"></el-color-picker>
                <div class="reset" @click="titleColor">重置</div>
            </div>
        </div>
        <!-- 地址颜色 -->
        <div class="sitesColor">
            <div>地址颜色:</div>
            <div class="btn">
                <!-- <colorPicker v-model="sitesColor"  ref="sitesColor"></colorPicker>  -->
                <el-color-picker v-model="sitesColor"></el-color-picker>
                <div class="reset" @click="siteColor">重置</div>
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
        <!-- 地图 -->
        <div class="map">
            地图
            <div id="allmap" ref="allmap"></div>
        </div>
    </div>
</template>
<script>
    export default {

        data() {
            return {
                titleName:'',//名称
                sitesName:'',//地址
                backgroundColor: '',//背景默认颜色
                titleColors:'#000',//标题颜色默认颜色
                sitesColor:'#000',//地址默认颜色
                radius:0,//圆角的初始值
                margin:0,//外边距
                padding:0,//内边距
                type: 'tab',
                address_detail: '北京市海淀区',
                center: {lng: 111, lat:34},
            };
        },
        methods:{
            // 点击背景颜色
            resetBackgroundColor(){
                // 重置默认背景颜色
                this.backgroundColor = ""
                // console.log(this.$refs.defultBackgroundColor.$refs.colorPicker.children[0].style.backgroundColor)
                // console.log(this.backgroundColor)
                // this.$refs.defultBackgroundColor.$refs.colorPicker.children[0].style.backgroundColor = this.backgroundColor
                // this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor = this.backgroundColor
                // console.log(this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor)
            },
            //标题颜色
            titleColor(){
                this.titleColors = "#000"
                // console.log(this.$refs.titleColor.$refs.colorPicker.children[0].style.backgroundColor,'111')
                // this.$refs.titleColor.$refs.colorPicker.children[0].style.backgroundColor = this.titleColors
                // this.$refs.titleColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor = this.titleColors
            },
            //地址默认颜色
            siteColor(){
                this.sitesColor = "#000"
                // console.log(this.$refs.sitesColor.$refs.colorPicker.children[0].style.backgroundColor,'222')
                // this.$refs.sitesColor.$refs.colorPicker.children[0].style.backgroundColor = this.sitesColor
                // this.$refs.sitesColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor = this.sitesColor
            },
            // 地图
            map () {
            let map = new window.BMap.Map(this.$refs.allmap) // 创建Map实例
            map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11) // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new window.BMap.MapTypeControl({ // 添加地图类型控件
                mapTypes: [
                window.BMAP_NORMAL_MAP,
                window.BMAP_HYBRID_MAP
                ]
            }))
            map.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
            },
        },
        mounted () {
            this.map()
        },
        watch:{
            // 监听默认地址背景颜色改变事件
            backgroundColor(){
                // console.log(12345)
                this.$emit('getData',this.backgroundColor,'地址')
                // this.defultBackgroundColor = this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor
            },
            // 监听标题颜色默认颜色改变事件
            titleColors(){
                // console.log(678910,this.$emit('setTitleColor'))
                this.$emit('setTitleColor',this.titleColors,'地址')
                // this.defultBackgroundColor = this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor
            },
            // 监听地址默认颜色改变事件
            sitesColor(){ 
                this.$emit('setsitesColor',this.sitesColor,'地址')
                // this.defultBackgroundColor = this.$refs.defultBackgroundColor.$refs.colorPicker.children[2].firstChild.firstChild.style.backgroundColor
            },
            // 监听圆角改变
            radius(){
                // console.log(123456789)
                this.$emit('radius',this.radius,'地址')
            },
            // 监听外边距
            margin(){
                this.$emit('margin',this.margin,'地址')
            },
            // 监听内边距
            padding(){
                this.$emit('padding',this.padding,'地址')
            },
            // 监听地址名称
            titleName(){
                console.log(this.titleName)
                this.$emit('setTitleName',this.titleName,'地址')
            },
            // 监听地址
            sitesName(){
                console.log(this.sitesName)
                this.$emit('sitesName',this.sitesName,'地址')
            }
        }
    }
</script>

<style lang="less" scoped>
.site{
    .titleName{
        height: 40px;
        line-height: 40px;       
        font-size: 20px;   
        color: #666;
    }
    .title,.sites,.background,.full-screen,.titleColor,.sitesColor{
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
        .set-full-screen{
            cursor: pointer;
            width: 30%;
            display: flex;
            .el-switch{
                margin-top: 10px;
                margin-left: 20px;
                width: 50px;
            }
            div{
                width: 100px;
            }
        }
    }
    .background,.titleColor,.sitesColor{
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
    .map{
        // width: 300px;
        height: 300px;
        overflow: hidden;
        // background-color: #2692ff;
    }
    #allmap {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>
<style>
    .m-colorPicker .box{
        z-index: 100;
    }
</style>
