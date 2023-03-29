# tsx-cookie

Cookie的TypeScript封装，提供通用的API方法，同时支持泛型方法。

## Installing
Using npm:
```bash
$ npm install tsx-cookie
```

## Example
```ts
import {Cookie, CookieOption, CookieStore} from 'tsx-cookie';

const key1 = 'cookie_number';
const value1 = 666888;
const expires1 = 3600 * 1000 * 2;// 过期时间
Cookie.setItem<number>(key1, value1, expires1);// return true/false;
Cookie.getItem<number>(key1);// return 666888/null;
Cookie.removeItem(key1);// return true/false;

const key2 = 'cookie_string';
const value2 = 'hello world';
const expires2 = 3600 * 1000 * 2;
Cookie.setItem<string>(key2, value2, expires2);// return true/false;
Cookie.getItem<string>(key2);// return 'hello world'/null;
Cookie.removeItem(key2);// return true/false;

Cookie.getAllKeys();// return ['cookie_number', 'cookie_string']
```

## API
```ts
/**
 * cookie选项接口
 */
export interface ICookieOption {
  // 名称
  name: string;

  // 数值
  value: any;

  // 过期时间，单位：毫秒
  expires?: number;

  // 路径
  path?: string;
}
```
##### Cookie.setItem<T>(name: string, value: T [, expires: number] [, path: string]): boolean
##### Cookie.setItems(options: Array<ICookieOption>): boolean
##### Cookie.getItem<T>(name: string): T | null
##### Cookie.getAllKeys(): Array<string>
##### Cookie.removeItem(name: string[, path: string]): boolean
##### Cookie.clear([, path: string]): void
