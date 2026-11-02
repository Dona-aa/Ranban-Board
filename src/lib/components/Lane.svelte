<script>
    // Name der Kategorie von der Hauptseite bekommen
    let { name } = $props();
</script>

<section class="min-h-96 rounded-xl bg-[#ebeeeb] p-4">

    <h2 class="mb-4 border-b border-gray-300 pb-3 text-lg font-semibold text-gray-800">
        {name}
    </h2>

    <p class="text-sm text-gray-400">
        Keine Aufgaben
    </p>

</section>