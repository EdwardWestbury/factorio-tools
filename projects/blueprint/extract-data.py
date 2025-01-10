# import json

# def extract(data, keys):
#     out = []
#     queue = [data]
#     while len(queue) > 0:
#         current = queue.pop(0)
#         if type(current) == dict:
#             for key in keys:
#                 if key in current:
#                     out.append({key: current[key]})
#             for val in current.values():
#                 if type(val) in [list, dict]:
#                     queue.append(val)
#         elif type(current) == list:
#             queue.extend(current)
#     return out

# with open('data-raw-dump.json', 'r') as f:
#     data = json.load(f)

# keys = ["inserter"]

# with open('extracted-data.json', 'w') as f:
#     json.dump(extract(data, keys), f, indent=2)


import json

def find_objects_by_key_value(json_data, key_value_pairs):
  """
  Finds objects in the JSON data that match the given key-value pairs.

  Args:
    json_data: The JSON data to search.
    key_value_pairs: A list of tuples, where each tuple contains a key and a list of possible values.

  Returns:
    A list of objects that match the given key-value pairs.
  """

  def _match_object(obj, key_value_pairs):
    for key, values in key_value_pairs:
      if key in obj and obj[key] in values:
        return True
    return False

  def _traverse_json(data):
    if isinstance(data, dict):
      if _match_object(data, key_value_pairs):
        yield data
      for value in data.values():
        yield from _traverse_json(value)
    elif isinstance(data, list):
      for item in data:
        yield from _traverse_json(item)

  return list(_traverse_json(json_data))


def filter_json_data(data, include_keys):
  """
  Filters a JSON array of objects, removing all key/value pairs
  that are not in the provided `include_keys` list.

  Args:
    data: A list of JSON objects.
    include_keys: A list of keys to include in the output.
                     Can include nested keys using dot notation.

  Returns:
    A list of filtered JSON objects.
  """

  def filter_object(obj, include_keys):
    """
    Filters a single JSON object recursively.
    """
    filtered_obj = {}
    for key, value in obj.items():
      if key in include_keys:
        filtered_obj[key] = value
      elif isinstance(value, dict):
        nested_keys = [k.split('.')[1] for k in include_keys if k.startswith(key + '.')]
        if nested_keys:
          filtered_obj[key] = filter_object(value, nested_keys)
    return filtered_obj

  filtered_data = []
  for obj in data:
    filtered_data.append(filter_object(obj, include_keys))

  return filtered_data


def calculate_dimensions(data):
    """
    Calculates the dimensions of the selection_box
    and adds it as a new 'dimensions' property to each object in the data.
    Rounds the dimensions to the nearest whole number.

    Args:
        data: A list of dictionaries, where each dictionary represents an object.

    Returns:
        A list of dictionaries with the updated 'dimensions' property.
    """

    for obj in data:
        if "selection_box" in obj:
            box = obj["selection_box"]
            width = abs(box[1][0] - box[0][0])
            height = abs(box[1][1] - box[0][1])
            obj["dimensions"] = {
                "width": int(round(width)),  # Round width to nearest integer
                "height": int(round(height))  # Round height to nearest integer
            }

    return data

# Example usage:
json_file_path = "data-raw-dump.json"
with open(json_file_path, 'r') as f:
  json_data = json.load(f)

key_value_pairs = [
    ("type", ["inserter", "furnace", "electric-pole"])
]

matching_objects = find_objects_by_key_value(json_data, key_value_pairs)

matching_objects = calculate_dimensions(matching_objects)

keys_to_include = [
  "icon",
  'dimensions',
  "name",
  "next_upgrade"
  "type",
  "graphics_set.animation",
  "hand_base_picture",
  "hand_open_picture",
  "hand_base_shadow",
  "hand_open_shadow",
  "platform_picture"
]

filtered_data = filter_json_data(matching_objects, keys_to_include)

with open('extracted-data.json', 'w') as f:
    json.dump(filtered_data, f, indent=2)
