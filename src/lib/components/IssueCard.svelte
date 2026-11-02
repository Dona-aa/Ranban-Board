<script>
    // Die Informationen eines Issues bekommen
    let { issue } = $props();
</script>

<article class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

    <div class="mb-3 flex items-center justify-between">
        <span class="rounded bg-gray-100 px-2 py-1 text-xs">
            {issue.priority}
        </span>

        <span class="text-xs text-gray-500">
            {issue.points} SP
        </span>
    </div>

    <h3 class="font-semibold text-gray-900">
        {issue.title}
    </h3>

    <p class="mt-2 text-sm text-gray-500">
        {issue.description}
    </p>

    <p class="mt-4 text-xs text-gray-400">
        Fällig: {issue.dueDate}
    </p>

</article>