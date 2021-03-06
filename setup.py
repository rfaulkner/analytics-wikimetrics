"""
Loads dependencies from requirements.txt and specifies installation details
"""
#!/usr/bin/env python
# follow the frog

from setuptools import setup
from pip.req import parse_requirements

# parse_requirements() returns generator of pip.req.InstallRequirement objects
INSTALL_REQS = parse_requirements('requirements.txt')

# REQS is a list of requirement
# e.g. ['flask==0.9', 'sqlalchemye==0.8.1']
REQS = [str(ir.req) for ir in INSTALL_REQS]

setup(
    name='wikimetrics',
    version='0.0.1',
    description='Wikipedia Cohort Analysis Tool',
    url='http://www.github.com/wikimedia/analytics-wikimetrics',
    author='Andrew Otto, Dan Andreescu, Evan Rosen, Stefan Petrea',
    packages=[
        'wikimetrics',
    ],
    install_requires=REQS,
    dependency_links=[
        'https://git.wikimedia.org/zip/?r=pywikibot/externals/httplib2.git'
        '&format=gz#egg=httplib2-0.8-pywikibot1'
    ],
    entry_points={
        'console_scripts': [
            'wikimetrics = wikimetrics.run:main'
        ]
    },
)
