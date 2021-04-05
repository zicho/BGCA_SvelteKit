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

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

	const logout = (e: Event) => {
		e.preventDefault();
		sessionStore.logout();
	};
</script>

<Navbar color="dark" dark expand="md">
	<NavbarBrand href="/">sveltestrap</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	{#if $isAuthed}
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav class="ml-auto" navbar>
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
	{/if}
</Navbar>
