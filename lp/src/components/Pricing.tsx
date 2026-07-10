import { useState } from "react";

// 1. 料金データの型定義（実務では必須！）
interface PricePlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
}

// 2. データの定義（JSXとデータを分離する）
const plans: PricePlan[] = [
  { name: "無料プラン", monthlyPrice: 0, yearlyPrice: 0, features: ["月10回まで", "基本的な要約"] },
  { name: "スタンダード", monthlyPrice: 980, yearlyPrice: 800, features: ["月無制限", "高精度AI", "多言語対応"] },
  { name: "プレミアム", monthlyPrice: 1980, yearlyPrice: 1600, features: ["全て無制限", "最優先サポート", "API連携"] }
];

export function Pricing() {
  // 3. 月額(monthly)か年額(yearly)かを管理する状態（State）
  const [isYearly, setIsYearly] = useState<boolean>(false);

  return (
    <section className="pricing">
      <h2>料金プラン</h2>
      
      {/* 切り替えスイッチ */}
      <div className="plan-toggle">
        <button onClick={() => setIsYearly(false)} disabled={!isYearly}>月々払い</button>
        <button onClick={() => setIsYearly(true)} disabled={isYearly}>年一括払い（お得！）</button>
      </div>

      {/* 配列をループしてカードを表示 */}
      <div className="price-cards">
        {plans.map((plan) => (
          <div key={plan.name} className="price-card">
            <h3>{plan.name}</h3>
            <p className="price">
              ¥{isYearly ? plan.yearlyPrice : plan.monthlyPrice} <span>/月</span>
            </p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
