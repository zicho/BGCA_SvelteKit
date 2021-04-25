<script context="module" lang="ts">
	import '../app.css';
	import { authGuard } from '$lib/core/AuthGuard';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit/types.internal';

	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	import { Button, Spinner, Row, Container, Col, Form, FormGroup, Label, Input } from 'sveltestrap';

	import { isAuthed } from '$lib/stores/SessionStore';
	import { loadToastr } from '$lib/core/Toastr';

	loadToastr();

	export async function load({ page, fetch, session, context }: LoadInput): Promise<LoadOutput> {
		return await authGuard({ page, fetch, session, context });
	}
</script>

<main>
	<Navbar />
	<Container>
		<Col>
			<!-- {#if isAuthed} -->
			<slot />
			<!-- {:else}
				<Login />
			{/if} -->
		</Col>
	</Container>
</main>
