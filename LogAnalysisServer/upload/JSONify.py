from itertools import groupby
import json
names = ["sourceCode","sourceName"]

with open("list") as f, open("out.json","w") as out:
    grouped = groupby(map(str.rstrip,f), key=lambda x: x.startswith("|"))
    for k,v in grouped:
        if not k:
            json.dump(dict(zip(names,v)),out)
            out.write(",\n")