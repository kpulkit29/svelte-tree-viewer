<script>
	import { onMount } from 'svelte'
	import { activeElement } from './store/index'
	import Fa from 'svelte-fa'
	import { clickHandler } from './helpers/clickHandlers'
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
	export let tree;
	export let secondaryIcon;
	export let onSelectCallback;
	export let faIcon;

	/**
	 * Click handler for the leaf nodes
	 * marks the clicked element as the active element
	 * @param event DOM Click event
	 * @param key (string) unique identifier of the current node
	 */
	function leafNodeClickHandler(event, key) {
		/**
		 * This event should not propagate to the parent (.node-desc) node
		 * as this might be misunderstood as a click event to expand/shrink
		*/
		event.stopPropagation();
		/**
		 * Trigger the on select callback function
		*/
		onSelectCallback && onSelectCallback(key);
		/**
		 * Remove tree-node-active class for previously active leaf node
		*/
		$activeElement && $activeElement.classList.remove('tree-node-active');
		let node = event.target;
		node.parentNode.classList.add('tree-node-active');
		activeElement.set(node.parentNode);
	}
</script>
<style>
	.tree-child {
		margin-left: 8px;
		margin-top: 4px;
		transform: scale(1,0);
		transition: 0.2s;
		height: 0px;
	}
	
	.complete-tree-node {
		margin-bottom: 6px;
		padding: 2px;
	}	

	.node-desc .chev-right, .node-desc .secondary-icon  {
		transition: 0.4s ease-in-out;
		transform-origin: center;
		width: 20px;
		margin: 1px 6px 2px 2px;
		height: 20px;
	}

	.secondary-icon img {
		width: 20px;
		height: 20px;
	}

	.node-desc {
		padding: 4px;
		display: flex;
		max-width: 60%;
	}

	:global(.tree-node-active) {
		background: aliceblue;
	}

	.chevron-no-child {
		opacity: 0.2;
	}

	.leaf-node {
		cursor: pointer;
	}

</style>

{#each tree as item,i}
	{#if !item.child}
		<div class="complete-tree-node">
			<div class="node-desc leaf-node" on:click={(e) => clickHandler(e)}>
				<div class="chev-right chevron-no-child">
					<Fa icon={faChevronRight}/>
				</div>
				{#if secondaryIcon}
					{#if faIcon}
						<div class="secondary-icon">
							<Fa icon={secondaryIcon}/>
						</div>
					{:else}
						<div class="secondary-icon">
							<img src={secondaryIcon} alt="secondaryIcon"/>
						</div>
					{/if}
				{/if}
				<div class="desc" on:click={(e) => leafNodeClickHandler(e, item.key, onSelectCallback, activeElement)}>
					{item.desc}
				</div>
			</div>
	</div>
	{:else}
		<div class="complete-tree-node">
			<div class="node-desc" on:click={(e) => clickHandler(e)}>
				<div class="chev-right">
					<Fa icon={faChevronRight}/>
				</div>
				{#if secondaryIcon}
					{#if faIcon}
						<div class="secondary-icon">
							<Fa icon={secondaryIcon}/>
						</div>
					{:else}
						<div class="secondary-icon">
							<img src={secondaryIcon} alt="secondaryIcon"/>
						</div>
					{/if}
				{/if}
				<div class="desc" on:click={(e) => e.stopPropagation()}>
					{item.desc}
				</div>
			</div>
			<div class='tree-child'>
				<svelte:self tree={item.child} faIcon={faIcon} secondaryIcon={secondaryIcon} onSelectCallback={onSelectCallback}/>
			</div>
	</div>
	{/if}
{/each}