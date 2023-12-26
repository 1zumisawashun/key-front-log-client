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

export const SLACK_INCOMING_WEBHOOKS =
  PropertiesService.getScriptProperties().getProperty(
    'SLACK_INCOMING_WEBHOOKS'
  ) as string;

export const BOT_USER_OAUTH_TOKEN =
  PropertiesService.getScriptProperties().getProperty(
    'BOT_USER_OAUTH_TOKEN'
  ) as string;

export const NOTION_DATABASE_ID =
  PropertiesService.getScriptProperties().getProperty(
    'NOTION_DATABASE_ID'
  ) as string;

export const NOTION_INTEGRATION_TOKEN =
  PropertiesService.getScriptProperties().getProperty(
    'NOTION_INTEGRATION_TOKEN'
  ) as string;
