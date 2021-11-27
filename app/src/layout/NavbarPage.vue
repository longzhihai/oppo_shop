<template>
    <div>
        <van-nav-bar
            :title="title"
            left-text="返回"
            right-text="收藏"
            left-arrow
        >
            <template #left>
                <van-icon name="arrow-left" size="20" @click="goBack" style="margin-right:10px" />
                <van-icon name="wap-home-o" size="20" @click="goHome" />
            </template>
            <template #right>
                <slot name="right">
                    <van-icon name="share-o" size="20" @click="handleClick" />
                </slot>
            </template>
        </van-nav-bar>
        <slot/>
    </div>
</template>
<script>
export default {
    props:{
        title:String
    },
    methods:{
        goBack(){
            this.$router.back();
        },
        goHome(){
            this.$router.push('/home')
        },
        handleClick(){
            this.$emit('share')
        }
    }
}
</script>
