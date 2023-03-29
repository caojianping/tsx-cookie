/***
 * @file:
 * @author: caojianping
 * @Date: 2023-03-29 15:33:42
 */

import { isUndefinedOrNull } from './utils';

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

/**
 * cookie类
 */
export default class Cookie {
  /**
   * 设置过期时间
   * @param expires 过期时间，单位：毫秒
   * @returns 返回过期时间配置
   */
  private static _setExpires(expires?: number): string {
    if (isUndefinedOrNull(expires)) return '';
    const date = new Date();
    date.setTime(date.getTime() + (expires || 0));
    return ` expires=${date.toUTCString()};`;
  }

  /**
   * 设置路径
   * @param path 路径
   * @returns 返回路径配置
   */
  private static _setPath(path?: string): string {
    if (isUndefinedOrNull(path)) return '';
    return ` path=${path};`;
  }

  /**
   * 设置单个cookie
   * @param name 名称
   * @param value 数值
   * @param expires 过期时间，单位：毫秒
   * @param path 路径
   * @returns 返回设置结果
   */
  public static setItem<T = object>(name: string, value: T, expires?: number, path?: string): boolean {
    if (!name) return false;
    if (value === undefined) return false;

    try {
      document.cookie = (function (svalue: string) {
        return `${name}=${svalue};${Cookie._setExpires(expires)}${Cookie._setPath(path)}`;
      })(JSON.stringify(value));
      return true;
    } catch (error: any) {
      throw `Cookie's setItem error: ${JSON.stringify(error)}!`;
    }
  }

  /**
   * 设置多个cookie
   * @param options 选项集合
   * @returns 返回设置结果
   */
  public static setItems(options: Array<ICookieOption>): boolean {
    options.forEach((option: ICookieOption) => {
      Cookie.setItem(option.name, option.value, option.expires, option.path);
    });
    return true;
  }

  /**
   * 获取cookie的key集合
   * @returns 返回key集合
   */
  public static getAllKeys(): Array<string> {
    const parts = document.cookie.split(';');
    if (parts.length <= 0) return [];

    const result: Array<string> = [];
    for (let i = 0; i < parts.length; i++) {
      const part = (parts[i] || '').trim();
      result.push(part.substring(0, part.indexOf('=')));
    }
    return result;
  }

  /**
   * 获取cookie
   * @param name 名称
   * @returns 返回cookie数据
   */
  public static getItem<T = object>(name: string): T | null {
    if (!name) return null;

    name = `${name}=`;
    const parts = document.cookie.split(';');
    if (parts.length <= 0) return null;

    let value: any = '';
    for (let i = 0; i < parts.length; i++) {
      const part = (parts[i] || '').trim();
      if (part.indexOf(name) === 0) {
        value = part.substring(name.length, part.length);
        break;
      }
    }

    try {
      if (!value) return null;
      return <T>JSON.parse(value);
    } catch (error: any) {
      throw 'Cookie deserialization failed!';
    }
  }

  /**
   * 移除cookie
   * @param name 名称
   * @param path 路径
   * @returns 返回移除结果
   */
  public static removeItem(name: string, path?: string): boolean {
    if (!name) return false;
    this.setItem(name, null, -1, path);
    return true;
  }

  /**
   * 清空cookie
   * @param path 路径
   */
  public static clear(path?: string): void {
    const keys = Cookie.getAllKeys();
    keys.forEach(function (key: string) {
      Cookie.removeItem(key, path);
    });
  }
}
