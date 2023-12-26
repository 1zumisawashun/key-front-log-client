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
import { hello } from './functions/helpers/example-module';
import { sendToSlack } from './functions/helpers/slack/send-to-slack';

console.log(hello());

const KEY_FRONT_BOT_ID = 'B06B4JMMUHL';
const GENBANEKO_BOT_ID = 'B06BY6EKA3B';

/* eslint-disable @typescript-eslint/no-unused-vars */
function doPost(e: GoogleAppsScript.Events.DoPost) {
  const params = JSON.parse(e.postData.contents);

  // NOTE:SlackのEvent SubscriptionsのRequest Verification用
  if (params.type === 'url_verification') {
    return ContentService.createTextOutput(params.challenge);
  }

  const { type, bot_id, text, reaction } = params.event;

  // NOTE:無限ループの回避
  if (bot_id === GENBANEKO_BOT_ID) return;

  // NOTE:Slackの3秒ルールで発生するリトライをキャッシュする
  const cache = CacheService.getScriptCache();
  if (cache.get(params.event_id) === 'done') return;
  cache.put(params.event_id, 'done', 600);

  if (['message'].includes(type)) {
    if (bot_id === KEY_FRONT_BOT_ID) {
      sendToSlack({ message: JSON.stringify(text) });
    }
  }

  if (['reaction_added'].includes(type)) {
    if (reaction === 'notion') {
      sendToSlack({ message: reaction });
    }
  }
}
