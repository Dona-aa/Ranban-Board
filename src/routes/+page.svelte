<script>
    import { onMount } from 'svelte';
    import Lane from '#lib/components/Lane.svelte';
    import IssueDialog from '#lib/components/IssueDialog.svelte';
    import { exportCSV } from '#lib/download.js';

    let lanes = ['Do', 'Doing', 'Done', 'Archiv'];
    let issues = $state([]);
    let notificationPermission = $state('default');

    // Gespeicherte Issues laden
    onMount(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('issues') || '[]');
            issues = Array.isArray(saved) ? saved : [];
        } catch {
            issues = [];
        }

        if ('Notification' in window) {
            notificationPermission = Notification.permission;
        }
    });

    // Issues speichern
    function saveIssues() {
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    // Neues Issue hinzufügen
    function addIssue(issue) {
        issues.push(issue);
        saveIssues();
    }

    // Benachrichtigungen erlauben
    async function enableNotifications() {
        if ('Notification' in window) {
            notificationPermission = await Notification.requestPermission();
        }
    }

    // Benachrichtigung anzeigen
    function notify(issue) {
        if (notificationPermission === 'granted') {
            try {
                new Notification('Issue abgeschlossen!', {
                    body: issue.title
                });
            } catch {
                // Manche Browser unterstützen diese Methode nicht.
            }
        }
    }

    // Issue verschieben und speichern
    function moveIssue(id, lane) {
        const issue = issues.find((item) => String(item.id) === String(id));

        if (issue && issue.lane !== lane) {
            issue.lane = lane;
            saveIssues();

            if (lane === 'Done') {
                notify(issue);
            }
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

            <div class="flex flex-wrap items-center gap-3">

                {#if notificationPermission === 'default'}
                    <button
                        onclick={enableNotifications}
                        class="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium hover:bg-gray-100"
                    >
                        Mitteilungen aktivieren
                    </button>
                {/if}

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