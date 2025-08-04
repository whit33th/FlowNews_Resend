/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as crons from "../crons.js";
import type * as emailJobs from "../emailJobs.js";
import type * as emailMutations from "../emailMutations.js";
import type * as emails_AchievementUnlock from "../emails/AchievementUnlock.js";
import type * as emails_NewArticleNotification from "../emails/NewArticleNotification.js";
import type * as emails_PostCreatedEmail from "../emails/PostCreatedEmail.js";
import type * as emails_ViewsMilestoneEmail from "../emails/ViewsMilestoneEmail.js";
import type * as emails_WeeklyDigest from "../emails/WeeklyDigest.js";
import type * as helpers_shared from "../helpers/shared.js";
import type * as helpers_useStablePaginatedQuery from "../helpers/useStablePaginatedQuery.js";
import type * as http from "../http.js";
import type * as news from "../news.js";
import type * as profile from "../profile.js";
import type * as sendEmails from "../sendEmails.js";
import type * as subscribers from "../subscribers.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  crons: typeof crons;
  emailJobs: typeof emailJobs;
  emailMutations: typeof emailMutations;
  "emails/AchievementUnlock": typeof emails_AchievementUnlock;
  "emails/NewArticleNotification": typeof emails_NewArticleNotification;
  "emails/PostCreatedEmail": typeof emails_PostCreatedEmail;
  "emails/ViewsMilestoneEmail": typeof emails_ViewsMilestoneEmail;
  "emails/WeeklyDigest": typeof emails_WeeklyDigest;
  "helpers/shared": typeof helpers_shared;
  "helpers/useStablePaginatedQuery": typeof helpers_useStablePaginatedQuery;
  http: typeof http;
  news: typeof news;
  profile: typeof profile;
  sendEmails: typeof sendEmails;
  subscribers: typeof subscribers;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {
  resend: {
    lib: {
      cancelEmail: FunctionReference<
        "mutation",
        "internal",
        { emailId: string },
        null
      >;
      cleanupAbandonedEmails: FunctionReference<
        "mutation",
        "internal",
        { olderThan?: number },
        null
      >;
      cleanupOldEmails: FunctionReference<
        "mutation",
        "internal",
        { olderThan?: number },
        null
      >;
      get: FunctionReference<
        "query",
        "internal",
        { emailId: string },
        {
          complained: boolean;
          createdAt: number;
          errorMessage?: string;
          finalizedAt: number;
          from: string;
          headers?: Array<{ name: string; value: string }>;
          html?: string;
          opened: boolean;
          replyTo: Array<string>;
          resendId?: string;
          segment: number;
          status:
            | "waiting"
            | "queued"
            | "cancelled"
            | "sent"
            | "delivered"
            | "delivery_delayed"
            | "bounced"
            | "failed";
          subject: string;
          text?: string;
          to: string;
        } | null
      >;
      getStatus: FunctionReference<
        "query",
        "internal",
        { emailId: string },
        {
          complained: boolean;
          errorMessage: string | null;
          opened: boolean;
          status:
            | "waiting"
            | "queued"
            | "cancelled"
            | "sent"
            | "delivered"
            | "delivery_delayed"
            | "bounced"
            | "failed";
        } | null
      >;
      handleEmailEvent: FunctionReference<
        "mutation",
        "internal",
        { event: any },
        null
      >;
      sendEmail: FunctionReference<
        "mutation",
        "internal",
        {
          from: string;
          headers?: Array<{ name: string; value: string }>;
          html?: string;
          options: {
            apiKey: string;
            initialBackoffMs: number;
            onEmailEvent?: { fnHandle: string };
            retryAttempts: number;
            testMode: boolean;
          };
          replyTo?: Array<string>;
          subject: string;
          text?: string;
          to: string;
        },
        string
      >;
    };
  };
};
