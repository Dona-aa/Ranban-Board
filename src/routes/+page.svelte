<script>
    // Die vier Kategorien des Kanban Boards
    let lanes = ['Do', 'Doing', 'Done', 'Archiv'];
</script>

<svelte:head>
    <title>Kanban Board</title>
</svelte:head>

<main class="min-h-screen bg-[#f7f7f5] p-8">

    <div class="mx-auto max-w-7xl">

        <header class="mb-10 flex items-center justify-between">
            <div>
                <h1 class="text-4xl font-semibold text-gray-900">
                    Kanban Board
                </h1>

                <p class="mt-2 text-gray-500">
                    Organisiere deine Aufgaben.
                </p>
            </div>
        </header>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            {#each lanes as lane}

                <section class="min-h-96 rounded-xl bg-[#ebeeeb] p-4">

                    <h2 class="mb-4 border-b border-gray-300 pb-3 text-lg font-semibold text-gray-800">
                        {lane}
                    </h2>

                    <p class="text-sm text-gray-400">
                        Keine Aufgaben
                    </p>

                </section>

            {/each}

        </div>

    </div>

</main>