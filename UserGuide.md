
Add Answered Feature
------------------------------------------------

Using the new "mark as answered" feature differs depending on your status in the website.

If you are an admin, once you have clicked on a topic and if the word "answered" does not appear on the post bar, then you have the ability to mark the question answered. You do this by clicking on the settings button and going down to the bottom of the drop-down menu where it says "mark question answered for all". Once you click this, the topic is marked in the database that that question is answered and once the page is refreshed the word "answered" will appear in the post bar. 

If you are an instructor, once you have clicked on a specific topic and if the word "answered" is not in the post bar, there will instead be a button that says "mark question as answered for all". After it is clicked the question will be marked answered in the database and once the page is refreshed the word "answered" will show up in the post bar where the button used to be. 

If you are a student, you do not have the ability to mark posts as answered. You will only be able to see if the word "answered" appears in the post bar of the post marking that question as answered. 

--------

The key routines that implement or help implement the new feature (and hence, need testing) are

   Topics.markAsAnsweredForAll  in new file   src/topics/answered.js
   SocketTopics.markAsAnsweredForAll in new file  src/socket.io/topics/answered.js
   User.isInstructor  in src/user/index.js
   privsUsers.isInstructor  in  src/privileges/users.js

A new integer field 'answered' was added in  

    src/topics/data.js  
    
for each topic. This field is stored in the database.  If set to zero, the topic is NOT answered; but if set to 1, this means the topic has been answered.   Introduced in this way, this value automatically gets passed by the controller to the view template for a topic.

To pass if the user has account-type 'instructor' to the view template for a topic, a boolean field "isInstructor" was added to topicData via

   topicData.isInstructor in src/controllers/topics.js

When viewing a topic, the "post bar" containing the new button to mark as answered or the message showing that the topic has been answered is drawn using the template in   

     templates/partials/post_bar.tpl.

The added drop down menu item for the admin to mark as answered is in a [component="topic/mark-answered-for-all"] in

     public/src/client/topic/threadTools.js

This client-side component does a socket.emit(..) to call the server-side markAsAnsweredForAll.  The SocketTopics.markAsAnsweredForAll listens for this emit, then calls the Topics.markAsAnsweredForAll to modify the database.

--------

The testing code for this feature is found in these files:

test/topics.js   lines 39, 45-50, 1741-1799
This tests the functionality of the markAsAnsweredForAll routine by 
  - throwing an error if the topic id of the question is null
  - throwing an error if the topic id does not exist in the database
  - throwing an error if the user id is 0
  - throwing an error if the user is not an admin and not an instructor
  - succeeding if the user is an admin (checks that the database is correctly updated)
  - succeeding if the user is an instructor (checks that the database is correctly updated)


test/user.js     lines 243-267
This tests the privsUsers.isInstructor function.  This function takes a user id "uid" as input and returns a boolean: true if the user with that user id has account-type 'instructor', false otherwise.  This testing code tests the isInstructor function by
  - returning false if the user associated with the user id is not an instructor
  - returning true if the user associated with the user id has account-type 'instructor'
  - returning false if the input user id is null
  - returning false if the input user id is undefined
Anyone who logs in as an instructor on the website is marked as such, and will therefore have the specific privileges of that of an instructor and not a student or admin.  

I believe that these tests are sufficient because they cover all possible inputs that could be given to the markAsAnsweredForAll and isInstructor function. 

Anonymizing Posts Feature
------------------------------------------------

The anonymizing posts feature allows users to toggle between displaying their username or anonymizing their posts. When a user chooses to anonymize their post, their username is replaced with "Anonymous" and the profile link associated with it is removed so that other users can't visit their profile. Posters also have the option of reverting their anonymity if they so desire. The anonymizing posts feature is implemented as a button within the post list dropdown. Users can easily toggle the anonymization of their posts with a simple click.

# Usage: 
To anonymize your posts:
1. Navigate to the post you want to anonymize.
2. Locate the dropdown menu associated with the post.
3. Click on the "Anonymize" button.
4. Your username will be replaced with "Anonymous" and the profile link will be removed.

To revert to displaying your username:
1. Follow the same steps as above.
2. Click on the "De-anonymize" button.

- Anonymizing your posts will remove any association with your username and profile link.
- De-anonymizing your posts will revert them to displaying your username and profile link.

Known issues with the anonymization button: 
- The visual changes made to the post is only available client-side. Other users may not see the anonymization changes.
- Pressing the button currently causes an error asserting that "posts.makeAnonymous" is not a function.
- There might be buggy interactions between the toggling anonymous feature and labeling students/instructors feature.

--------
Files modified include public/src/client/topic/events.js, public/src/client/topic/postTools.js, src/posts/anonymize.js, src/socket.io/posts/anonymize.js, themes/nodebb-theme-persona/templates/partials/topic/post-menu-list.tpl, etc. 


=======

# Getting started

# New Features

## Account type markers
Upon creating an account, users have the ability to select between an "Instructor" account and a "Student" account. Previously, this did not display anywhere. Now, upon sending a message, there is a box for the user's account type right next to the username.
You can test this manually by simply making an account and making a new post; the marker should show up. In addition, it can be tested using the tests in tests/posts.js under "Account Type". These tests check that the user's account type is correctly stored in a post, which means that the front-end will be able to pull it up. The tests check both possible account types (instructor and student), so the tests added are sufficient.

# Testing

## User tests

## Automated tests


-- Team Purple_Pizzazz

