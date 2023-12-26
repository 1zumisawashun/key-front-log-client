/* Google MeetのURLを作成 */
export function getMeetUrl() {
  const calendarId = 'primary'; // 一時的にイベントを作成するカレンダーID
  const dt = new Date();
  const date =
    dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
  const requestId = Math.random().toString(32).substring(2); // 適当な文字列を作る

  if (!Calendar.Events) return;

  const events = Calendar.Events.insert(
    {
      summary: 'tmp_event',
      // singleEvents: true,
      // allDayEvent: true,
      start: { date },
      end: { date },
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
    calendarId,
    { conferenceDataVersion: 1 }
  );

  if (!events.id) return;
  // MeetURLだけあれば良いので、作成後に予定そのものは削除する
  Calendar.Events.remove(calendarId, events.id);

  if (events?.conferenceData?.createRequest?.status?.statusCode === 'success') {
    const entryPoints = events?.conferenceData?.entryPoints;
    if (!entryPoints) return;
    const meetUrl = entryPoints[0].uri;
    return meetUrl;
  }
}
