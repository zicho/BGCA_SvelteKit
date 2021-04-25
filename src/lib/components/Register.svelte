<script lang="ts">
	import { sessionStore } from '../stores/SessionStore';
	import { Button, Spinner, Row, Container, Form, FormGroup, Label, Input } from 'sveltestrap';
	import { CreateUserModel } from 'library';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	var u = new CreateUserModel();

	let registerInProgress: boolean = false;

	async function handleRegister(e: Event) {
		e.preventDefault();
		registerInProgress = true;
		sessionStore.login(u).then((response) => {
			registerInProgress = false;

			if (response.success === false) {
				displayError(response.message);
			}
		});
	}

	let errorMessage: string;

	function displayError(msg: string) {
		registerInProgress = false;
		errorMessage = msg;
		setTimeout(() => (errorMessage = null), 5000);
	}

	// client side only stuff

	let countries;
	let states;
	let cities;

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		cities = await res.json();
	});
	
</script>

<h1>Register a new user</h1>
<span>
	Enter the required information below to register a new user.
</span>
<Form>
	<FormGroup>
		<Label for="input_username" class="dm-xs-b">
			<strong>Username *</strong>
		</Label>
		<Input
			bind:value={u.username}
			type="text"
			name="username"
			id="input_username"
			placeholder="Username"
		/>
	</FormGroup>
	<FormGroup class="dm-sm-t">
		<Label for="input_password" class="dm-xs-b">
			<strong>Password *</strong>
		</Label>
		<Input
			bind:value={u.password}
			type="password"
			name="password"
			id="input_password"
			placeholder="Password"
		/>
	</FormGroup>
	<h3>Optional additional information</h3>
	<FormGroup>
		<Label for="input_username" class="dm-xs-b">
			<strong>Email</strong> - Useful for password resets 
		</Label>
		<Input
			bind:value={u.info.email}
			type="text"
			name="username"
			id="input_username"
			placeholder="Email adress"
		/>
	</FormGroup>
	<FormGroup>
		<Label for="input_username" class="dm-xs-b">
			<strong>Real name</strong>
		</Label>
		<Input
			bind:value={u.info.realName}
			type="text"
			name="real_name"
			id="input_real_name"
			placeholder="Real name"
		/>
	</FormGroup>
	
	<Row class="dm-lg-t justify-content-center">
		{#if errorMessage != null && registerInProgress === false}
			<h5
				class="color-error text-center"
				transition:fade={{ delay: 250, duration: 300, easing: quintInOut }}
			>
				{errorMessage}
			</h5>
		{/if}
	</Row>
</Form>
