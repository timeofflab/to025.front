<template>
    <!-- default = div -->
	<component
		:is="tag"
		:class="{'-inview-active': view}"
		class="-inview"
		ref="el"
	>
		<slot></slot>
	</component>
</template>

<script lang="ts">
	// @ts-ignore
    import _ from './Inview.ts'; export default _;
</script>
