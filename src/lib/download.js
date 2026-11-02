import { addDays, format, parseISO } from 'date-fns';

// Datei herunterladen
export function download(text, filename, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
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
        `DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        `SUMMARY:${escapeText(issue.title)}`,
        `DESCRIPTION:${escapeText(issue.description)}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    download(ics, 'issue.ics', 'text/calendar;charset=utf-8');
}