# The Algorithm
The algorithm is as follows:
```cpp
int lcs(std::string &str1, std::string &str2){
  int high = 0;
  int p = str2.size() - 1;
  int len = str1.size() + str2.size() - 1;
  int m;
  for (int i = 0; i < len; i++) {
    m = 0;
    for (int j = 0; j < str1.size(); j++) {
      int cur = p + j;
      if (cur >= 0 && cur < str2.size() && str1[j] == str2[cur]) {
        m++;
        if (m > high) {
          high = m;
        }
      } else {
        m = 0;
      }
    }
    p--;
  }
  return high;
}
```

# Explanation
The code above works by sliding the second string on to the first string.
Let `abc` and `bcd` be the first string and second string respectively. To start sliding, we align the last character of the second string to the first character of the first string, like this:
```
  abc
bcd
  ^
  |
```
It could go like this:
```
  abc
   bcd
  ^
  |
```
Now here is the best part: If some of the characters match, we record that in a variable called `m`, if it indeed match another character, we keep incrementing it, otherwise, we reset `m` back to zero. We also use `m` to record the longest common substring length and store it into the variable `high`.

So what is really happening?
Back to here:
```
  abc
bcd
  ^
  |
```

The arrow represents `p`, which points to the last character of the second string, if we decrement `p` by 1, then:
```
  abc
 bcd
  ^
  |
```
This makes the second string slide on to the first string. You may ask yourself, "What happens to the characters that has no pair or What happens to the character not aligned with other character?", The short answer is nothing. We just ignore it. So in the above diagram, you can see that last character of the first string has nothing to match up with, so we just ignore it.

How many times should we decrement `p`?
Back to here:
```
  abc
bcd
  ^
  |
```
Let us prepend and append `abc` by `xx`:
```
xxabcxx
bcd
  ^
  |
```
If we keep moving the second string until the last character of the second string matches the last `x` on the first string, then we can get the amount of iterations to perform.
If the second string has `N` characters, we then prepend and append the first string with `N - 1` amount of `x`. If we observe carefully, you can deduce that the number of iterations to perform is about `M + N - 1`, with `M` being the number of characters the first string has.