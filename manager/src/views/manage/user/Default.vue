<template>
    <div>
        <!-- 用户管理 -->
        <!-- <keep-alive include="UserList"> -->
        <keep-alive :include="/List$/">
            <router-view/>
        </keep-alive>
    </div>
</template>
<script>
export default {
    
}
</script>