/***
 * @file:
 * @author: caojianping
 * @Date: 2023-03-29 15:26:08
 */

/**
 * 判断数据是否为Undefined或者Null
 * @param data 数据
 * @returns 返回判断结果
 */
export function isUndefinedOrNull(data: any): boolean {
  return (
    Object.prototype.toString.call(data) === '[object Undefined]' ||
    Object.prototype.toString.call(data) === '[object Null]'
  );
}
