import json

# Load the JSON file into a Python dictionary
with open('data-raw-dump.json', 'r') as file:
    data = json.load(file)

# Extract the top-level keys
top_level_keys = data.keys()

# Print the top-level keys
print(list(top_level_keys))
