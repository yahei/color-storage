// 初期化
function init() {
  // ウェブストレージからデータを読み出す
  colors = localStorage.getItem('colors');

  // 空だったらSolarizedをサンプルとしてセット
  if (!colors) {
    colors =
`[
  {"name": "base03 ", "hexColor": "#002b36", "comment": "Dark background"},
  {"name": "base02 ", "hexColor": "#073642", "comment": "Dark bg highlights"},
  {"name": "base01 ", "hexColor": "#586e75", "comment": "Dark comments / Light emphasized"},
  {"name": "base00 ", "hexColor": "#657b83", "comment": "Light body text"},
  {"name": "base0  ", "hexColor": "#839496", "comment": "Dark body text"},
  {"name": "base1  ", "hexColor": "#93a1a1", "comment": "Dark emphasized / Light comments"},
  {"name": "base2  ", "hexColor": "#eee8d5", "comment": "Light bg highlights"},
  {"name": "base3  ", "hexColor": "#fdf6e3", "comment": "Light background"},
  {"name": "yellow ", "hexColor": "#b58900", "comment": "Accent Colors"},
  {"name": "orange ", "hexColor": "#cb4b16", "comment": "Accent Colors"},
  {"name": "red    ", "hexColor": "#dc322f", "comment": "Accent Colors"},
  {"name": "magenta", "hexColor": "#d33682", "comment": "Accent Colors"},
  {"name": "violet ", "hexColor": "#6c71c4", "comment": "Accent Colors"},
  {"name": "blue   ", "hexColor": "#268bd2", "comment": "Accent Colors"},
  {"name": "cyan   ", "hexColor": "#2aa198", "comment": "Accent Colors"},
  {"name": "green  ", "hexColor": "#859900", "comment": "Accent Colors"}
]
`;

    // ローカルストレージに書き込む
    localStorage.setItem('colors', colors);
  }
  
  // リスト作成
  setColumns('contents-colors', JSON.parse(colors));

  // 編集エリアにjsonを書き込む
  document.getElementById('edit-json').value = colors;

}

// リストを受け取って色をまとめてセットする
function setColumns(elementId, colorList) {
  // リストのdiv要素をリセット
  document.getElementById('contents-colors').innerHTML = '';

  // リストを作成
  colorList.forEach(element => {
    addColumn(
      elementId,
      element.name,
      element.hexColor,
      element.comment
    );
  });
}

// 色の追加
function addColumn(elementId, name, hexColor, comment='') {
  /*
   * elementID  : この要素を追加するdivのid名
   * label      : 色の名前
   * hexColor   : 色の16進数コード
   * comment    : この色についての説明
   * background : 背景化可能かどうか
   */

  // 追加するdiv要素を作成
  var newColor = document.createElement('div');

  // 色の名前
  {
    element = document.createElement('div');
    element.className = 'colorName';
    element.textContent = name;
    newColor.appendChild(element);
  }

  // 16進数コード
  {
    element = document.createElement('div');
    element.className = 'hexColor';
    element.textContent = hexColor;
    newColor.appendChild(element);
  }

  // コメント
  {
    element = document.createElement('div');
    element.className = 'colorComment';
    element.textContent = comment;
    newColor.appendChild(element);
  }

  // スタイルを設定
  newColor.style.color = hexColor;
  newColor.className = 'colorListItem';

  // 色をコピーするボタンを追加
  {
    let element = document.createElement('div');
    element.className = 'button';
    element.innerText = "copy";
    element.addEventListener('click', () => {
      // クリップボードにコピー
      navigator.clipboard.writeText(hexColor);
      // 文字を変える
      element.innerText = "copied!";
      // 一定時間後に戻す
      window.setTimeout(() => {
        element.innerText = "copy";
      }, 1800);
    });
    newColor.appendChild(element);
  }

  // これを背景にするボタンを追加
  {
    element = document.createElement('div');
    element.className = 'button';
    element.innerText = "background";
    element.addEventListener('click', () => {
      // 背景色を変える
      document.getElementById(elementId).style.background = hexColor;
    });
    newColor.appendChild(element);
  }

  // 新しいdiv要素を指定された要素に追加する
  document.getElementById(elementId).appendChild(newColor);
}

// エディット画面を開く
function edit() {
  // 要素を取得
  const colorList = document.getElementById('contents-colors');
  const editArea = document.getElementById('edit-json');

  // 色リストとテキストエリアの表示を切り替える
  colorList.style.display = 'none';
  editArea.style.display = 'block';

  // ボタンの表示を切り替える
  document.getElementById('edit').style.display = 'none';
  document.getElementById('save').style.display = 'inline-block';
  document.getElementById('cancel').style.display = 'inline-block';
}

// リストを更新し、ローカルストレージに保存する
function save() {
  // 要素を取得
  const colorList = document.getElementById('contents-colors');
  const editArea = document.getElementById('edit-json');

  // テキストエリアの内容を取得
  colors = editArea.value;

  // リストを更新する
  try {
    // パースする
    list = JSON.parse(colors);
    // リスト更新
    setColumns('contents-colors', list);
  } catch (error) {
    // パースか何かが失敗した
    alert('error...\n\n' + error);
    return;
  }

  // セーブする
  localStorage.setItem('colors', colors);
  
  // 色リストとテキストエリアの表示を切り替える
  colorList.style.display = 'block';
  editArea.style.display = 'none';

  // ボタンの表示を切り替える
  document.getElementById('edit').style.display = 'inline-block';
  document.getElementById('save').style.display = 'none';
  document.getElementById('cancel').style.display = 'none';
}

// 何もせず編集画面を閉じる
function cancel() {
  // 要素を取得
  const colorList = document.getElementById('contents-colors');
  const editArea = document.getElementById('edit-json');

  // 色リストとテキストエリアの表示を切り替える
  colorList.style.display = 'block';
  editArea.style.display = 'none';

  // ボタンの表示を切り替える
  document.getElementById('edit').style.display = 'inline-block';
  document.getElementById('save').style.display = 'none';
  document.getElementById('cancel').style.display = 'none';
}
