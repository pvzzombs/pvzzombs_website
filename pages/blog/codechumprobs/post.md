# Problems:
## 5-Star Restaurant
I'm running a 5-star restaurant and I can only have the best items on my menu.
My menu offers 6 items, each represented by a number from 1-6.
If an item on my menu does not sell or does not sell that much compared to others,
I must act and replace it with something that sells!

Identify which dishes do not sell. If every dish sells,
print the set of dishes that were ordered least.

### Test Cases
#### Test Case 1
Input:
```
156356231
```
Output:
```
4
```
#### Test Case 2
Input:
```
1234564253
```
Output:
```
1
6
```
#### Test Case 3
Input:
```
3213212
```
Output:
```
4
5
6
```

## replace_elements_with_greatest
Hey Programmer!

I need a bit of help with my coding, you see,
I'm trying to create a program for a client that stores integer data provided by them into
an array, but at the last second, they want to change the data already stored!

Luckily for us, they simply want to replace every element of the array with the greatest element to its right side,
and all of the arrays have a standard side of 10 to boot!

Careful though, if the element doesn't have a greatest element to its right it becomes a zero!
### Input/Output
Input  
The elements of the array
```
2 1 0 7 3 4 2 4 9 1
```
Output  
The updated elements of the array
```
9 9 9 9 9 9 9 9 1 0
```
### Test Cases
#### Test Case 1
Input:
```
2 1 0 7 3 4 2 4 9 1
```
Output:
```
9 9 9 9 9 9 9 9 1 0
```
#### Test Case 2
Input:
```
1 9 4 2 4 3 7 0 1 2
```
Output:
```
9 7 7 7 7 7 2 2 2 0
```
#### Test Case 3
Input:
```
7 5 8 9 6 8 5 7 4 6
```
Output:
```
9 9 9 8 8 7 7 6 6 0
```

# Solutions:
Here is my solutions:
## 5-Star Restaurant
```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
  char c[128];
  int * arr;
  int * larr;
  int * marr;
  int larrptr = 0, marrptr = 0;
  int i;
  int num;
  int min = 9999, max = -9999;
  arr = malloc(6 * sizeof(int));
  for(i = 0; i < 6; i++){
    arr[i] = 0;
  }
  fgets(c, 128, stdin);
  i = 0;
  while(c[i] != '\n' && c[i] != 0){
    num = c[i] - '0';
    if(num >= 1 && num <= 6){
      arr[num - 1]++;
    }
    i++;
  }
  larr = malloc(6 * sizeof(int));
  marr = malloc(6 * sizeof(int));
  for(i = 0; i < 6; i++){
    if(arr[i] < min){
      min = arr[i];
      larrptr = 0;
      larr[larrptr] = i + 1;
      larrptr++;
    } else if(arr[i] == min){
      larr[larrptr] = i + 1;
      larrptr++;
    }
    
    if(arr[i] > max){
      max = arr[i];
      marrptr = 0;
      marr[marrptr] = i + 1;
      marrptr++;
    } else if(arr[i] == max){
      marr[marrptr] = i + 1;
      marrptr++;
    }
  }
  
  if (min != max){
    for(i = 0; i < larrptr; i++){
      printf("%d\n", larr[i]);
    }
  } else {
    if(max == 0){
      printf("All are least\n");
    } else {
      printf("No least found!\n");
    }
  }
  
  free(arr);
  free(larr);
  free(marr);
  return 0;
}
```
### Proof
**Loop Invariant**: `larr` contains the items with the least frequency and `marr` contains the items with the most frequency for iteration `i` in `arr[0...i-1]`.  
**Initialization**: `larr` is empty and  `marr` is empty at the beginning of the loop which invariant holds.  
**Maintenance**: Assume `0 <= k < n`, where `n = 6`. If `arr[k] < min`, `larr` will reset and contain `k + 1` item, or if `arr[k] == min` append `k + 1` item to `larr`. If `arr[k] > max`, `marr` will reset and contain `k + 1` item, or if `arr[k] == max` append `k + 1` item to `marr`. In this way the invariant holds true.  
**Termination**: Assume `k = n`, where `n = 6`, then `larr` contains the items with the least frequency from the loop `0` to `k - 1` and `marr` contains the items with the most frequency from the loop `0` to `k - 1`. Thus invariant holds.  

## replace_elements_with_greatest
```c
#include <stdio.h>

int main()
{
  int arr[10];
  int i;
  int m = 0;
  for(i = 0; i < 10; i++){
    scanf("%d", &(arr[i]));
  }
  for(i = 9; i >= 0; i--){
    int t = arr[i];
    arr[i] = m;
    if(t > arr[i]){
      m = t;
    }
  }
  for(i = 0; i < 10; i++){
    printf("%d", arr[i]);
    if (i < 9) {
      printf(" ");
    }
  }
  return 0;
}
```
### Proof
**Loop Invariant**: Assume `oarr[i]` contains the original element of the array; `m` is the highest element from the right side, `i + 1 ... n - 1`, ignoring the current element `oarr[i]`.  
**Initialization**: Assume `m = 0`, since there is no element in the right, the assumption is true, then the invariant holds.  
**Maintenance**: Let `0 <= k < n`, where `n = 10`, for iteration `k`, assuming `t` is `oarr[k]`, if `m` is `max(oarr[k+1], ..., oarr[n-1])`, then new `m` is `max(t, m)`. Thus the invariant holds.  
**Termination**: Assume `k = 0`, then `arr[k]` is `max(oarr[k + 1], ..., oarr[n - 1])` according to the loop invariant  