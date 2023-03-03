/*
https://www.youtube.com/watch?v=u_ft5jCDZXk&ab_channel=alGOds

index          0 1 2  3  4  5  6  7  8  9 10
value          1 2 3  4  5  6  7 -8  2 12 11
sum (kadane)   1 3 6 10 15 21 28 20 22 34 43
prefix         1 3 6 10  0  6 13  5  7  4  0  (modulo m = 15)

modulo operation

3 % 15 = 3   3 - 0
22 % 15 = 7  22 - 15
-8 % 15 = 7  -8 - (-15)

0 <=  n % m < m
range of answer
0 <= answer <= m - 1

Kadane's algorithm

a % m = (a + m) % m
        using distribution
        a % m + m % m
                m % m = 0
        a % m   -----

     i + 1 ... j
---  -----------
----------------

Sum of i + 1 ... j = (Pj - Pi + m) % m




*/
