<script>
    import { onMount } from 'svelte';
    import Lane from '#lib/components/Lane.svelte';
    import IssueDialog from '#lib/components/IssueDialog.svelte';
    import { exportCSV } from '#lib/download.js';

    let lanes = ['Do', 'Doing', 'Done', 'Archiv'];
    let issues = $state([]);

    // Gespeicherte Issues laden
    onMount(() => {
        try {
            issues = JSON.parse(localStorage.getItem('issues') || '[]');
        } catch {
            issues = [];
        }
    });

    // Issues im Browser speichern
    function saveIssues() {
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    function addIssue(issue) {
        issues.push(issue);
        saveIssues();
    }

    // Issue verschieben und speichern
    function moveIssue(id, lane) {
        const issue = issues.find((item) => String(item.id) === String(id));

        if (issue) {
            issue.lane = lane;
            saveIssues();
        }
    }
</script>

<svelte:head>
    <title>Kanban Board</title>
</svelte:head>

<main class="min-h-screen bg-[#f7f7f5] p-8">
    <div class="mx-auto max-w-7xl">

        <header class="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 class="text-4xl font-semibold text-gray-900">
                    Kanban Board
                </h1>

                <p class="mt-2 text-gray-500">
                    Organisiere deine Aufgaben.
                </p>
            </div>

            <div class="flex items-center gap-3">
                <button
                    onclick={() => exportCSV(issues)}
                    class="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    CSV exportieren
                </button>

                <IssueDialog onCreate={addIssue} />
            </div>
        </header>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {#each lanes as lane}
                <Lane
                    name={lane}
                    issues={issues.filter((issue) => issue.lane === lane)}
                    onMove={moveIssue}
                />
            {/each}
        </div>

    </div>
</main>