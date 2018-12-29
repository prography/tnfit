import requests
from bs4 import BeautifulSoup
import pandas as pd
import random
import pymysql

db = pymysql.connect(host='ec2-13-209-17-166.ap-northeast-2.compute.amazonaws.com',user="root",passwd="gathertooweb",db='TNfit',port=3306)

start =100
end = 150
start = 0
end = 100
l = [i for i in range(start, end)]
random.shuffle(l)
lis2=[]
a=0
for i in l:
    lis = []

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
    lis.append(a)
    a = a + 1
    name=""
    gram = ""
    cal = ""
    cursor = db.cursor()
    ff=0
    for tr in trs:
        ff=ff+1
        th = tr.find('th').text
        td = tr.find('td').text.strip()
        lis.append(td)
        if ff==1:
            name = td
        if ff==2:
            gram = td
        if ff==3:
            cal=td



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
    str = 'insert into test (index,음식명,단위,칼로리,탄수화물,단백질,지방,당류,나트륨) values(%d,%s,%s,%s,%s,%s,%s,%s,%s)' % (a, "'" + dag + "'", "'" + dag + "'", "'" +dag + "'", "'" + dag + "'", "'" + dag + "'", "'" + dag + "'",
        "'" + dag + "'", "'" + dag + "'")

   # a,"'" + name + "'", "'" + gram + "'", "'" + cal + "'", "'" + tg + "'", "'" + dg + "'", "'" + gg + "'", "'" + dag + "'", "'" + ng + "'")

    cursor.execute(str)
    db.commit()
data = pd.DataFrame(lis2)
data.columns = ['index','name', 'unit', 'cal', 'carbs','protein','fat','sugar','salt']
data.to_csv('food6.csv', encoding='utf-8')
