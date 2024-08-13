export function formatToTimeAgo(date: string) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const time = new Date(date).getTime();
  const now = new Date().getTime();

  let formatType: Intl.RelativeTimeFormatUnit;
  let diff = time - now;

  if (Math.abs(diff) < minute) {
    formatType = "seconds";
    diff = Math.round(diff / second);
  } else if (Math.abs(diff) < hour) {
    formatType = "minutes";
    diff = Math.round(diff / minute);
  } else if (Math.abs(diff) < day) {
    formatType = "hours";
    diff = Math.round(diff / hour);
  } else {
    formatType = "days";
    diff = Math.round(diff / day);
  }

  // Intl( 다국어 지원 ) 국제화 관련된 api -3 -> 3일전
  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, formatType);
}
export function formatKorTime(date: string) {
  const time = new Date(date).toLocaleDateString();

  return time;
}
