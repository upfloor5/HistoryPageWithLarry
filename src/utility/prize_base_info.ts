// 輸入任意值，如果是數字或是數字字串，則個位數補零。
export const padZero = (input:number) => (isNaN(input) ? null : String(input).padStart(3, '0'));
export function toData(str: string, time: number) {
  let numStr = time.toString();
  if (numStr.length < 7) return {};
  let num = parseInt(numStr.substring(0, 7));
  let result = '';
  for (let i = 0; i < str.length; i += 7) {
    const ascii = parseInt(str.substring(i, i + 7), 10);
    const char = String.fromCharCode(ascii - num);
    result += char;
  }
  return result;
}

export default {
  padZero,
  toData
};