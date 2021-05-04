<template>
    <div class="item">
        <p class="goodname">{{order.goodname}}</p>
        <p class="goodprice">{{order.price}}</p>
        <p class="gooddescri">sth else...</p>
    </div>
</template>
<script>
export default {
    data:function() {

        return {

        }
    },
    props:{
        order:{
            type: Object
        }
    }
}
</script>
<style scoped>
.item {
    border-radius: 2px;
    padding: 5px;
    background-color: rgba(253, 223, 218, 0.911);
}

.item:hover {
    box-shadow: 0px 2px 2px 0px rgba(240, 175, 162, 0.911);
}
</style>
