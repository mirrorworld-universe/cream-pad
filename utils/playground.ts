// 1. 定义所有参数
const total_supply = 100000; // Auction 销售 token 总量
const auction_percentage = 0.5; // Auction 的百分比
const P0 = 30; // 理论价格上限
const P_tmax = 10; // 理论价格下限
const T_max = 6; // Auction round 总数
const decay_model = "linear"; // Auction 曲线选择 'linear' 或 'exponential'
const alpha = 2; // 超售时可以在定价曲线上上调多少步，必须为正数
const time_shift_max = 3; // 最大退回多少步的价格，可以设为 null，必须为正数
const sim_range0 = 0.8; // 假设购买量，normal distribution 下限
const sim_range1 = 1.2; // 假设购买量，normal distribution 上限
const oversold = true; // 是否允许超售

// 2. 销售模拟函数
function simulateSales(
  T_max,
  S_total,
  sim_range0,
  sim_range1,
  oversold = true
) {
  let salesPerPeriod = new Array(T_max).fill(0);
  let remaining = S_total;
  let N_target_period_val = S_total / T_max; // 每期目标销售量

  for (let i = 0; i < T_max; i++) {
    if (remaining <= 0) {
      salesPerPeriod[i] = 0;
      continue;
    }

    // 计算当期销售的最小和最大范围
    let minVal = Math.floor(sim_range0 * N_target_period_val);
    let maxVal = Math.floor(sim_range1 * N_target_period_val);

    if (!oversold) {
      maxVal = Math.min(maxVal, N_target_period_val);
    }

    // 调整最大值不超过剩余可销售量
    maxVal = Math.min(maxVal, remaining);

    // 确保最小值合理 (0 <= minVal <= maxVal)
    minVal = Math.max(minVal, 0);
    minVal = Math.min(minVal, maxVal);

    // 生成当期销售数据
    let salesPeriodI = 0;
    if (minVal > maxVal) {
      salesPeriodI = 0;
    } else if (maxVal === 0) {
      salesPeriodI = 0;
    } else {
      salesPeriodI = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal; // 生成 minVal 到 maxVal 之间的随机整数
    }

    // 确保不超过剩余量
    salesPeriodI = Math.min(salesPeriodI, remaining);
    salesPerPeriod[i] = salesPeriodI;
    remaining -= salesPeriodI;
  }
  return salesPerPeriod;
}

// 3. 拍卖模拟函数
export function simulate({
  P0,
  P_tmax,
  T_max,
  alpha,
  total_supply,
  auction_percentage,
  sim_range0 = 0.8,
  sim_range1 = 1.2,
  time_shift_max = null,
  decay_model = "linear",
  oversold = true
}) {
  let lambda0 = (Math.log(P0) - Math.log(P_tmax)) / (T_max - 1); // 指数衰减率
  let K0 = (P0 - P_tmax) / (T_max - 1); // 线性衰减率

  let t = Array.from({ length: T_max }, (_, i) => i);
  let S_total = Math.floor(auction_percentage * total_supply);

  let N_target_period = new Array(T_max).fill(S_total / T_max);

  let sales_per_period = simulateSales(
    T_max,
    S_total,
    sim_range0,
    sim_range1,
    oversold
  );
  let sales_ratio_period = sales_per_period.map(
    (sales, i) => sales / N_target_period[i]
  );

  let boost = new Array(T_max).fill(0);
  let sum_boost = new Array(T_max).fill(0);
  let eff = new Array(T_max).fill(0);
  let p_simulate_price = new Array(T_max).fill(P0);

  for (let i = 1; i < T_max; i++) {
    if (N_target_period[i - 1] > 0) {
      let sales_ratio = oversold
        ? sales_per_period[i - 1] / N_target_period[i - 1]
        : Math.min(sales_per_period[i - 1] / N_target_period[i - 1], 1);
      let indicator = sales_per_period[i - 1] >= N_target_period[i - 1] ? 1 : 0;
      boost[i] = alpha * sales_ratio * indicator;
    } else {
      boost[i] = 0;
    }

    let delta_t_eff = -boost[i];
    if (time_shift_max !== null) {
      delta_t_eff = Math.max(Math.min(delta_t_eff, 1), -time_shift_max);
    }
    eff[i] = -delta_t_eff;

    sum_boost[i] = sum_boost[i - 1] + delta_t_eff;
    p_simulate_price[i] =
      decay_model === "linear"
        ? P0 - K0 * sum_boost[i]
        : P0 * Math.exp(-lambda0 * sum_boost[i]);
  }

  let p_theoretical = t.map((i) =>
    decay_model === "linear" ? P0 - K0 * i : P0 * Math.exp(-lambda0 * i)
  );

  let df = t.map((round, i) => ({
    Auction_Round: round + 1,
    Theoretical_Price: p_theoretical[i].toFixed(2),
    Sales_Ratio: sales_ratio_period[i].toFixed(2),
    Sales_Amount: sales_per_period[i].toFixed(0),
    Boost_Factor: eff[i].toFixed(2),
    Actual_Price: p_simulate_price[i].toFixed(2),
    Sales_Ratio_Percentage: Math.round(sales_ratio_period[i] * 100) + "%"
  }));

  return df;
}

export const dataMock = simulate({
  P0,
  P_tmax,
  T_max,
  alpha,
  total_supply,
  auction_percentage,
  sim_range0,
  sim_range1,
  decay_model,
  oversold
});

// dataMock[0].Sales_Ratio = "1";
// dataMock[0].Sales_Ratio_Percentage = "100%";
