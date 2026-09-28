with open('preview/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

assert 'VALOR EARRING +<br>NECKLACE FOR $200' in text, "Missing VALOR EARRING set offer"
assert 'THE SELF WOMAN COLLECTION' in text, "Missing THE SELF WOMAN COLLECTION"
assert 'THE VICTORIOUS COLLECTION' in text, "Missing THE VICTORIOUS COLLECTION"
assert 'class="location-modal-backdrop" data-location-modal-backdrop style="display: none;"' in text, "Missing backdrop display: none"
assert 'class="location-modal" data-location-modal style="display: none;"' in text, "Missing modal display: none"
assert 'faq-item--highlight' not in text, "faq-item--highlight should be removed"
assert '>CHECKOUT<' not in text, "CHECKOUT should be replaced"
assert '>Checkout<' in text, "Missing Checkout in cart drawer"
print("All preview/index.html assertions passed successfully!")

with open('preview/blog-details.html', 'r', encoding='utf-8') as f:
    btext = f.read()

assert 'JEWELRY CARE: KEEP YOUR<br>PIECES LOOKING THEIR BEST' in btext, "Missing blog title line break"
assert 'class="location-modal-backdrop" data-location-modal-backdrop style="display: none;"' in btext, "Missing blog backdrop display: none"
assert 'class="location-modal" data-location-modal style="display: none;"' in btext, "Missing blog modal display: none"
print("All preview/blog-details.html assertions passed successfully!")
