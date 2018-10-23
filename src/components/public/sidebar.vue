<template>
    <el-aside style="border: solid 1px #e6e6e6;width: 200px;overflow-x: hidden;">
        <el-menu style="border: none" :default-active="this.$route.path" :router="true">
            <el-submenu v-for="value in sideBarData" :key="value.path" :index="value.path" v-bind:basePath="value.path">
                <template slot="title"><i :class="value.icon"></i>{{value.module}}</template>

                <el-menu-item v-for="item in value.children" :key="resolvePath(value.path,item.path)" :index="resolvePath(value.path,item.path)">{{item.cellName}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<style lang="stylus">
    .el-aside
        color: #333

    .el-submenu__title
        border-bottom 1px solid rgb(230, 230, 230)
</style>

<script>
    import path from 'path'
    export default {
        name: 'Sidebar',
        mounted(){
            let self = this
            self.menu()

        },
        data() {
            return {
                sideBarActive: '',
                sideBarData:[],
            };
        },
        methods:{
            resolvePath(basePath,routePath) {
                return path.resolve(basePath, routePath)
            },
            menu(){
                let sideBarData = this.$router.options.routes;
                let menu = JSON.parse(localStorage.getItem('menu'))
                for(let i=0;i<sideBarData.length;i++){

                    let children = sideBarData[i].children;
                    if(children){
                        for(let j=0;j<children.length;j++){
                            let count = 0

                            for (let k = 0;k<menu.length;k++){
                                if(menu[k].name == children[j].cellName){
                                    count ++
                                }
                            }

                            if(children[j].hidden && children[j].hidden === true || count === 0){
                                children.splice(j,1);
                                j--;
                            }
                        }
                    }

                    if((sideBarData[i].hidden && sideBarData[i].hidden === true) || (sideBarData[i].children && sideBarData[i].children.length === 0)){
                        sideBarData.splice(i,1);
                        i--;
                        continue;
                    }

                }
                this.sideBarData = sideBarData
            }
        },
    }
</script>
