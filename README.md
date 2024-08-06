# Ledokol's support

Ledokol's support is a crowdfunding platform modeled after Patreon, specifically designed to cater to creators and innovators in Kazakhstan. The platform aims to connect artists, content creators, and individuals with groundbreaking ideas to a supportive community willing to contribute and sponsor their endeavors. Ledokol's support strives to nurture creativity, incentivize talent, and provide a sustainable avenue for creators to bring their projects to fruition.

## Key Features:

### Diverse Creativity:
Ledokol's support welcomes creators from various domains, including but not limited to art, music, literature, technology, and more. This inclusivity allows supporters to explore and contribute to a broad spectrum of projects.

### Community Engagement: 
At the heart of Ledokol's support is the endeavor to build a robust community. Creators can engage with their supporters through regular updates, exclusive content, and behind-the-scenes insights, fostering a sense of community and shared achievement.

### Flexible Funding Models: 
Creators have the flexibility to choose from different funding models, such as monthly subscriptions or one-time contributions. This flexibility empowers them to monetize their content or projects in a manner that suits their goals.

### Local Impact: 
Ledokol's support is dedicated to promoting and supporting local talent in Kazakhstan. By focusing on the country's unique cultural landscape, the platform aims to serve as a catalyst for the growth of the creative industry within the region.

### Transparent Transactions: 
The platform ensures transparency in financial transactions, allowing both creators and supporters to easily track contributions and earnings. This transparency builds trust and accountability within the community.

## Mission Statement:

Empower the creative and innovative minds of Kazakhstan by providing a platform where their ideas can flourish with the support of a vibrant and engaged community. Ledokol's support is not just a crowdfunding platform; it's a cultural movement, fostering a renaissance of creativity in Kazakhstan.


## Getting Started

### GitHub Setup

1. Create a new repository on GitHub.
2. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/johnsukadoe/ledokol__support
    ```
3. Move into the project directory:
    ```bash
    cd ledokol__support
    ```

### Backend Setup

1. Install backend dependencies:
    ```bash
    npm install
    ```
2. Move to the backend folder:
    ```bash
    cd backend
    ```
3. Start the backend server using nodemon:
    ```bash
    nodemon server.ts
    ```

### Frontend Setup

1. Move to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install frontend dependencies:
    ```bash
    npm install
    ```
3. Run the frontend development server:
    ```bash
    npm run dev
    ```

### APIs Used
1. News api [https://newsapi.org/docs]
2. Random fact api [https://api-ninjas.com/api/facts]

#### My APIs
##### get
1. /posts - getting all posts
2. /users - getting all users
3. /subscriptions - getting all subscriptions by filter(especially user_id)
4. /login - to login
5. /creator - getting one creator by his id
6. /creators - getting all creators
##### post
1. /subscriptions/unsubscribe - to unsubscribe from some creator
2. /subscriptions/subscribe - to subscribe to some creator
3. /posts - to creating posts
4. /signup - to sign up

##### delete 
1. /post/remove - to delete post by its id
2. /users - to delete someone by his id

##### update(put)
1. /post - to edit post
2. /creator - to edit creator's information

### Frontend framework
Vue.js

### Dev Dependencies
1. Vite
2. autoprefixer
3. postcss
4. sass
5. tailwindcss
6. axios
7. element-plus
8. vue(vuex, vuerouter)
9. fortawesome
10. bcrypt
11. cors
12. express
13. mongodb
14. mongoose

### Deploy
https://ledokol.ems-app.kz/

### Admin info
#### Username: Mirai
#### Password: qwerty

### Attention
1. I want to say that the domain was processed through the frontend, but the endpoints themselves went through the backend server, I hope you will understand me.
2. It may be that third-party APIs will not respond due to a number of problems (please write to me in this case)
3. When you create some user, backend server automatically give him role creator, cause its default role for everage user, and also database have role admin
4. In header you have option containter that choose language, if you choose some lang then hole page(not api info) will be translate to this lang, also when you go to another page, language will be save in ahoter page also

## Project Images
1.There is a main page where you have 2 link(sign in and sign up), and you can chooose one of them to redirect form page
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/e812f5fd-e06f-440e-8ce3-6326bf60444b)

2.Login form(sign up form also like this)
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/4bf9ed54-208f-4d4f-a8d5-2e693db0fa10)

3.Homepage, there you can check the recommendations where published posts and recently actions, you can go to creator's account with click to username of account that upper post title, and also you have a header
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/d76df2be-2fb6-4bdb-adb9-6a7b88930a56)

4.News page(news api)
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/fa326942-1956-407e-91a0-683e45f360f6)

5. My feed page, there you can watch posts of users that you subscribed
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/065fb59d-fd8f-413a-820e-ad2d17c5cbb5)

6. Subscriptions page, page where are users that you subscribed
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/a832c7db-9224-4af5-9c11-451d7bad34b9)

7. Create page, where you can create post(with multiple language)
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/5b2f4996-1e5c-41e1-9e33-dc5c4e306270)

8. Profile link, where you can check informations about your profile and  go to the settings with button settings, also there I want to admit that if you click to username of user in any posts you will be redirect ot this page(where informations will be creator's, and you can subscribe and ussubscribe, third picture)
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/19b4f7d7-8135-4ed7-b822-c84605dcae0c)
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/1bc0b40d-7774-4c9d-ad81-6355ecde4e74)
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/e104946c-dc47-459f-8d9c-6c05d98f6e26)

9.Settings page where you can rename of your channel description and name
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/8ec53f4a-d938-435e-9787-036c34f4b95c)

10. Logout
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/fc12114b-e0d3-478a-8857-b9710cb02bec)

11. Admin page(available for only users that role is admin) there you see all posts and you can edit or delete these posts(ref to REST api, about create, with link to create page anyone can create post, but if you delete or edit any post then your role need to be admin)
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/8ffcd522-d0bd-4ffe-b581-6ed12eb52bd0)
![image](https://github.com/johnsukadoe/ledokol__support/assets/116514476/ec135dbf-8d63-4c2c-ba20-c3799d119621)










