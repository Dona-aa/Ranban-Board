<script>
    import IssueCard from './IssueCard.svelte';

    // Name und Aufgaben von der Hauptseite bekommen
    let { name, issues } = $props();
</script>

<section class="min-h-96 rounded-xl bg-[#ebeeeb] p-4">

    <h2 class="mb-4 border-b border-gray-300 pb-3 text-lg font-semibold text-gray-800">
        {name}
    </h2>

    <div class="flex flex-col gap-3">

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