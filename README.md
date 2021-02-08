# Medication Tracker

## A medication and blood pressure tracking application

<br>

[Link to deployed project](https://medication-track.herokuapp.com/)

This project came to be when a friend explained how so many medication
tracking applications on desktop and mobile are way too cumbersome given her intended
use of these types of applications. After asking more questions to clarify what she was after,
I couldn't see any reason that it couldn't be done. This application is a solution for
people who want to track their medication intake.

With the current version tracking blood pressure has also been implemented per another
suggestion from a friend.

If you would like to visit the website yourself, visit https://medication-track.herokuapp.com/

---

## Outline of project:

1. Create a CRUD backend with Django and PostgreSQL (database) that will allow for:

   - Basic user registration & authentication
   - Create, Read, Delete medication instances
     - Update operations have been deemed not required due to scope of project.
   - Create, Read, and Export a history log from user input data.

2. Develop a frontend _dashboard_ for quickly entering in new data that is easy to use
   on both mobile and desktop platforms.
3. Demonstrate application to original _clients_ (and others). Ask for and use their feedback to
   adjust operations and styles.
4. Deploy to Heroku for client use.

---

### For local development, change the following settings:

- **backend/settings.py**

```python
DEBUG = True
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

- **package.json**

```json
// include the following
"proxy": "http://127.0.0.1:8000"
```

- **src/util/axios.js**

```js
// Change the base URL of axiosInstance to the following
baseURL: "http://127.0.0.1:8000/api/";
```
