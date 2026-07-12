import { useState } from 'react';
import "./App.css";
// 1. 作成した Pricing コンポーネントをインポートする（パスはファイルの場所に合わせてね）
import { Pricing } from './components/Pricing'; 

function App() {
	return (
		<div className="all">
		<title>AI要約紹介ページ</title>
		<header className="App-header">
			<h1>ロゴ</h1>
			<ul>
				<li>ホーム</li>
				<li>サービス紹介</li>
				<li>料金</li>
				<li>お問い合わせ</li>
			</ul>
			<a href="" className="original-button">無料で始める</a>
			<a href="" className="original-button">ログイン</a>
		</header>
		<main>
			<section className="hero">
				<h2>AI要約サービス</h2>
				<p>AIを活用した要約サービスで、文章を簡単に要約できます。</p>
				<a href="" className="original-button">無料で始める</a>
			</section>
			<section className="features">
				<h2>特徴</h2>
				<ul>
					<li>高速な要約</li>
					<li>高精度な要約</li>
					<li>多言語対応</li>
				</ul>
			</section>

			{/* 2. 元の長い箇所の代わりに、これ1行に置き換える！ */}
			<Pricing />

			<section className="contact">
				<h2>お問い合わせ</h2>
				<form>
					<label htmlFor="name">お名前:</label>
					<input type="text" id="name" name="name" />
					<label htmlFor="email">メールアドレス:</label>
					<input type="email" id="email" name="email" />
					<label htmlFor="message">お問い合わせ内容:</label>
					<textarea id="message" name="message"></textarea>
					<button type="submit">送信</button>
				</form>
			</section>
		</main>
		<footer>
			<p>&copy; 2024 AI要約サービス. All rights reserved.</p>
		</footer>
		</div>
	);
}

export default App;