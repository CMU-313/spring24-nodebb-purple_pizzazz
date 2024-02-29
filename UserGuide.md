
# Added Answeredness Feature
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

# Added feature to sort topics by answeredness

A user has the ability to sort by answeredness. This option is available to all users, including students and guests.

In a category page, clicking the "Sort by" button will show a menu at the bottom of the screen. A new button has been added to this menu, which says "Answered". Clicking this will cause answered topics to fall to the bottom of the category page. 

Due to the way that answeredness is implemented, topics that were posted before this update will not show up on the page unless answered after the fact.

---------------

The changes to the code that facilitated this feature are already well-covered by preexisting automated tests, including those for answeredness as a feature and the database sorting ranges in test/database/sorted.js. 

However, to test that the changes to the database when a topic is marked answered affect the sorting as well, some assertions are added to some answeredness tests in test/topics.js.

=======

<-- To be determined at a later time. -->

# Getting started

# New Features

# Testing

## User tests

## Automated tests


-- Team Purple_Pizzazz

