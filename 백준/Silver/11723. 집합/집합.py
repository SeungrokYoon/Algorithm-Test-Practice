import sys

m = int(input())
bit_set = 0

for i in range(m):
    data = sys.stdin.readline().split()
    command = ''
    x = 0
    # Check if there are exactly two elements in the split result
    if len(data) == 2:
        x = data[1]
    command = data[0]

    if command == 'check':
        print(str(1 if bit_set & (1 << int(x)) else 0))
    elif command == 'add':
        bit_set |= 1 << int(x)
    elif command == 'remove':
        bit_set &= ~ (1 << int(x))
    elif command == 'toggle':
        bit_set ^= 1 << int(x)
    elif command == 'all':
        bit_set |= (1 << 21) - 1
    elif command == 'empty':
        bit_set &= 0
