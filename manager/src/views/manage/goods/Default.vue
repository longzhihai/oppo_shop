<template>
    <div>
        <keep-alive :include="/list$/">
        <router-view/>
        </keep-alive>
    </div>
</template>
<script>
export default {
    
}
</script>