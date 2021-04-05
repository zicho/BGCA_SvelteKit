<script lang="ts">
	import '../app.css';
	
	import Login from '$lib/components/Login.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	import { Button, Spinner, Row, Container, Col, Form, FormGroup, Label, Input } from 'sveltestrap';
	
	import { isAuthed } from '$lib/stores/SessionStore';
	import { loadToastr } from '$lib/core/Toastr';
	
	loadToastr();
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
