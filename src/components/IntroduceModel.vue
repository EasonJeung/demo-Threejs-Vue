<template>
    <div id="three"></div>
</template>
<script>
export default {
    mounted() {
        let modelSrcipt = document.createElement('script');
        modelSrcipt.src = '/src/components/model.js';
        // modelSrcipt.src = '/src/components/model_tesla.js';
        modelSrcipt.type = 'module';
        document.body.appendChild(modelSrcipt);
    },
};
</script>