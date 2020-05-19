<template>
    <div class="picture">
        <!-- 标题 -->
        <div class="title">
            <div>图片编辑</div>
        </div>
        <!-- 背景色 -->
        <div class="background">
            <div>背景色:</div>
            <div class="btn">
                <el-color-picker v-model="backgroundColor" ref="defultBackgroundColor"></el-color-picker> 
                <div class="reset" @click="resetBackgroundColor">重置</div>
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
        <!-- 上传图片列表 -->
        <div class="pictureList">
            <div class="pictureItem" v-for="(i,k) in pictureItemList" :key="k">
                <div class="uploadingImg">
                    <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="links">链接：
                    <!-- <span @click="dialogLIink = true">编辑内容</span> -->
                    <el-button type="info" @click="dialogNewLIink(i)">编辑内容</el-button>
                </div>
                <div class="del" @click="delElement(i)"></div>

            </div>     
        <!-- 上传图片 -->
        <div class="uploading" @click="addPicture(1)"><div>+添加图片</div></div>
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
                        <!-- <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" size='small'>
                            <el-tab-pane label="商品列表" name="first">
                                <div class="option">
                                    <div class="seek">
                                        <div class="set">
                                            <el-cascader v-model="setValue" @change="handleChangeSet" :options="setOptions" clearable placeholder='全部系列' size='samll'></el-cascader>
                                        </div>
                                        <div class="house">
                                            <el-cascader v-model="houseValue" @change="handleChangeHouse" :options="houseOptions" clearable :props="{ expandTrigger: 'hover' }"></el-cascader>
                                        </div>
                                        <div class="style">
                                            <el-cascader v-model="styleValue" @change="handleChangeStyle" :options="styleOptions" clearable placeholder='全部风格'></el-cascader>
                                        </div>
                                        <div class="tag">
                                            <el-cascader v-model="tagValue" @change="handleChangeTag" :options="tagOptions" clearable placeholder='全部标签'></el-cascader>
                                        </div>
                                        <div class="search">
                                            <el-input placeholder="请输入关键字" v-model="searchInput" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <el-button type="primary" @click="search">搜 索</el-button>
                                        <el-button type="info" @click="empty">清 空</el-button>
                                    </div>
                                </div>
                                <div class="table">
                                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border >
                                        <el-table-column  type="selection" width="50" align='center'>
                                        </el-table-column>
                                        <el-table-column label="商品名称" width="150" sortable align='center'>
                                            <template  slot-scope="scope">
                                                <div class="productName">
                                                    <div><img :src="scope.row.img" alt=""></div>
                                                    <div class="text">{{ scope.row.name }}</div>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  prop="set" label="商品系列" align='center'>
                                        </el-table-column>
                                        <el-table-column  prop="classify" label="分类" align='center'>
                                        </el-table-column>
                                        <el-table-column sortable  prop="price" label="价格" align='center'>
                                        </el-table-column>
                                        <el-table-column sortable  prop="inventory" label="库存" align='center'>
                                        </el-table-column>
                                        <el-table-column  prop="state" label="商品状态" align='center'>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="page">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[5, 10, 15, 20]"
                                        :page-size="5"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="20">
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商品标签" name="second">
                                <div class="productLabel">
                                    <div>
                                        <el-radio v-model="labelRadio" label="1" border size="medium">CK系列</el-radio>
                                        <el-radio v-model="labelRadio" label="2" border size="medium">新品</el-radio>
                                        <el-radio v-model="labelRadio" label="3" border size="medium">店长推荐</el-radio>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商品系列" name="third">
                                <div class="productSet">
                                    <div>
                                        <el-radio v-model="setRadio" label="1" border size="medium">非意系列</el-radio>
                                        <el-radio v-model="setRadio" label="2" border size="medium">床垫系列</el-radio>
                                        <el-radio v-model="setRadio" label="3" border size="medium">梦之美系列</el-radio>
                                        <el-radio v-model="setRadio" label="4" border size="medium">CK系列</el-radio>
                                        <el-radio v-model="setRadio" label="5" border size="medium">沙发系列</el-radio>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商品风格" name="forth">
                                <div class="productStyle">
                                    <div>
                                        <el-radio v-model="styleRadio" label="1" border size="medium">极简</el-radio>
                                        <el-radio v-model="styleRadio" label="2" border size="medium">现代休闲</el-radio>
                                        <el-radio v-model="styleRadio" label="3" border size="medium">北欧</el-radio>
                                        <el-radio v-model="styleRadio" label="4" border size="medium">现代</el-radio>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商品类别" name="fifth">
                                <div class="sort"><el-cascader-panel :options="sortOptions"></el-cascader-panel></div>
                            </el-tab-pane>
                            <el-tab-pane label="页面列表" name="sixth">
                                <div class="pageList">
                                    <div class="pageListTop">
                                        <div class="selectAndSeek">
                                            <div class="pageClass">
                                                <el-cascader v-model="pageClassValue" @change="handleChangepageClass" :options="pageClassOptions" clearable placeholder='全部类型' size='samll'></el-cascader>
                                            </div>
                                            <div class="search">
                                                <el-input placeholder="请输入关键字" v-model="pageListsSearchInput" clearable></el-input>
                                            </div>
                                        </div>
                                        <div class="searchBtn">
                                            <el-button type="primary" @click="searchSelect">搜 索</el-button>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="固定页面" name="seventh">
                                <div class="fixedPage">
                                    <div>
                                        <el-radio v-model="pageRadio" label="1" border size="medium">720页面</el-radio>
                                        <el-radio v-model="pageRadio" label="2" border size="medium">加密商品</el-radio>
                                        <el-radio v-model="pageRadio" label="3" border size="medium">商场</el-radio>
                                        <el-radio v-model="pageRadio" label="4" border size="medium">官网</el-radio>
                                        <el-radio v-model="pageRadio" label="5" border size="medium">个人中心</el-radio>
                                        <el-radio v-model="pageRadio" label="6" border size="medium">名片</el-radio>
                                        <el-radio v-model="pageRadio" label="7" border size="medium">直播</el-radio>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="表单页面" name="eighth">
                                <div class="formPage">
                                    <div>
                                        <el-radio v-model="formPageRadio" label="1" border size="medium">意向调查</el-radio>
                                        <el-radio v-model="formPageRadio" label="2" border size="medium">意向调查</el-radio>
                                        <el-radio v-model="formPageRadio" label="3" border size="medium">客户调查</el-radio>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs> -->

            <!-- 页脚 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogLIink = false">取 消</el-button>
                <el-button type="primary" @click="dialogLIink = false">确 定</el-button>
            </span>
        </el-dialog>
        </div>
    </div>
</template>

<script>
import Link from '../components/link'
    export default {
        components: {Link},
        data() {
            return {
                backgroundColor: '#ccc',//背景默认颜色
                radius:0,//圆角的初始值
                margin:0,//外边距
                padding:0,//内边距    
                dialogImageUrl: '',
                dialogVisible: false,//上传图片
                pictureItemList:['1'],
                num : 1,
                dialogLIink: false,//打开对话框
                    // tableData: [
                    //     {
                    //         name: 'k1996',
                    //         img:'http://img2.lixiantuce.com/yjj/1431/pdt/abd610a04a24b468d19bdc36511d13dc.jpg',
                    //         set: '现代简约',
                    //         classify: '沙发',
                    //         price:1200,
                    //         inventory: 10,
                    //         state:'已上架'
                    //     },
                    //     {
                    //         name: 'k1996',
                    //         img:'http://img2.lixiantuce.com/yjj/1431/pdt/abd610a04a24b468d19bdc36511d13dc.jpg',
                    //         set: '非意系列',
                    //         classify: '沙发2',
                    //         price:1000,
                    //         inventory: 18,
                    //         state:'已上架'
                    //     },
                    //     {
                    //         name: 'k1997',
                    //         img:'http://img2.lixiantuce.com/yjj/1431/pdt/abd610a04a24b468d19bdc36511d13dc.jpg',
                    //         set: '非意系列',
                    //         classify: '沙发',
                    //         price:1500,
                    //         inventory: 6,
                    //         state:'已上架'
                    //     },
                    //     {
                    //         name: 'k1999',
                    //         img:'http://img2.lixiantuce.com/yjj/1431/pdt/abd610a04a24b468d19bdc36511d13dc.jpg',
                    //         set: 'CK系列',
                    //         classify: '沙发',
                    //         price:1200,
                    //         inventory: 12,
                    //         state:'已上架'
                    //     },
                    // ],
                    // formLabelWidth: '120px',
                    // activeName: 'first',//tab的进入界面的选项
                    // setValue: [],//系列选项的名称
                    // setOptions:[
                    //     { value: 'noWishSet', label: '非意系列',},
                    //     { value: 'mattressSet', label: '床垫系列',},
                    //     { value: 'dreamSet', label: '梦之美系列',},
                    //     { value: 'CKSet', label: 'CK系列',},
                    //     { value: 'sofaSet', label: '沙发系列',}
                    // ],
                    // houseValue:[],//屋内
                    // houseOptions:[
                    //     { value: 'rest', label: '其他',},
                    //     // 书房
                    //     { value: 'study', label: '书房',children: [{value:'bookcase',label:'书柜'},{value:'bookrack',label:'书架'},{value:'desk',label:'书桌'},{value:'sohoChair',label:'书椅'},{value:'frame',label:'画案'},]},
                    //     // 户外下拉框
                    //     { value: 'outdoorsBalcony', label: '户外/阳台',children: [{value:'pergola',label:'花架'},{value:'outdoorsDesk',label:'户外桌'},{value:'outdoorsChair',label:'户外椅'},{value:'outdoorsSuit',label:'户外套装'},{value:'basket',label:'吊篮/吊椅'},{value:'outdoorsSunshade',label:'户外遮阳棚'},{value:'foldingBed',label:'折叠床'},{value:'rockingChair',label:'摇椅'},{value:'outdoorsLocker',label:'户外储物柜'}]},
                    //     // 客厅下拉框
                    //     { value: 'livingRoom', label: '客厅',children: [{value:'foyer',label:'玄关柜/间厅柜'},{value:'screen',label:'屏风'},{value:'shoeCabinet',label:'鞋柜'},{value:'sidenoard',label:'装饰柜'},{value:'wineCabinet',label:'酒柜'},{value:'livingSuit',label:'客厅套装'},{value:'TVbench',label:'电视柜'},{value:'sofa',label:'沙发'},{value:'endTable',label:'茶几/角几'},{value:'leisureChair',label:'休闲椅'},{value:'pergola',label:'花架/装饰架'},{value:'teaTable',label:'茶台'},{value:'teaChair',label:'茶椅'},{value:'teaStool',label:'茶凳'},{value:'shelves',label:'博古架'},{value:'sideboard',label:'装饰柜'},{value:'floorCabinet',label:'地柜'},{value:'parts',label:'配件'},{value:'sidecabinet',label:'边柜'},{value:'seeingAndHearingCabinet',label:'视听柜'},{value:'hallCabinet',label:'厅柜'},{value:'barcounter',label:'吧台'},{value:'deckChair',label:'躺椅'},{value:'lembah',label:'班台'},{value:'relaxationStool',label:'休闲凳'},{value:'MIddleLslanCabtine',label:'中岛柜'},]},
                    //     // 餐厅
                    //     { value: 'diningRoom', label: '餐厅',children: [{value:'diningTable',label:'餐桌'},{value:'diningChair',label:'餐椅'},{value:'sideboardCabinet',label:'餐边柜'},{value:'diningSuit',label:'餐厅套装'},{value:'diningcaninet',label:'橱柜'},{value:'diningTables',label:'餐台'},]},
                    // ],
                    // styleValue:[],//风格
                    // styleOptions:[
                    //     { value: 'slice', label: '极简',},
                    //     { value: 'modernSlice', label: '现代休闲',},
                    //     { value: 'NorthernEurope', label: '北欧',},
                    //     { value: 'modern', label: '现代',},
                    // ],
                    // tagValue:[],//标签
                    // tagOptions:[
                    //     { value: 'CK', label: 'CK',},
                    //     { value: 'newProduct', label: '新品',},
                    //     { value: 'shopManagerRecommend', label: '店长推荐',},
                    // ],
                    // searchInput: '',//搜索框
                    // currentPage:1,//当前页
                    // labelRadio: '1',//商品标签
                    // setRadio:'1',//商品系列
                    // styleRadio:'1',//商品风格
                    // pageRadio:'1',//固定页面
                    // formPageRadio:'1',//表单页面
                    // sortOptions:[
                    //     {value:'rest',label:'其他'},
                    //     {value:'study',label:'书房',children: [{value:'bookcase',label:'书柜'},{value:'bookrack',label:'书架'},{value:'desk',label:'书桌'},{value:'',label:'书椅'},{value:'frame',label:'画案'},{value:'studySuit',label:'书房套装'}]},
                    //     {value:'outdoorsBalcony', label: '户外/阳台',children: [{value:'pergola',label:'花架'},{value:'outdoorsDesk',label:'户外桌'},{value:'outdoorsChair',label:'户外椅'},{value:'outdoorsSuit',label:'户外套装'},{value:'basket',label:'吊篮/吊椅'},{value:'outdoorsSunshade',label:'户外遮阳棚'},{value:'foldingBed',label:'折叠床'},{value:'rockingChair',label:'摇椅'},{value:'outdoorsLocker',label:'户外储物柜'}]},
                    //     { value: 'livingRoom', label: '客厅',children: [{value:'foyer',label:'玄关柜/间厅柜'},{value:'screen',label:'屏风'},{value:'shoeCabinet',label:'鞋柜'},{value:'sidenoard',label:'装饰柜'},{value:'wineCabinet',label:'酒柜'},{value:'livingSuit',label:'客厅套装'},{value:'TVbench',label:'电视柜'},{value:'sofa',label:'沙发'},{value:'endTable',label:'茶几/角几'},{value:'leisureChair',label:'休闲椅'},{value:'pergola',label:'花架/装饰架'},{value:'teaTable',label:'茶台'},{value:'teaChair',label:'茶椅'},{value:'teaStool',label:'茶凳'},{value:'shelves',label:'博古架'},{value:'sideboard',label:'装饰柜'},{value:'floorCabinet',label:'地柜'},{value:'parts',label:'配件'},{value:'sidecabinet',label:'边柜'},{value:'seeingAndHearingCabinet',label:'视听柜'},{value:'hallCabinet',label:'厅柜'},{value:'barcounter',label:'吧台'},{value:'deckChair',label:'躺椅'},{value:'lembah',label:'班台'},{value:'relaxationStool',label:'休闲凳'},{value:'MIddleLslanCabtine',label:'中岛柜'},]},
                    //     { value: 'diningRoom', label: '餐厅',children: [{value:'diningTable',label:'餐桌'},{value:'diningChair',label:'餐椅'},{value:'sideboardCabinet',label:'餐边柜'},{value:'diningSuit',label:'餐厅套装'},{value:'diningcaninet',label:'橱柜'},{value:'diningTables',label:'餐台'},]},
                    //     // 卧室
                    //     {value:'dedroom',label:'卧室',children:[{value:'',label:'床'},{value:'mattess',label:'床垫'},{value:'importMattess',label:'进口床垫'},{value:'closet',label:'衣柜'},{value:'nightTable',label:'床头柜'},{value:'dresser',label:'妆台/妆凳'},{value:'chestOfDrawers',label:'斗柜'},{value:'endOfTheBedStool',label:'床尾凳'},
                    //     {value:'bedroomSuit',label:'卧室套装'},{value:'dressingMirror',label:'穿衣镜/衣帽架'},{value:'coirMat',label:'棕垫'},{value:'pillow',label:'枕头'},{value:'bolster',label:'抱枕'},{value:'bedclothes',label:'床品'},{value:'ornament',label:'饰品'},{value:'takeACarpet',label:'搭毯'},{value:'curtain',label:'窗帘'},{value:'bedBox',label:'床箱'},{value:'pillowInner',label:'枕芯'},{value:'quilt',label:'被芯'},{value:'quiltCover',label:'被套'},{value:'mattressCover',label:'床套'},{value:'fittedSheet',label:'床笠'},{value:'bedSlat',label:'排骨架'},{value:' slidingDoor ',label:'推拉门'},{value:'wardrobeTop',label:'顶柜'},{value:'sillStep ',label:'脚蹬'},{value:'pedal',label:'脚踏'}]},
                    //     // 办公家具
                    //     {value:'officeFurniture',label:'办公家具',children:[{value:'fileCabinet',label:'文件柜'},{value:'OfficeSofa',label:'办公沙发'},{value:'officeTable',label:'办公桌'},{value:'officeChair',label:'办公椅'},{value:'OfficeSuite',label:'办公套装'}]},
                    //     // 儿童房
                    //     {value:'childrensBedroom',label:'儿童房',children:[{value:'crib',label:'儿童床'},{value:'ChildrenInTheBookcase',label:'儿童书柜'},{value:'ChildrendDesk',label:'儿童书桌'},{value:'ChildrendMattess',label:'儿童床垫'},{value:'ChildrendNightTable',label:'儿童床头柜'},{value:'ChildrendChair',label:'儿童椅'},{value:'ChildrendTables',label:'儿童柜类'}]},
                    //     // 灯具
                    //     {value:'lampsAndLanterns',label:'灯具',},
                    //     // 门
                    //     {value:'door',label:'门',}
                    // ],//商品类别
                    // pageClassValue:[],//页面列表的选项名称
                    // pageClassOptions:[],//页面列表下拉框的子选项
                    // pageListsSearchInput:'',//页面列表的搜索框
            };
        },
        methods:{
           // 重置默认背景颜色
            resetBackgroundColor(){
                this.backgroundColor = "#ccc"
                this.$refs.defultBackgroundColor.color.value = this.backgroundColor
                this.$refs.defultBackgroundColor.$el.firstElementChild.firstElementChild.firstChild.style.backgroundColor = this.backgroundColor
            },
            // 上传图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 编辑内容（链接）
            dialogNewLIink(e){
                this.dialogLIink = true
                console.log(e)
            },
            // 点击删除
            delElement(item){
                for(let i=0;i<this.pictureItemList.length;i++){
                    if(this.pictureItemList[i] == item){
                        // console.log(i)
                        this.pictureItemList.splice(i,1)
                        return
                    }
                }
            },
            // 点击添加图片
            addPicture(i){
                this.num = this.num + i
                // console.log(i,this.num)
                this.pictureItemList.push(this.num)
            },
                // handleClick(tab, event) {
                //     console.log(tab, event);
                // },
                // // 下拉框
                // handleChangeSet(value) {
                //     console.log(value);
                // },
                // handleChangeHouse(value) {
                //     console.log(value);
                // },
                // handleChangeStyle(value) {
                //     console.log(value);
                // },
                // handleChangeTag(value) {
                //     console.log(value);
                // },
                // // 商品列表搜索
                // search(){
                //     console.log( this.setValue,this.houseValue,this.styleValue,this.tagValue,this.searchInput)
                // },
                // // 商品列表清空
                // empty(){
                //     this.setValue = []
                //     this.houseValue = []
                //     this.styleValue = []
                //     this.tagValue = []
                //     this.searchInput = ''
                // },
                // // 分页
                // handleSizeChange(val) {
                //     console.log(`每页 ${val} 条`);
                // },
                // handleCurrentChange(val) {
                //     console.log(`当前页: ${val}`);
                // },
                // // 商品列表选择的内容
                // handleSelectionChange(val) {
                //     this.multipleSelection = val;
                //     console.log(val)
                // },
                // handleChangepageClass(val){
                //     console.log(val)
                // },
                // // 页面列表的搜索按钮
                // searchSelect(){
                //     console.log(this.pageClassValue,this.pageListsSearchInput)
                // },
        },
       watch:{
            // 监听默认背景颜色改变事件
            backgroundColor(){
                this.$emit('getData',this.backgroundColor,'图片')
            },
            // 监听圆角改变
            radius(){
                // console.log(123456789)
                this.$emit('radius',this.radius,'图片')
            },
            // 监听外边距
            margin(){
                this.$emit('margin',this.margin,'图片')
            },
            // 监听内边距
            padding(){
                this.$emit('padding',this.padding,'图片')
            },
        },
    }
</script>

<style lang="less" scoped>
.picture{
    .title{
        div{
            background-color: #eee;
        }
    }
    .sites,.background{
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
    .background{
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
        .radius,.margin,.padding{
            background-color: #eee;
        }
        .block{
            padding: 10px 100px;
            z-index: 1;
        }
    }
    .pictureList{
        padding: 10px;
        height: 450px;
        overflow-y:auto;
        .pictureItem{
            position: relative;
            border: 1px solid #e9ebee;
            display: flex;
            padding: 10px;
            margin-top: 10px;
            .uploadingImg{
                width: 60%;
            }
            .links{
                line-height: 148px;
            }
        }
        .pictureItem:hover{
            border: 1px solid rgb(90, 136, 235);
            .del{
                display: block;
            }
        }
        .del{
            cursor: pointer;   
            background: url('../assets/imgs/del.png') no-repeat;
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
    .uploading{
        cursor: pointer;
        padding: 10px;
        div{
            height: 34px;
            line-height: 34px;
            border: 1px solid #e9ebee;
            align-items: center;
            margin-top: 10px;
            margin-bottom: 10px;
            color: rgb(90, 136, 235);
        }
    }
    .uploading div:hover{
        border: 1px solid rgb(90, 136, 235);
    }
        // .option{
        //     display: flex;
        //     justify-content: space-between;
        //     margin-bottom: 20px;
        //     .seek{
        //         display: flex;
        //         justify-content: space-between;
        //         div{
        //             width: 180px; 
        //         }
        //         div:not(:first-child){
        //             margin-left: 10px;
        //         }
        //     }
        // }
        // .table{
        //     cursor: pointer;
        // }
        // .page{
        //     margin-top: 20px;
        //     display: flex;
        //     justify-content: center;
        // }
        // .productName{
        //     display: flex;
        //     justify-content: space-between;
        //     img{
        //         width: 40px;
        //         height: 40px;
        //         margin-left: 20px;
        //     }
        //     .text{
        //         margin: 0 auto;
        //         line-height: 40px;
        //         color: #409EFF;
        //     }
        // }
        // .productLabel,.productSet,.productStyle,.fixedPage,.formPage{
        //     margin: 10px 0;
        //     label:not(:first-child){
        //         margin-left: 20px;
        //         margin-top: 5px;
        //     }
        // }
        // .pageList{
        //     .pageListTop{
        //         display: flex;
        //         justify-content: space-between;
        //         .selectAndSeek{
        //             display: flex;
        //             .pageClass{
        //                 width: 180px;
        //                 margin-right: 40px;
        //             }
        //         }
        //     }
        // }
}
</style>