<script lang="ts">
	import '../app.css';
	import Login from '$lib/Login.svelte';
	import { Button, Spinner, Row, Container, Col, Form, FormGroup, Label, Input } from 'sveltestrap';
	import Navbar from '$lib/Navbar.svelte';
	import { isAuthed } from '../stores/SessionStore';
	// import { loadToastr } from '$lib/core/Toastr';
	// loadToastr();
	
</script>

<main>
	<Navbar />
	<Container>
		<Col>
			{#if $isAuthed}
				<slot />
			{:else}
				<Login />
			{/if}
		</Col>
	</Container>
</main>
