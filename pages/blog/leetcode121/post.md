# 121. Best Time to Buy and Sell Stock
You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.  
You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.  
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.  

**Example 1:**  
> **Input:** `prices = [7,1,5,3,6,4]`  
> **Output:** `5`  
> **Explanation:** Buy on day 2 (`price = 1`) and sell on day 5 (`price = 6`), `profit = 6-1 = 5`.  
> Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.  

**Example 2:**  
> **Input:** `prices = [7,6,4,3,1]`  
> **Output:** `0`  
> **Explanation:** In this case, no transactions are done and the max `profit = 0`.  

**Constraints:**  
- `1 <= prices.length <= 105`  
- `0 <= prices[i] <= 104`  

## Solution
```cpp
int maxProfit(std::vector<int>& prices) {
  int small = prices.at(0);
  int best = 0;
  for(int i = 1; i < prices.size(); i++) {
    small = std::min(small, prices.at(i));
    best = std::max(best, prices.at(i) - small);
  }
  return best;
}
```

### Proof
#### Loop Invariant
For iteration `i`, `small` is the minimum from `0 ... i - 1`, and `best` is the maximum difference from `0 ... i - 1`
#### Inialization
Assume `arr[0]` is the minimum. Since there is no previous element, then the assumption is true, it also holds that the `best = 0` since there is no previous best, therefore the invariant holds.
#### Maintenance
Let `1 <= k < n`, where `n` is the length of the array. For iteration `k`, we have `small_{k - 1} = min(arr[0]...arr[k - 1])`; we also have `best_{k - 1}` which is `max(arr[0] - small_0 ... arr[k - 1] - small_{k - 1})`. Then `small_k` becomes `min(small_{k - 1}, arr[k])` and `best_k` is computed `max(best_{k - 1}, arr[k] - small_k)` Thus the invariant holds.
#### Termination
After `n` iterations, `small` is the minimum from `0 ... n - 1` and best is the maximum difference from `0 ... n-1`.