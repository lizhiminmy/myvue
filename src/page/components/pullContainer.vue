<template>
	<div :class="type" class="container">
		12354
	</div>
</template>
<script type="text/javascript">
	export default {
		props:['type'],
		data(){
			return {


			}
		},
		methods:{

		},
		create(){
			console.log(this.type);
		}
	}
</script>
<style scoped lang="scss">
	
</style>