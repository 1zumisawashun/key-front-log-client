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
  NOTION_DATABASE_ID,
  NOTION_INTEGRATION_TOKEN,
} from '../../constants/script-properties';

export function sendToNotion({ payload }: { payload: any }) {
  const url = 'https://api.notion.com/v1/pages';
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + NOTION_INTEGRATION_TOKEN,
      'Notion-Version': '2022-06-28',
    },
    payload: JSON.stringify(payload),
  };
  UrlFetchApp.fetch(url, options as any);
}

export function createFaq({
  question,
  answer,
}: {
  question: any;
  answer: any;
}) {
  const payload = {
    parent: {
      database_id: NOTION_DATABASE_ID,
    },
    properties: {
      Question: {
        title: [
          {
            text: {
              content: question,
            },
          },
        ],
      },
      Answer: {
        rich_text: [
          {
            text: {
              content: answer,
            },
          },
        ],
      },
    },
  };
  return payload;
}
