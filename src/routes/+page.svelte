<script>
    import { onMount } from 'svelte';
    import Lane from '#lib/components/Lane.svelte';
    import IssueDialog from '#lib/components/IssueDialog.svelte';

    let lanes = ['Do', 'Doing', 'Done', 'Archiv'];

    let issues = $state([]);

    // Gespeicherte Aufgaben beim Start laden
    onMount(() => {
        try {
            issues = JSON.parse(localStorage.getItem('issues') || '[]');
        } catch {
            issues = [];
        }
    });

    // Alle Aufgaben im Browser speichern
    function saveIssues() {
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    function addIssue(issue) {
        issues.push(issue);
        saveIssues();
    }

    // Aufgabe verschieben und neue Position speichern
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

        <header class="mb-10 flex items-center justify-between gap-4">

            <div>
                <h1 class="text-4xl font-semibold text-gray-900">
                    Kanban Board
                </h1>

                <p class="mt-2 text-gray-500">
                    Organisiere deine Aufgaben.
                </p>
            </div>

            <IssueDialog onCreate={addIssue} />

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