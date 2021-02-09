# Medication Tracker

## A medication and blood pressure tracking application

https://medication-track.herokuapp.com/

This application is a solution for people who want to quickly and easily track their medication intake; and, if needed, easily compile the data to give to a physician.

---

<br/>

<figure>
   <img 
      src='https://github.com/StevenSigil/ToDo-Django-React/readme_imgs/Med_main.png' 
      alt="Medication Tracking Dashboard"/>
   <figcaption><strong>Medication Tracking Dashboard</strong></figcaption>
</figure>

## <br/>

This project came to be, when a friend explained how so many medication
tracking applications, on desktop and mobile, are way too cumbersome (given her intended use). After asking more questions to clarify what she was looking for, I couldn't see any reason that it couldn't be done!

_With the current version, tracking of blood pressure has also been included per another suggestion from a friend._

---

---

<br/>

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

---

<br />

## Screenshots

<figure>
   <img 
      src='https://github.com/StevenSigil/ToDo-Django-React/readme_imgs/bp_main.png' 
      alt="Blood Pressure Tracking Dashboard"/>
   <figcaption><strong>Blood Pressure Tracking Dashboard</strong></figcaption>
</figure>

<br />

<figure>
   <img 
      src='https://github.com/StevenSigil/ToDo-Django-React/readme_imgs/Med_manage.png' 
      alt="Manage Medications Modal"/>
   <figcaption><strong>Manage Medications Modal</strong> - Delete medications from your User instance</figcaption>
</figure>

<br />

<figure>
   <img 
      src='https://github.com/StevenSigil/ToDo-Django-React/readme_imgs/Med_manage.png' 
      alt="Blood Pressure Tracking Dashboard"/>
   <figcaption><strong>Blood Pressure Tracking Dashboard</strong></figcaption>
</figure>

<br />

<figure>
   <img 
      src='https://github.com/StevenSigil/ToDo-Django-React/readme_imgs/download.png' 
      alt="Download History Modal"/>
   <figcaption><strong>Download history modal</strong> - Select a start & end date and the download will retrieve your logs between those dates.</figcaption>
</figure>

<br />

<figure>
   <img 
      src='https://github.com/StevenSigil/ToDo-Django-React/readme_imgs/download_example.png'
      alt="Example Output from Download"/>
   <figcaption><strong>Example Output from Download</strong> - (CSV formatted log instances)</figcaption>
</figure>

---

---

<br/>

## Local development notes

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

```js
// include the following
"proxy": "http://127.0.0.1:8000"
```

- **src/util/axios.js**

```js
// Change the base URL of axiosInstance to the following
baseURL: "http://127.0.0.1:8000/api/";
```
