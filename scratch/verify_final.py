import os, re

def verify():
    # 1. Verify index.html and preview/index.html
    for fpath in ['index.html', 'preview/index.html']:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check signature cards
        assert 'THE VICTORIOUS COLLECTION' in content, f'Missing Victorious in {fpath}'
        assert 'THE SELF WOMAN COLLECTION' in content, f'Missing Self Woman in {fpath}'
        assert 'THE ALIGNMENT COLLECTION' in content, f'Missing Alignment in {fpath}'
        assert 'THE BOUNDARIES COLLECTION' in content, f'Missing Boundaries in {fpath}'
        assert 'assets/Victorious-collection.jpg' in content, f'Missing Victorious img in {fpath}'
        assert 'assets/SelfRomance-collection.jpg' in content, f'Missing SelfRomance img in {fpath}'
        assert 'assets/alignment-collection.jpg' in content, f'Missing alignment img in {fpath}'
        assert 'assets/Boundaries-collection.jpg' in content, f'Missing Boundaries img in {fpath}'
        print(f'{fpath}: Signature cards verified!')

    # 2. Verify account-overview.html and preview/account-overview.html
    for fpath in ['account-overview.html', 'preview/account-overview.html']:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Ensure Returns is removed from desktop and mobile sidebar navs
        desktop_nav_match = re.search(r'<nav class="account-sidebar__nav account-sidebar__nav--desktop"[^>]*>([\s\S]*?)<\/nav>', content)
        if desktop_nav_match:
            desktop_nav = desktop_nav_match.group(1)
            assert 'shipping-returns.html' not in desktop_nav, f'Returns still in desktop nav in {fpath}'
            assert '<span>Orders</span>' in desktop_nav, f'Orders missing in desktop nav in {fpath}'
            assert '<span>Wishlist</span>' in desktop_nav, f'Wishlist missing in desktop nav in {fpath}'
            assert '<span>Profile</span>' in desktop_nav, f'Profile missing in desktop nav in {fpath}'

        mobile_nav_match = re.search(r'<nav class="account-sidebar__nav account-sidebar__nav--mobile"[^>]*>([\s\S]*?)<\/nav>', content)
        if mobile_nav_match:
            mobile_nav = mobile_nav_match.group(1)
            assert 'shipping-returns.html' not in mobile_nav, f'Returns still in mobile nav in {fpath}'
            assert '<span>Orders</span>' in mobile_nav, f'Orders missing in mobile nav in {fpath}'
            assert '<span>Wishlist</span>' in mobile_nav, f'Wishlist missing in mobile nav in {fpath}'
            assert '<span>Profile</span>' in mobile_nav, f'Profile missing in mobile nav in {fpath}'

        # Ensure no inline onclick="const g=..."
        assert 'onclick="const g=' not in content, f'Inline const onclick found in {fpath}'

        # Ensure Cormorant Garamond font is loaded
        assert 'Cormorant+Garamond' in content, f'Cormorant Garamond font missing in {fpath}'

        print(f'{fpath}: Sidebar and error fixes verified!')

    print('\nALL VERIFICATIONS PASSED!')

if __name__ == '__main__':
    verify()
