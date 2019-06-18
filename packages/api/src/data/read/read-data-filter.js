
export const readDataFilter = {
    "action": "read",
    "model": "Restaurant",
    "where": [
    {
      "field": "rating",
      "operator": "GREATERTHAN",
      "maxValue": 4,
      "minValue": 3
    }
   ]
  }