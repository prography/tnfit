import requests
from bs4 import BeautifulSoup
import pandas as pd
import random
start = 0
end = 100
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
    if cc is None:
        continue
    tt = cc.find('p')

    if trs[0].find('td').text == '':
         continue
    for tr in trs:
        th = tr.find('th').text
        td = tr.find('td').text.strip()
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
data.to_csv('food6.csv', encoding='utf-8')