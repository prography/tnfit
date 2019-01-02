#-*- coding:utf-8 -*-
import requests
from bs4 import BeautifulSoup
import pandas as pd
import random
import re # 정규표현식 모듈

start = 10
end = 100

l = [i for i in range(start, end)]
random.shuffle(l)
lis2=[]
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
    for tr in trs:
        th = tr.find('th').text
        td = tr.find('td').text.strip()
        if th == "음식명":
            lis.append(td)
        if th == "단위":
            # 1인분(180g)을 1/인분/180g으로 분리하여 저장
            two = td.split("(")
            two2 = two[1]
            one = two[0] #1개 , 0.5인분
            if "." in one:
                split = one.split(".")
                s1 = split[1];
                aa = split[0]+"."+s1[0:1]
                lis.append(aa)
            else:
                cnt = one[0:1]
                lis.append(cnt)
            unit = one[1:]
            lis.append(unit)
            two3 = two2.split("g")
            num = two3[0]
            lis.append(num)
        if th == "칼로리":
            length = len(td)
            lis.append(td[0:length-4])
            print(td[0:length-4])

    gram = tt.find_all('span')
    t = tt.find("strong",{'class':'blue'}).text
    tg = gram[0].text
    if "g" in tg:
        lis.append(tg[0:len(tg)-1])
    elif "%" in tg:
        num2 = tg[0:len(tg)-1]
        lis.append(float(num)*(float(num2)/100))
    else:
        lis.append(tg)
    d = tt.find("strong", {'class': 'green'}).text
    dg = gram[1].text
    if "g" in dg:
        lis.append(dg[0:len(dg)-1])
    elif "%" in dg:
        num2 = dg[0:len(dg)-1]
        lis.append(float(num)*(float(num2)/100))
    else:
        lis.append(dg)
    g = tt.find("strong", {'class': 'orange'}).text
    gg = gram[2].text
    if "g" in gg:
        lis.append(gg[0:len(gg)-1])
    elif "%" in gg:
        num2 = gg[0:len(gg)-1]
        lis.append(float(num)*(float(num2)/100))
    else:
        lis.append(gg)
    da = tt.find("strong", {'class': 'yellow'}).text
    dag = gram[3].text
    if "g" in dag:
        lis.append(dag[0:len(dag)-1])
    elif "%" in dag:
        num2 = tg[0:len(dag)-1]
        lis.append(float(num)*(float(num2)/100))
    else:
        lis.append(tg)
    n = tt.find("strong", {'class': 'purple'}).text
    ng = gram[4].text
    lis.append(ng[0:len(ng)-2])
    lis2.append(lis)

data = pd.DataFrame(lis2)
data.columns = ['index','name','cnt', 'unit','gram', 'cal', 'carbs','protein','fat','sugar','salt']
data.to_csv('food1.csv', encoding='utf-8')
