--Readme document for Yiqi Ji--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
   9 hours, I spend a lot of time to think about how to storage the data.


3. What online resources did you consult when completing this assignment? (list specific URLs)
   I used slack, canvas files, openai to help to finished code. I asked Codex to help
   me understand the requirements and content of this assignment.
   During that process, I also asked about methods and options for storing information,
   and ultimately used Capacitor Preferences to save both types of records.
   I also used it to check the code.
   1.https://app.slack.com/client/T0C4W3N8X16/C0C7GJRE35M
   2.https://canvas.eee.uci.edu/courses/85916/files
   3.https://openai.com/codex/



4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
   After talking with Prof. Reid in class about the pros and cons of different storage options and openai about different storage,
   I chose Capacitor Preferences because  it is simple for a small app and works in the browser.
   The tricky part was that JSON saves dates as text, so I used new Date() to turn them back into Date objects when the app loads and calculates sleep duration.



5. Is there anything special we need to know in order to run your code?
   Nope. I hope this is work :>


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
   I designed this tracker for older adults who have trouble reading small text and busy young people who want to log their sleep quickly.
   I kept the layout simple so both groups can easily find where to add or view a record.

7. Did you design your app specifically for iOS or Android, or both?
   I designed the app for mobile browsers.
   I focused on making it easy to use on a phone screen, without designing it specifically for iOS or Android.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
   On the Overnight tab, users choose when they went to bed and when they woke up, then tap Save sleep.
   I included a date and time for both so the app can calculate how long they slept even if they went to bed before midnight and woke up the next day.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
   Users choose how sleepy they feel and tap Save sleepiness.
   I made the time field optional so they can quickly log how they feel right now, but they can also enter an earlier time if they forgot to log it.

10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
   I put the histories in separate tabs so users can find their overnight sleep or daytime sleepiness records without sorting through a mixed list.
   The most recently saved record goes at the top of each list so users can quickly check that the entry they just added was saved.


11. Which feature choose--using a native device resource, backing up logged data, or both?
   Option 2, backing up logged data.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
   ////


13. If you backed up logged data, where does it back up to?
   Both types of records are saved in the browser’s local storage through Capacitor Preferences.
   When users refresh or reopen the app in the same browser, their records show up again.

14. How does your app implement or follow principles of good mobile design?
   The first screen shows the overnight form and history, and I used clear labels and familiar tabs so the app is easy to use on a phone.
   The Clear button lets users start over before saving, and the app shows an error if they enter a wake time that comes before bedtime.
