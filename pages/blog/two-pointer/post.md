# Brief Introduction
A two pointer technique leverages variable representing a position or an offset, determined by movement within a specific range, with or without a data structure.

# Example? 
This guide or post will show you how to solve pattern problems using two pointer technique

## Example 1:
### Challenge 1:
Make this pattern, given 3:
```
  1
 212
32123
 212
  1
```
Given 4:
```
   1
  212
 32123
4321234
 32123
  212
   1
```
Given 5:
```
    1
   212
  32123
 4321234
543212345
 4321234
  32123
   212
    1
```
To solve this interesting problem, let us first see how do we represent this. One way is to use an array.

```c
const int N = 5;
const int arraySize = N * 2 - 1;
int arr[arraySize];
int num = N;
int d = -1;
for (int i = 0; i < arraySize; i++) {
  arr[i] = num;
  if (num == 1) {
    d = 1;
  }
  num += d;
}
```

Now we create the two pointers, each initialized to point in the middle of the array:

```c
int lptr = N - 1; // the left pointer
int rptr = N - 1; // the right pointer
```

Here is the interesting part, for every row, we move the left pointer to the left and the right pointer to the right, like outwards movement:

```c
lptr -= 1;
rptr += 1;
```

A best way is to store the delta/increment/decrement in a variable:
```c
int lptrd = -1;
int rptrd = 1;
```

Then do this:
```c
lptr += lptrd;
rptr += rptrd;
```

Now the fun thing is that when `lptr` reaches zero and `rptr` reaches `arraySize - 1` we can multiply the delta by negative one, changing the movement of the pointers to be inwards:

```c
lptrd *= -1;
rptrd *= -1;
```
You can also do this to the pointers (again) when `lptr` and `rptr` reaches the middle of the array.

## Example 2
### Challenge 2:
Make this pattern: 2 waves
```
   *     *
  * *   * *
 *   * *   *
*     *     *
```

3 waves:
```
   *     *     *
  * *   * *   * *
 *   * *   * *   *
*     *     *     *
```

Can we stil use an array here with pointers? Maybe, but this time I am not entirely sure how.
What I am sure about is that we can still use the two pointer technique here? **How?**

Observe only the two waves above, and ignore the right slashes:
```
   *     *
  *     *  
 *     *    
*     *       
```

Through obeservation, we see that the left side of the wave has equal amount of space as it shifts to the left.
Similarly to the right:
```
   *     *
    *     *
     *     *
      *     *
```

With this in mind, let the left pointer and right pointer be at the peak of the wave.
Now on every row, we first store the copy of the position of the left and right pointer:

```c
int blptr = lptr;
int brptr = rptr;
```

Then as usual, move both the left and right pointer to the right, but when?

Lets take more a deeper look:
```
(j)
    (lptr)
    (rptr)
0 1 2 3 4 5 6 7 8 9 ...
      *           *
    *   *       *
  *       *   *
*           *

```
Let `j` be an iterator, if `j` meets the left pointer, increment left pointer by a specific amount, what amount is it is left for the reader to figure out.
Similarly if `j` meets the right pointer, move the right pointer by a specific amount.

# Full code example/s
```c
#include <stdio.h>

int main() {
  const int N = 5;
  const int arraySize = N * 2 - 1;
  int arr[arraySize];
  int num = N;
  int d = -1;
  int lptrd = -1;
  int rptrd = 1;
  int lptr = N - 1;
  int rptr = N - 1;
  for (int i = 0; i < arraySize; i++) {
    arr[i] = num;
    if (num == 1) {
      d = 1;
    }
    num += d;
  }
  for (int i = 0; i < arraySize; i++) {
    for (int j = 0; j < arraySize; j++) {
      if (j >= lptr && j <= rptr) {
        printf("%d", arr[j]);
      } else {
        printf(" ");
      }
      if (j < arraySize - 1) {
        printf(" ");
      }
    }
    printf("\n");
    lptr += lptrd;
    rptr += rptrd;
    if (lptr == 0) {
      lptrd *= -1;
      rptrd *= -1;
    }
  }
  return 0;
}
```

```c
#include <stdio.h>

int main() {
  int waves = 5;
  int height = 4;
  int lptr = height - 1;
  int rptr = height - 1;
  
  for (int i = 0; i < height; i++) {
    int blptr = lptr;
    int brptr = rptr;
    for (int j = 0; j <= (height - 1) * 2 * waves; j++) {
      if (j == lptr) {
        printf("*");
        lptr += (height - 1) * 2;
      } else if (j == rptr) {
        printf("*");
        rptr += (height - 1) * 2;
      } else {
        printf(" ");
      }
    }
    printf("\n");
    lptr = blptr - 1;
    rptr = brptr + 1;
  }
}
```
# End
So hopefully you got a better look and a grasp on how powerful and amazing two pointer technique is. Using it wisely can save you time, either by making algorithm less complicated to avoiding using a specific data structure.