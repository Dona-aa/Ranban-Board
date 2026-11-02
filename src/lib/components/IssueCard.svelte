<script>
    import { format, parseISO, isBefore, startOfDay } from 'date-fns';
    import { de } from 'date-fns/locale';
    import { exportICS } from '#lib/download.js';

    let { issue } = $props();

    // Prüfen, ob das Issue überfällig ist
    let overdue = $derived(
        isBefore(parseISO(issue.dueDate), startOfDay(new Date()))
    );

    // ID des Issues beim Ziehen speichern
    function startDrag(event) {
        event.dataTransfer.setData('text/plain', String(issue.id));
        event.dataTransfer.effectAllowed = 'move';
    }

    // Issue über die Web Share API teilen
    async function shareIssue() {
        const text = `${issue.title}\n${issue.description}\nFällig: ${issue.dueDate}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: issue.title,
                    text: text
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    alert('Teilen fehlgeschlagen.');
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(text);
                alert('Issue wurde kopiert!');
            } catch {
                alert('Teilen wird nicht unterstützt.');
            }
        }
    }
</script>

<article
    draggable="true"
    ondragstart={startDrag}
    class="cursor-grab rounded-lg border bg-white p-4 shadow-sm active:cursor-grabbing {overdue ? 'border-red-400' : 'border-gray-200'}"
>
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

    <p class="mt-2 whitespace-pre-wrap text-sm text-gray-500">
        {issue.description}
    </p>

    <div class="mt-4 space-y-1 text-xs">
        <p class="text-gray-400">
            Erstellt: {format(parseISO(issue.createdAt), 'dd.MM.yyyy')}
        </p>

        <p class={overdue ? 'font-semibold text-red-600' : 'text-gray-500'}>
            {overdue ? '⚠ Überfällig:' : 'Fällig:'}
            {format(parseISO(issue.dueDate), 'dd. MMM yyyy', { locale: de })}
        </p>
    </div>

    <div class="mt-4 flex gap-4 border-t border-gray-100 pt-3">
        <button
            onclick={() => exportICS(issue)}
            class="text-sm font-medium text-[#315c47] hover:underline"
        >
            ICS exportieren
        </button>

        <button
            onclick={shareIssue}
            class="text-sm font-medium text-[#315c47] hover:underline"
        >
            Teilen
        </button>
    </div>
</article>