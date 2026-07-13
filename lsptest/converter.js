/**
 * HTMLをJSXに一発変換する関数
 */
function convertHtmlToJsx(html) {
  if (!html) return '';

  let jsx = html;

  // 1. class と for の変換（コメントに惑わされないように、スペースを含めて厳密に置換する）
  jsx = jsx.replace(/ class=/g, ' className=');
  jsx = jsx.replace(/ for=/g, ' htmlFor=');

  // 2. 閉じタグ（img, input, br）の自動修正
  // ヒント：複雑な正規表現はやめて、単純に ">" を " />" に置換してから " / />" になっちゃったやつを戻す力技にする
  jsx = jsx.replace(/<(\s*(img|input|br)[^>]*?)>/g, '<$1 />');

  // 3. style属性の変換（CSS文字列をJSXオブジェクトに変換）
  jsx = jsx.replace(/style="([^"]*)"/g, (match, cssString) => {
    const styleObject = {};
    cssString.split(';').forEach((rule) => {
      const [property, value] = rule.split(':').map(s => s.trim());
      if (property && value) {
        // CSSプロパティをキャメルケースに変換
        const camelCaseProperty = property.replace(/-([a-z])/g, (m, p1) => p1.toUpperCase());
        styleObject[camelCaseProperty] = value;
      }
    });
    return `style={${JSON.stringify(styleObject)}}`;
  });

  // 4. コメントの変換
  jsx = jsx.replace(/<!--(.*?)-->/g, '{/*$1*/}');

  // 5. 属性値のクォートを統一（シングルクォートに変換）
  jsx = jsx.replace(/"([^"]*)"/g, "'$1'");

  return jsx;
}

// 使用例
const htmlInput = `
<div class="container" style="background-color: red; color: white;">
  <label for="name">Name:</label>
  <input type="text" id="name" />
  <img src="image.png" />
</div>
`;

const jsxOutput = convertHtmlToJsx(htmlInput);
console.log(jsxOutput);
