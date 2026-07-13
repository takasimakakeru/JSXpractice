/**
 * HTMLをJSXに一発変換する関数
 */
function convertHtmlToJsx(html) {
  if (!html) return '';

  let jsx = html;

  // 1. class と for の変換
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');

  // 2. 閉じタグ（img, input, br）の自動修正
  jsx = jsx.replace(/<(img|input|br)([^>]*)(?<!\/)>/g, '<$1$2 />');

  // 3. style属性のパース（ここが難しいのでLSPに任せる）
  // ヒント：style="background-color: red;" を style={{backgroundColor: "red"}} にする
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
    const styles = {};
    styleStr.split(';').forEach(style => {
      const [key, value] = style.split(':');
      if (key && value) {
        // ハイフンをキャメルケースに変換（例: background-color -> backgroundColor）
        const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styles[camelKey] = value.trim();
      }
    });
    // ここで改行して Tab キーを連打してみてください！戻り値をJSON形式で出力させるはずです
    

