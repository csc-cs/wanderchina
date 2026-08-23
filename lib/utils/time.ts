import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatRelativeTime(isoString: string): string {
  const date = dayjs(isoString);
  const now = dayjs();
  const diffMinutes = now.diff(date, 'minute');

  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffMinutes < 60 * 24) return `${Math.floor(diffMinutes / 60)}h ago`;
  if (diffMinutes < 60 * 24 * 7) return `${Math.floor(diffMinutes / (60 * 24))}d ago`;
  return date.format('MMM D');
}