#!/usr/bin/env python3

import json
import shutil
import subprocess
from pathlib import Path


project = Path(__file__).resolve().parents[1]
version = json.loads((project / "manifest.json").read_text())["version"]

for browser, command in (("chrome", "build"), ("firefox", "build:firefox")):
    subprocess.run(["npm", "run", command], cwd=project, check=True)
    archive = project.parent / f"no-noise-linkedin-{version}-{browser}"
    shutil.make_archive(str(archive), "zip", root_dir=project, base_dir="dist")
    print(f"Created {archive}.zip")
