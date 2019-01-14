#-*- coding:utf-8 -*-
import requests
from bs4 import BeautifulSoup
import pandas as pd
import random
import re # 정규표현식 모듈

### 12000 - 15000까지 돌려봤는데 아무 것도 없었음
start = 14000
end = 15000

l = [i for i in range(start, end)]
random.shuffle(l)
lis2=[]
count = 0
lfag = 0
for i in l:
    lis = []

    page = requests.get('http://www.dietshin.com/calorie/calorie-foodview.asp?cal_idx=' + str(i) + '&cal_type=F')
    page.encoding = 'utf-8'
    pageText = page.text
    soup = BeautifulSoup(pageText, 'html.parser')
    table = soup.find('table', {'class': 'tbl-y'})
    trs = table.find_all('tr')
    cc = soup.find('div', {'class': 'chart'})
    if cc is None:
        count += 1
        if count == end - start:
            print("no info")
            flag = 1
        continue

    tt = cc.find('p')

    if trs[0].find('td').text == '':
        continue
    lis.append(i) # idx
    print(i, end=' ')
    for tr in trs:

        th = tr.find('th').text
        td = tr.find('td').text.strip()
        if th == "음식명":
            lis.append(td) # name
            print(td, end=' ')
        if th == "단위":
            # 1인분(180g)을 1/인분/180g으로 분리하여 저장
            wunit = td.split("(")
            first = wunit[0] #1개 , 0.5인분
            second = wunit[1][0:-1] # 180g, 200ml

            cnt_temp = re.match('[0-9.]+', first)
            cnt = cnt_temp.group()
            lis.append(cnt) # cnt
            print(cnt, end=' ')
            cunit = first[len(cnt):]
            lis.append(cunit) # unit
            print(cunit)

            vol_temp = re.match('[0-9]+', second)
            vol = vol_temp.group()
            lis.append(vol) # gram

        if th == "칼로리":
            length = len(td)
            lis.append(td[0:length-4].strip()) # cal

    gram = tt.find_all('span')

    t = tt.find("strong",{'class':'blue'}).text
    tg = gram[0].text
    if "g" in tg:
        lis.append(tg[0:len(tg)-1]) # carbs
    elif "%" in tg:
        num2 = tg[0:len(tg)-1] # 66%
        num3 = float("{0:.2f}".format(float(cnt)*float(vol)*(float(num2)/100)))
        lis.append(num3) # carbs
    else:
        lis.append(tg) # carbs

    d = tt.find("strong", {'class': 'green'}).text
    dg = gram[1].text
    if "g" in dg:
        lis.append(dg[0:len(dg)-1]) # protein
    elif "%" in dg:
        num2 = dg[0:len(dg)-1]
        num3 = float("{0:.2f}".format(float(cnt)*float(vol)*(float(num2)/100)))
        lis.append(num3) # protein
    else:
        lis.append(dg) # protein

    g = tt.find("strong", {'class': 'orange'}).text
    gg = gram[2].text
    if "g" in gg:
        lis.append(gg[0:len(gg)-1]) # fat
    elif "%" in gg:
        num2 = gg[0:len(gg)-1] # fat
        num3 = float("{0:.2f}".format(float(cnt)*float(vol)*(float(num2)/100)))
        lis.append(num3) # fat
    else:
        lis.append(gg) # fat

    da = tt.find("strong", {'class': 'yellow'}).text
    dag = gram[3].text
    if "g" in dag:
        lis.append(dag[0:len(dag)-1]) # sugar
    elif "%" in dag:
        num2 = dag[0:len(dag)-1]
        num3 = float("{0:.2f}".format(float(cnt)*float(vol)*(float(num2)/100)))
        lis.append(num3) # sugar
    else:
        lis.append(tg) # sugar

    n = tt.find("strong", {'class': 'purple'}).text
    ng = gram[4].text
    lis.append(ng[0:len(ng)-2]) # salt
    lis2.append(lis)

if flag == 0:
    data = pd.DataFrame(lis2)
    data.columns = ['index','name','cnt', 'unit','gram', 'cal', 'carbs','protein','fat','sugar','salt']
    data.to_csv('13000-14000.csv', encoding='utf-8')
