import re

content = open('assets/catalog-data.js', encoding='utf-8').read()
pos = content.find('valor-v-onyx-ring')
if pos != -1:
    print(content[pos-50:pos+1200])
