<script lang="ts">
	import { isAuthed, sessionStore, notifications } from '../stores/SessionStore';
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		UncontrolledDropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from 'sveltestrap';
	import Icon from 'fa-svelte';
	import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
	import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
	import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
	import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

	const logout = (e: Event) => {
		e.preventDefault();
		sessionStore.logout();
	};

	$: unreadNotifications = $notifications != 0;
</script>

<Navbar color="dark" dark expand="md">
	<NavbarBrand href="/">sveltestrap</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav class="ml-auto" navbar>
				{#if $isAuthed}
				<NavItem class="dm-md-r">
					<NavLink href="/profile">
						<Icon class="myClass1 myClass2" icon={faUser} />
						Profile
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/messages">
						<Icon icon={faEnvelope} />
						0
					</NavLink>
				</NavItem>
				<NavItem class="dm-md-r">
					<NavLink href="/notifications">
						<!-- <span
							class="fas fa-stack fa-fw clear-defaults"
							class:active={unreadNotifications === true}
						>
							{#if unreadNotifications}
								<Icon icon={faCircle} class="fas fa-stack-2x notify" />
							{/if}
							<Icon icon={faBell} class="navbar-icon fas fa-stack-2x fa-inverse" />
						</span>
						<span>{$notifications}</span>

						<span class="fa-stack fa-3x" data-count="28">
							<i class="fa fa-circle fa-stack-2x"></i>
							<i class="fa fa-bell fa-stack-1x fa-inverse"></i>
						  </span> -->

						<Icon class="myClass1 myClass2" icon={faBell} />
						{$notifications}
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink on:click={logout}>
						<Icon class="myClass1 myClass2" icon={faSignOutAlt} />
						Sign Out
					</NavLink>
				</NavItem>
				{:else} 
				<NavItem class="dm-md-r">
					<NavLink href="/about">
						<Icon class="myClass1 myClass2" icon={faUser} />
						Profile
					</NavLink>
				</NavItem>
				{/if}
				<!-- <UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>Options</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>Option 1</DropdownItem>
						<DropdownItem>Option 2</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>Reset</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown> -->
			</Nav>
		</Collapse>
	
</Navbar>

<style>
	.fa-stack[data-count]:after {
		position: absolute;
		right: 0%;
		top: 1%;
		content: attr(data-count);
		font-size: 30%;
		padding: 0.6em;
		border-radius: 999px;
		line-height: 0.75em;
		color: white;
		background: rgba(255, 0, 0, 0.85);
		text-align: center;
		min-width: 2em;
		font-weight: bold;
	}
</style>
