# Danny Gimeno Personal Page and Web Dev Project

Hi! My name is Danny Gimeno. I'm Computer Science Major at Northeastern University in the class of 2020. This is the repo for my personal webpage, assignments, and final project made in CS4550. 

In this website you can find info on my interests, the organizations I'm part of, and projects I've worked on.

## WebDev Project
My semester project for webdev is a music research platform for general researchers, promoters, and agents. It will allow them to see popularity data (e.g. facebook likes) for musical artists and follow artists they are interested in or work with. You can go to it by clicking the 'Web Dev Final Project' of my homepage.

### Design
Below is the UML design of my project:
![Project Design](/public/project/doc/Gimeno_Project2.png)

### Prototype
You can now test drive the website and spotify api when you access the final project tab!

- One can test the user-domain relation by creating a user and adding an artist to their watch list.
- One can test the user-user relation by creating a venue or agent user, adding a user to the artists played or claimed
artist (respectively), and then accessing the artist profile from any other user to see what venues the artist has played
or what agent they are currently working with (respectively).

### Testing Workflows

#### Use Case 1 - User to User
1) Go to project homepage and login to Spotify if you have not already
2) Search for an artist using search bar
3) Click on artist artist page
4) See users that have added this artist to their lists

#### Use Case 2 - User to Domain Object
1) Go to project homepage and login to Spotify if you have not already
2) Click the login button in the top right and login
3) Back at the homepage, search for an artist using the search bar
4) Add an artist to one of your lists
5) Click on the head glyphicon at the top right an navigate to your profile
6) See artist information added to chosen watch list

#### Use Case 3 - Domain Object to Domain Object
1) Go to project homepage and login to Spotify if you have not already
2) Login to a non-Researcher user
3) Search for an artist
4) Add artist as a show (promoter or venue) or a claimed artist (agent)
5) Go to artist page and see show/claimed for them

#### Use Case 4 - Third Party Api Search
1) Go to project homepage and login to Spotify if you have not already
2) Type in artist name into search bar and click 'Search!'
3) See artist results for that search

#### Use Case 5 - View Detailed Search
1) Go to project homepage and login to Spotify if you have not already
2) Type in artist name into search bar and click 'Search!'
3) See artist results and click on artist page
4) See detailed artist information

#### Use Case 6
1) Go to project homepage and login to Spotify if you have not already
2) Login as admin
3) Click head glyphicon at top right to go to profile
4) Click orange "Website Admin Function Button"
5) See all data