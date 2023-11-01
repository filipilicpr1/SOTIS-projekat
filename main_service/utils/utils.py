def int_try_parse(value):
    try:
        if not value:
            return value, False
        
        return int(value), True
    except ValueError:
        return value, False
    
def get_correct_page(page):
    page, success = int_try_parse(page)
    return 1 if not success else page