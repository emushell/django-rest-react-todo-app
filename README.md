## Todo Demo App based on Django Rest Framework
An example demo project with Django REST framework as backend.
For authentication is used Django Rest Framework simplejwt.

### API Endpoints

#### Users

* **/api/register/** (User registration endpoint)
* **/api/login/** (User login endpoint)
* **/api/token/refresh/** (User jwt token refresh endpoint)
* **/api/email-verification/{verification_token}/** (User email verification endpoint)
* **/api/profiles/{profile-id}/** (User profile retrieve, update and destroy endpoint)
* **/api/password-reset/** (User password reset endpoint)
* **/api/password-reset-confirm/{uidb64}/{token}/** (User password confirm endpoint)

#### Tasks

* **/api/tasks/** (Task create and list endpoint)
* **/api/tasks/{task-id}/** (Task retrieve, update and destroy endpoint)

### Install 

    pip install -r requirements.txt
    python manage.py makemigrations
    python manage.py migrate

### Usage

    python manage.py runserver

### Tests
    python manage.py test

#### TODO:
* Write tests for react frontend
* Create custom user model, where username is email.
* Update installation and usage description.