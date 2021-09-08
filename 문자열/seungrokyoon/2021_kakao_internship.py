def solution(s):
    answer = ""
    dic = {'zero':'0','one':'1','two':'2','three':'3',
           'four':'4', 'five':'5', 'six':'6',
           'seven':'7', 'eight':'8','nine':'9'
          }
    temp = ""
    for ch in s:
        temp += ch
        if temp in dic.keys():
            answer += dic[temp]
            temp = ""
            continue
        if temp in dic.values():
            answer += temp
            temp = ""
            continue
    return int(answer)