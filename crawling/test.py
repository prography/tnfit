#-*- coding:utf-8 -*-
import requests
from bs4 import BeautifulSoup
import pandas as pd
import random
import re # 정규표현식 모듈

start = 0
end = 100

l = [i for i in range(start, end)]
random.shuffle(l)
lis2=[]
a=0
for i in l:
    lis = []
    page = requests.get('http://www.dietshin.com/calorie/calorie-foodview.asp?cal_idx=' + str(i) + '&cal_type=F')
    page.encoding = 'utf-8'
    pageText = page.text
    soup = BeautifulSoup(pageText, 'html.parser')
    table = soup.find('table', {'class': 'tbl-y'})
    trs = table.find_all('tr')
    cc = soup.find('div',{'class','r5 box chart'})
    if cc is None:
       continue

    tt = cc.find('p')

    if trs[0].find('td').text == '':
         continue
    lis.append(i)
    a = a + 1
    for tr in trs:
        th = tr.find('th').text
        td = tr.find('td').text.strip()
        if th == "단위":
            # 1인분(180g)을 1/인분/180g으로 분리하여 저장
            two = td.split("(")
            g = re.compile('[0-9.]*')
            g1 = g.search(two[1])
        # elif th == "칼로리":
        #     print("칼로리")
        lis.append(td)

    gram = tt.find_all('span')
    t = tt.find("strong",{'class':'blue'}).text
    tg = gram[0].text
    lis.append(tg)
    d = tt.find("strong", {'class': 'green'}).text
    dg = gram[1].text
    lis.append(dg)
    g = tt.find("strong", {'class': 'orange'}).text
    gg = gram[2].text
    lis.append(gg)
    da = tt.find("strong", {'class': 'yellow'}).text
    dag = gram[3].text
    lis.append(dag)
    n = tt.find("strong", {'class': 'purple'}).text
    ng = gram[4].text
    lis.append(ng)
    lis2.append(lis)
data = pd.DataFrame(lis2)
data.columns = ['index','name', 'unit', 'cal', 'carbs','protein','fat','sugar','salt']
data.to_csv('food1.csv', encoding='utf-8')
