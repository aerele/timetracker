from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in timetracker/__init__.py
from timetracker import __version__ as version

setup(
	name="timetracker",
	version=version,
	description="Time Tracker",
	author="Aerele Technologies",
	author_email="dev@aerele.in",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
