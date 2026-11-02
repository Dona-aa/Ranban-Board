<script>
    import { format, parseISO, isBefore, startOfDay } from 'date-fns';
    import { de } from 'date-fns/locale';

    let { issue } = $props();

    // Prüfen, ob das Fälligkeitsdatum schon vorbei ist
    let overdue = $derived(
        isBefore(parseISO(issue.dueDate), startOfDay(new Date()))
    );

    // ID des Issues beim Ziehen speichern
    function startDrag(event) {
        event.dataTransfer.setData('text/plain', String(issue.id));
    }
</script>

<article
    draggable="true"
    ondragstart={startDrag}
    class="cursor-grab rounded-lg border bg-white p-4 shadow-sm {overdue ? 'border-red-400' : 'border-gray-200'}"
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

    <p class="mt-2 text-sm text-gray-500">
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
</article>