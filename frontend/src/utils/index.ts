
export function formatMinutes(totalMins: number): string {
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;

    const hh = String(hours);
    const mm = String(mins).padStart(2, '0');

    return `${hh}h${mm}m`

}