import { addDays, format, parseISO } from 'date-fns';

// Datei herunterladen
export function download(text, filename, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Ein Issue als Kalenderdatei exportieren
export function exportICS(issue) {
    const start = issue.dueDate.replaceAll('-', '');
    const end = format(addDays(parseISO(issue.dueDate), 1), 'yyyyMMdd');

    const escapeText = (text) => String(text)
        .replaceAll('\\', '\\\\')
        .replaceAll('\n', '\\n')
        .replaceAll(',', '\\,')
        .replaceAll(';', '\\;');

    const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Kanban Board//DE',
        'BEGIN:VEVENT',
        `UID:${issue.id}@kanban-board`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        `SUMMARY:${escapeText(issue.title)}`,
        `DESCRIPTION:${escapeText(issue.description)}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    download(ics, 'issue.ics', 'text/calendar;charset=utf-8');
}

// Alle Issues als CSV exportieren
export function exportCSV(issues) {
    const columns = ['title', 'description', 'createdAt', 'dueDate', 'points', 'priority', 'lane'];

    // Texte mit Anführungszeichen für CSV vorbereiten
    const row = (values) => values
        .map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`)
        .join(';');

    const csv = [
        row(columns),
        ...issues.map((issue) => row(columns.map((column) => issue[column])))
    ].join('\r\n');

    download('\uFEFF' + csv, 'kanban-issues.csv', 'text/csv;charset=utf-8');
}