<script>
    import IssueCard from './IssueCard.svelte';

    let { name, issues, onMove } = $props();

    // Story Points der Kategorie berechnen
    let totalPoints = $derived(
        issues.reduce((sum, issue) => sum + issue.points, 0)
    );

    // Ablegen eines Issues erlauben
    function allowDrop(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    // Issue in diese Kategorie verschieben
    function dropIssue(event) {
        event.preventDefault();

        const id = event.dataTransfer.getData('text/plain');

        if (id) {
            onMove(id, name);
        }
    }
</script>

<section
    ondragover={allowDrop}
    ondrop={dropIssue}
    role="region"
    aria-label="Kategorie {name}"
    class="min-h-96 rounded-xl bg-[#ebeeeb] p-4"
>
    <div class="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
        <h2 class="text-lg font-semibold text-gray-800">
            {name}
        </h2>

        <span class="rounded-md bg-white px-3 py-1 text-sm font-medium text-gray-700">
            {totalPoints} SP
        </span>
    </div>

    <div class="flex min-h-72 flex-col gap-3">
        {#each issues as issue (issue.id)}
            <IssueCard {issue} />
        {/each}

        {#if issues.length === 0}
            <p class="text-sm text-gray-400">
                Keine Aufgaben
            </p>
        {/if}
    </div>
</section>