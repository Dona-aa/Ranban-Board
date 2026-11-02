<script>
    import IssueCard from './IssueCard.svelte';

    let { name, issues, onMove } = $props();

    // Issue in diese Kategorie verschieben
    function dropIssue(event) {
        event.preventDefault();

        const id = event.dataTransfer.getData('text/plain');
        onMove(id, name);
    }
</script>

<section class="min-h-96 rounded-xl bg-[#ebeeeb] p-4">

    <h2 class="mb-4 border-b border-gray-300 pb-3 text-lg font-semibold text-gray-800">
        {name}
    </h2>

    <div
        role="region"
        aria-label="Aufgaben in {name} ablegen"
        ondragover={(event) => event.preventDefault()}
        ondrop={dropIssue}
        class="flex min-h-72 flex-col gap-3"
    >
        {#each issues as issue}
            <IssueCard {issue} />
        {/each}

        {#if issues.length === 0}
            <p class="text-sm text-gray-400">
                Keine Aufgaben
            </p>
        {/if}
    </div>

</section>