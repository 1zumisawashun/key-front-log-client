/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  SLACK_INCOMING_WEBHOOKS,
  BOT_USER_OAUTH_TOKEN,
} from '../../constants/script-properties';

type SendToSlackType = {
  channelId?: string;
  thread_ts?: string;
  message?: any;
};

export const sendToSlack = ({
  channelId,
  thread_ts,
  message,
}: SendToSlackType) => {
  // NOTE:スレッドに投げる時はtoken必要だったっけ？
  const payload = JSON.stringify({
    token: BOT_USER_OAUTH_TOKEN,
    channel: channelId,
    text: JSON.stringify(message),
    thread_ts: thread_ts,
  });

  UrlFetchApp.fetch(SLACK_INCOMING_WEBHOOKS, {
    method: 'post',
    contentType: 'application/json',
    payload: payload,
  });
};
