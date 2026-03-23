import re
import requests
import json
import time

def get_car_makes():
    url = "https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    json_text = re.sub(r'^[^(]*\(|\);?$', '', response.text)
    
    data = json.loads(json_text)

    return [make['make_display'] for make in data.get('Makes', [])]

def get_models_for_make(make):
    url = f"https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make={make}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    json_text = re.sub(r'^[^(]*\(|\);?$', '', response.text)

    data = json.loads(json_text)

    return [model['model_name'] for model in data.get('Models', [])]

def escape_sql(value):
    return value.replace("'", "''") if value else value

def fetch_car_data():
    makes = get_car_makes()
    brand_sql = []
    model_sql = []

    brand_id_map = {}
    current_brand_id = 1
    current_model_id = 1

    print (makes.__len__())
    
    # for make in makes:
    #     print(f"Fetching models for {make}...")
    #     models = get_models_for_make(make)
    #     car_entry = {
    #         "label": make,
    #         "value": make.lower().replace(" ", "_"),
    #         "models": [
    #             {"label": model, "value": model.lower().replace(" ", "_")} 
    #             for model in models
    #         ]
    #     }
    #     car_data.append(car_entry)
    #     time.sleep(1)  # Evită prea multe cereri într-un timp scurt
    
    # with open("car_data.json", "w", encoding="utf-8") as f:
    #     json.dump(car_data, f, indent=4, ensure_ascii=False)

    for make in makes:
        print(f"Fetching models for {make}...")
        models = get_models_for_make(make)
        make_clean = escape_sql(make)
        brand_sql.append(f"INSERT INTO Brand (ID, Name) VALUES ({current_brand_id}, '{make_clean}');")
        brand_id_map[make] = current_brand_id

        for model in models:
            model_clean = escape_sql(model)
            model_sql.append(
                f"INSERT INTO Model (ID, Name, Brand_ID) VALUES ({current_model_id}, '{model_clean}', {current_brand_id});"
            )
            current_model_id += 1

        current_brand_id += 1
        time.sleep(1)  # Evită rate limiting

    with open("insert_brands.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(brand_sql))

    with open("insert_models.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(model_sql))

    print("SQL insert scripts generated: insert_brands.sql și insert_models.sql")

    print("Car data successfully saved to car_data.json!")

if __name__ == "__main__":
    fetch_car_data()
