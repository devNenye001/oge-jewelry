import xml.etree.ElementTree as ET

svg = '''<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.312-4.643c.294 0 .579.04.85.116V9.352a6.347 6.347 0 0 0-.85-.058 6.34 6.34 0 0 0-6.335 6.34 6.34 6.34 0 0 0 10.82 4.49 6.273 6.273 0 0 0 1.96-4.49V8.71a8.28 8.28 0 0 0 4.81 1.48v-3.504Z"/></svg>'''
ET.fromstring(svg)
print('TikTok SVG is 100% valid XML!')
