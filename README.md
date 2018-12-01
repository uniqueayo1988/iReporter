[![Build Status](https://travis-ci.com/uniqueayo1988/iReporter.svg?branch=develop)](https://travis-ci.com/uniqueayo1988/iReporter)

# iReporter App

## Project Overview

The **iReporter** app is developed to curb the menace of corruption in Africa. The app enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention.

## Features

1. Users can create an account and log in

2. A user can create a red-flag record (An incident linked to corruption) or an intervention record (a call for a government agency to intervene e.g repair bad road sections, floodings etc).

3. A user can edit or delete records in draft.

4. A user can see all records by individual users.

5. A user can see all records in draft.

6. The admin user is able to do the following:
a. See a list of records.
b. Change the status of a record.

**API endpoints**

| Endpoint | Functionality |
| --- | ---|
| ```GET /red-flags``` | Fetch all red-flag records. |
| ```GET /red-flags/<red-flag-Id>``` | Fetch a specific red-flag record. |
| ```POST /red-flags``` | Create a red-flag record. |
| ```PATCH /red-flags/<red-flag-id>/location``` | Edit the location of a specific red-flag record. |
| ```PATCH /red-flags/<red-flag-id>/comment``` | Edit the comment of a specific red-flag record. |
| ```DELETE /red-flags/<red-flag-id>``` | Delete a specific red-flag record. |

## Resources

* https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

* https://chris.beams.io/posts/git-commit/

* https://expressjs.com

* https://www.npmjs.com/package/postman

* https://mochajs.org/#installation

* https://github.com/airbnb/javascript