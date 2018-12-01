import requests
from bs4 import BeautifulSoup
import pandas as pd
import random
# list = []
# ran_num = random.randint(0, 10)
# for i in range(10):
#     while ran_num in list:
#         ran_num = random.randint(0, 10)
#        list.append(ran_num)
start = 1
end = 10001
start =1
end = 10001
l = [i for i in range(start, end)]
random.shuffle(l)
lis2=[]
a=0
for i in l:
    lis = []
    lis.append(a)
    a=a+1
    page = requests.get('http://www.dietshin.com/calorie/calorie-foodview.asp?cal_idx=' + str(i) + '&cal_type=F')
    pageText = page.text
    soup = BeautifulSoup(pageText, 'html.parser')
    table = soup.find('table', {'class': 'tbl-y'})
    trs = table.find_all('tr')
    cc = soup.find('div',{'class','r5 box chart'})
    tt = cc.find('p')
    if trs[0].find('td').text == '':
         continue
    for tr in trs:
        th = tr.find('th').text
        td = tr.find('td').text.strip()
    #    print(th)
    #    print(td)
        #    lis.append(th)
        lis.append(td)

    gram = tt.find_all('span')
    t = tt.find("strong",{'class':'blue'}).text
    tg = gram[0].text
   # print(t)
   # print(tg)
    # lis.append(t)
    lis.append(tg)
    d = tt.find("strong", {'class': 'green'}).text
    dg = gram[1].text
   # print(d)
   # print(dg)
    # lis.append(d)
    lis.append(dg)
    g = tt.find("strong", {'class': 'orange'}).text
    gg = gram[2].text
   # print(g)
   # print(gg)
    # lis.append(g)
    lis.append(gg)
    da = tt.find("strong", {'class': 'yellow'}).text
    dag = gram[3].text
   # print(da)
   # print(dag)
    # lis.append(da)
    lis.append(dag)
    n = tt.find("strong", {'class': 'purple'}).text
    ng = gram[4].text
  #  print(n)
   # print(ng)
    # lis.append(n)
    lis.append(ng)
   # print(lis)
    lis2.append(lis)
data = pd.DataFrame(lis2)
data.columns = ['인덱스','음식명', '단위', '칼로리', '탄수화물','단백질','지방','당류','나트륨']
data.to_csv('음식4.csv', encoding='utf-8')
