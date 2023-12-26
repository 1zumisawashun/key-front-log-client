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
import { sendToSlack } from '../../functions/helpers';

export function client(e: any) {
  const params = JSON.parse(e.postData.getDataAsString());

  // NOTE:SlackのEvent SubscriptionsのRequest Verification用
  if (params.type === 'url_verification') {
    return ContentService.createTextOutput(params.challenge);
  }

  const event = params.event;
  const type = event.type;
  const bot_id = event?.bot_id;

  // NOTE:Slack Botによるメンションを無視する（無限ループを回避する）
  // NOTE:自分自身（mosukun Bot）だけは無視して他のbotとの会話は可能にする
  sendToSlack({
    // channelId: event.channel,
    // thread_ts: event.thread_ts || event.ts,
    message: bot_id ?? params.event.text,
  });
  // if (bot_id === 'B05CW8PF316') return;
  if ('subtype' in params.event) return;

  // NOTE:Slackの3秒ルールで発生するリトライをキャッシュする
  const cache = CacheService.getScriptCache();
  if (cache.get(params.event_id) === 'done') return;
  cache.put(params.event_id, 'done', 600);

  // NOTE:以下からメインの処理

  if (['message'].includes(type)) {
    // NOTE:RSS Bot以外は早期リターンする
    if (bot_id !== 'B03GXHC7BMF') return;

    // const channelId = event.channel;
    // const thread_ts = event.thread_ts || event.ts;

    // const message = getConversationsReplies(channelId, thread_ts);
    // const content = messageFormatter(message);
    // const text = getChatGptMessage(`日本語で要約してください。${content}`);

    // sendToSlack({ channelId, thread_ts, message: '' });
  }

  if (['reaction_added'].includes(type)) {
    // NOTE:「要約して」スタンプだけに反応させる
    if (event.reaction !== 'youyaku') return;

    // const channelId = event.item.channel;
    // const thread_ts = event.item.ts;

    // const message = getConversationsReplies(channelId, thread_ts);
    // const content = messageFormatter(message);
    // const text = getChatGptMessage(`日本語で要約してください。${content}`);

    // sendToSlack({ channelId, thread_ts, message: '' });
  }

  return;
}
