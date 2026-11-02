<script>
    import Lane from '#lib/components/Lane.svelte';

    let lanes = ['Do', 'Doing', 'Done', 'Archiv'];

    // Beispielaufgaben zum Testen
    let issues = [
        {
            id: 1,
            title: 'Website erstellen',
            description: 'Die Startseite programmieren.',
            createdAt: '2026-11-02',
            dueDate: '2026-11-10',
            points: 5,
            priority: 'Hoch',
            lane: 'Do'
        },
        {
            id: 2,
            title: 'Design verbessern',
            description: 'Farben und Abstände anpassen.',
            createdAt: '2026-11-02',
            dueDate: '2026-11-12',
            points: 3,
            priority: 'Mittel',
            lane: 'Doing'
        }
    ];
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
                <Lane
                    name={lane}
                    issues={issues.filter((issue) => issue.lane === lane)}
                />
            {/each}

        </div>

    </div>

</main>