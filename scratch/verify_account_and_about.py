import os

for base in ['', 'preview/']:
    acct_path = os.path.join(base, 'account-overview.html')
    with open(acct_path, 'r', encoding='utf-8') as f:
        acct = f.read()
    
    assert 'assets/account-overview-banner.jpeg' in acct, f"Missing banner in {acct_path}"
    assert 'ACCOUNT OVERVIEW' in acct, f"Missing title in {acct_path}"
    assert 'Returns' in acct, f"Missing Returns in {acct_path}"
    assert 'product-bracelet-1.jpg' in acct, f"Missing product-bracelet-1 in {acct_path}"
    assert 'product5.png' in acct, f"Missing product5 in {acct_path}"
    print(f"Verified {acct_path}")

    about_path = os.path.join(base, 'about.html')
    with open(about_path, 'r', encoding='utf-8') as f:
        abt = f.read()
    assert 'MORE THAN JEWELRY. IT\'S A FEELING.' in abt, f"Missing hero title in {about_path}"
    assert '<strong>OGÉ reflects my belief that</strong>' in abt, f"Missing bold in {about_path}"
    assert '-Oge Ikekwem' in abt, f"Missing author in {about_path}"
    assert 'OUR STORY' in abt, f"Missing OUR STORY in {about_path}"
    assert 'OUR MISSION' in abt, f"Missing OUR MISSION in {about_path}"
    assert 'OUR VISION' in abt, f"Missing OUR VISION in {about_path}"
    assert 'JEWELRY WITH INTENTION' in abt, f"Missing INTENTION in {about_path}"
    print(f"Verified {about_path}")

print("All verifications passed!")
