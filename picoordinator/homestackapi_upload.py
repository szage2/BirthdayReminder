import ifcfg
import json

for name, interface in ifcfg.interfaces().items():
    # Finding internal wlan0 IP address
    ipAddress = ""
    if interface['device'] == "wlan0":
        ipAddress = interface['inet']

dictionary = {
    'ipAddress': ipAddress
        }

jsonString = json.dumps(dictionary)
print(jsonString)

default = ifcfg.default_interface()

with open('homestackapi.json', "w") as outfile:
    outfile.write(jsonString)
