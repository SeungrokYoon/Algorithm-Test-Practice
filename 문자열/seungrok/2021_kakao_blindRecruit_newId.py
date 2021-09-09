import re 

def solution(new_id):
    new_id = new_id.lower()
    new_id = re.sub('[^a-z-_.0-9]', '', new_id)
    new_id = re.sub('\.{2,}', '.', new_id)
    new_id = re.sub('^\.|\.$','',new_id)
    if new_id == "" :
        new_id += "a"
    if len(new_id) >=16:
        new_id = new_id[:15]
        new_id = re.sub('\.$','',new_id)
    while len(new_id) < 3:
        new_id += new_id[-1]
        
    return new_id