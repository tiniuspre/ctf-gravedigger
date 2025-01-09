## Solve

1. Clicking on a grave shows a name, but takes a few seconds.
2. If wi check the "networks" tab in the developer tools, we can see that the name is fetched from a `GET` request to `/grave?grave=1`.
3. If we visit the url we get the name instantly without the animation delay.
4. We can automate this by sending a request to `/grave?grave=<id>` for each grave.

```python
import requests

for i in range(1, 10000):
    r = requests.get(f"http://localhost:8000/grave/{i}")
    if "CTFkom" in r.json()["name"]:  # CTFkom = flag format
        print(r.text)
        break
```
```
{"name":"CTFkom{test}"}
```