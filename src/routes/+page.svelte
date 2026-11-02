<script>
    import Lane from '#lib/components/Lane.svelte';

    // Die vier Kategorien des Boards
    let lanes = ['Do', 'Doing', 'Done', 'Archiv'];
</script>

<svelte:head>
    <title>Kanban Board</title>
</svelte:head>

<main class="min-h-screen bg-[#f7f7f5] p-8">

    <div class="mx-auto max-w-7xl">

        <header class="mb-10">
            <h1 class="text-4xl font-semibold text-gray-900">
                Kanban Board
            </h1>

            <p class="mt-2 text-gray-500">
                Organisiere deine Aufgaben.
            </p>
        </header>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            {#each lanes as lane}
                <Lane name={lane} />
            {/each}

        </div>

    </div>

</main>