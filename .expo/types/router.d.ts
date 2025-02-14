/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `${'/(tabs)'}/magnify` | `/magnify`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/analytics` | `/analytics`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/notifications` | `/notifications`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/messages` | `/messages`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/explore` | `/explore`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `${'/(tabs)'}/magnify` | `/magnify`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/analytics` | `/analytics`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/notifications` | `/notifications`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/messages` | `/messages`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/explore` | `/explore`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `${'/(tabs)'}/magnify${`?${string}` | `#${string}` | ''}` | `/magnify${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/analytics${`?${string}` | `#${string}` | ''}` | `/analytics${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/notifications${`?${string}` | `#${string}` | ''}` | `/notifications${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/messages${`?${string}` | `#${string}` | ''}` | `/messages${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/explore${`?${string}` | `#${string}` | ''}` | `/explore${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `${'/(tabs)'}/magnify` | `/magnify`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/analytics` | `/analytics`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/notifications` | `/notifications`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/messages` | `/messages`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/explore` | `/explore`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | `/+not-found` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
