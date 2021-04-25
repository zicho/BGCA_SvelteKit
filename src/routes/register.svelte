<!-- <script lang="ts">
	import { sessionStore } from '../lib/stores/SessionStore';
	import { Button, Spinner, Row, Container, Form, FormGroup, Label, Input } from 'sveltestrap';
	import { CreateUserModel } from 'library';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	var u = new CreateUserModel();

	let registerInProgress: boolean = false;

	async function handleLogin(e: Event) {
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
</script>

<Form>
	<FormGroup>
		<Label for="input_username" class="dm-xs-b">
			<strong>Username</strong>
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
			<strong>Password</strong>
		</Label>
		<Input
			bind:value={u.password}
			type="password"
			name="password"
			id="input_password"
			placeholder="Password"
		/>
	</FormGroup>
	<FormGroup class="dm-sm-t">
		<Label for="input_confirm_password" class="dm-xs-b">
			<strong>Password</strong>
		</Label>
		<Input
			bind:value={u.confirmPassword}
			type="password"
			name="password"
			id="input_confirm_password"
			placeholder="Password"
		/>
	</FormGroup>
	<FormGroup>
		<div>
			<Button
				disabled={registerInProgress}
				style="width: 100%"
				color="primary"
				class="dm-md-t"
				on:click={handleLogin}
			>
				{#if !registerInProgress}
					Register
				{:else}
					<Spinner size="sm" color="light" />
				{/if}
			</Button>
		</div>
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
	<a href="/register">Register new user</a>
</Form> -->
