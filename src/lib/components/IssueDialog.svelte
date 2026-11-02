<script>
    // Funktion von der Hauptseite bekommen
    let { onCreate } = $props();

    let dialog;

    function createIssue(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        const issue = {
            id: crypto.randomUUID(),
            title: data.get('title'),
            description: data.get('description'),
            createdAt: new Date().toISOString(),
            dueDate: data.get('dueDate'),
            points: Number(data.get('points')),
            priority: data.get('priority'),
            lane: 'Do'
        };

        onCreate(issue);

        form.reset();
        dialog.close();
    }
</script>

<button
    onclick={() => dialog.showModal()}
    class="rounded-lg bg-[#315c47] px-5 py-3 text-sm font-semibold text-white hover:bg-[#254936]"
>
    + Neues Issue
</button>

<dialog
    bind:this={dialog}
    class="m-auto w-full max-w-md rounded-xl bg-white p-6 shadow-xl backdrop:bg-black/40"
>
    <h2 class="mb-5 text-2xl font-semibold">Neues Issue</h2>

    <form onsubmit={createIssue} class="flex flex-col gap-4">

        <label class="flex flex-col gap-1 text-sm">
            Titel
            <input
                name="title"
                required
                class="rounded-lg border border-gray-300 p-2"
            />
        </label>

        <label class="flex flex-col gap-1 text-sm">
            Beschreibung
            <textarea
                name="description"
                required
                class="rounded-lg border border-gray-300 p-2"
            ></textarea>
        </label>

        <label class="flex flex-col gap-1 text-sm">
            Fälligkeitsdatum
            <input
                name="dueDate"
                type="date"
                required
                class="rounded-lg border border-gray-300 p-2"
            />
        </label>

        <label class="flex flex-col gap-1 text-sm">
            Story Points
            <input
                name="points"
                type="number"
                min="0"
                value="1"
                required
                class="rounded-lg border border-gray-300 p-2"
            />
        </label>

        <label class="flex flex-col gap-1 text-sm">
            Priorität
            <select
                name="priority"
                class="rounded-lg border border-gray-300 p-2"
            >
                <option>Niedrig</option>
                <option selected>Mittel</option>
                <option>Hoch</option>
            </select>
        </label>

        <div class="mt-3 flex justify-end gap-3">
            <button
                type="button"
                onclick={() => dialog.close()}
                class="rounded-lg border border-gray-300 px-4 py-2"
            >
                Abbrechen
            </button>

            <button
                type="submit"
                class="rounded-lg bg-[#315c47] px-4 py-2 text-white"
            >
                Erstellen
            </button>
        </div>

    </form>
</dialog>