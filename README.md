# school-management-backend

## Backend System Overview
![Backend  System Overview](docs/images/Slide1.jpg)

## REST API
[API Docs](docs/api.yaml)

* Backend default port: 4000
* Base address: http://<HOST_NAME>:4000/
* Route Categories:
    * /login - Login related routes
    * /class - Class Management related routes
    * /homework - Homework related routes
    * /df - definition related routes
    * /m - master routes
    * /rel - relationship related routes


### Login Routes
![Login Routes](docs/images/TSD%20Presentation-Page-2.jpg)

### Admin Routes
![Login Routes](docs/images/TSD%20Presentation-Page-3.jpg)

### Parent Routes
![Login Routes](docs/images/TSD%20Presentation-Page-4.jpg)

### Teacher Routes
![Login Routes](docs/images/TSD%20Presentation-Page-5%20(1).jpg)

### Class Routes
![Login Routes](docs/images/TSD%20Presentation-Page-6.jpg)

### Homework Routes
![Login Routes](docs/images/TSD%20Presentation-Page-7.jpg)

### All Other Routes
![Login Routes](docs/images/TSD%20Presentation-Page-8.jpg)

The following is the list of routes following the above architecture
![Similar Routes](docs/images/ListOfSimilarRoutes.png)

### Chat Module Architecture
![Login Routes](docs/images/TSD%20Presentation-Page-9%20(1).jpg)

## Project Report

### Introduction
#### Project Background

. The education sector is a fast-growing industry in Sri Lanka. Due to the rapid development of the private school system, there is huge competition among schools and parents (Department of Census & Statistics, 2019).

![alt_text](docs/images/image1.png "image_tooltip")

Schools are expected to provide many sporting activities and subjects to their students. Due to the higher workload, schools and teachers forget to deliver the required information within a limited period. There is a direct impact on children's education due to this delay. Most of the children like to play or do anything other than homework. If parents or teachers didn’t give any homework, many children would not do any work related to education.

![alt_text](docs/images/image2.png "image_tooltip")

Less work will lead them to lower performances. If parents identify the reasons, they can find solutions. Parent-teacher meetings, home-work, past papers and term tests can be used to identify and correct the weakness of students. Fast and efficient communication and resource sharing between teachers and parents can be used to identify and correct the weaknesses of the children. School attendance is also very important to generate higher performances (attendanceworks.org, 2018).

The team was named as HexaTech as a motivation factor. All team members are possed with keen to learn and overcome challenges.

Members of the team are:

<table>
  <tr>
   <td>
<ol>

<li>Thissa Gunarathne
</li>
</ol>
   </td>
   <td rowspan="6" >as
   </td>
   <td><p style="text-align: right">
Project Manager</p>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Amila Dissanayaka
</li>
</ol>
   </td>
   <td><p style="text-align: right">
Server Administrator</p>

   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Preshan Visad Silva
</li>
</ol>
   </td>
   <td><p style="text-align: right">
Business Analyst</p>

   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Niruhan Viswarupan
</li>
</ol>
   </td>
   <td><p style="text-align: right">
System Developer</p>

   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Mohan Prakashini
</li>
</ol>
   </td>
   <td><p style="text-align: right">
QA Executive</p>

   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Lankitha Gallage
</li>
</ol>
   </td>
   <td><p style="text-align: right">
System Developer</p>

   </td>
  </tr>
</table>

### Aims and objectives

![alt_text](docs/images/image3.png "image_tooltip")


As a team, we expect to reduce the communication gap between teachers and parents. Shilpa (Ys,am) is a **_Progressive Web Application_** developed using **_MERN Stack_** which is to create a user-friendly personalized environment for schools, to maintain their communication between teachers, parents, and students. 

![alt_text](docs/images/image4.png "image_tooltip")


We aim to develop the efficiency of teachers and school management for better results. Development objectives can be categorized into five areas;

#### App messaging:

<table>
  <tr>
   <td rowspan="5" >
<strong><em>Message to</em></strong>
   </td>
   <td>
<ol>

<li><em>All the members</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>An entire grade</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>An entire class</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>A particular parent</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>A teacher from a parent</em>
</li>
</ol>
   </td>
  </tr>
</table>

##### Notifications:

<table>
  <tr>
   <td rowspan="5" >
<strong><em>Send Notifications to</em></strong>
   </td>
   <td>
<ol>

<li><em>Student unauthorized absence</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Fees reminders</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Parent-teacher meetings</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Homework</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Annual student profile update by parents</em>
</li>
</ol>
   </td>
  </tr>
</table>

#### Time tables:

<table>
  <tr>
   <td rowspan="3" >
<strong><em>Record</em></strong>
   </td>
   <td>
<ol>

<li><em>Class time table</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Exam time table</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Extra activities</em>
</li>
</ol>
   </td>
  </tr>
</table>

#### Downloads:

<table>
  <tr>
   <td rowspan="3" >
<strong><em>Links to download</em></strong>
   </td>
   <td>
<ol>

<li><em>Exam report card</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Exam past papers</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Academic reports</em>
</li>
</ol>
   </td>
  </tr>
</table>

#### File update:

<table>
  <tr>
   <td rowspan="5" >
<strong><em>Master  & Transaction</em></strong>
   </td>
   <td>
<ol>

<li><em>Student profile</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Teachers profile</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>School calendar</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Contact information</em>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li><em>Attendance</em>
</li>
</ol>
   </td>
  </tr>
</table>

#### Project Planning

<table>
  <tr>
   <td>
<img src="docs/images/image5.png" width="" alt="alt_text" title="image_tooltip">
   </td>
   <td><em>Here shows the Gantt chart used in the life cycle of software development of the project.</em>
<ul>

<li>There are five milestones to check the progress with the time. Using milestones project deviation can be identified.
<ul>

<li>Parallel activities are visible in the same colours. Then identification of such tasks is easier than other tasks.
</li>
</ul>
</li>
</ul>
   </td>
  </tr>
</table>

### ask Allocation

Task allocation is done according to the selected role of the members. There are three members allocated for programming and development related tasks. Other three members are assigned for quality assurance, business analysis and project management. Task allocation sheet is an effective way to identify members assigned for each task.


<table>
  <tr>
   <td colspan="4" ><strong><em>Project Name</em></strong>
<p>
<strong><em>Shilpa(Parents teacher communication application)</em></strong>
   </td>
   <td colspan="3" ><strong><em>Project Start Date</em></strong>
<p>
<strong><em>15/01/2020</em></strong>
   </td>
  </tr>
  <tr>
   <td><em>Brainstorming</em>
   </td>
   <td>15/12/2019
   </td>
   <td>High
   </td>
   <td>15/12/2019
   </td>
   <td>Done
   </td>
   <td>Every team member
   </td>
   <td>Discussion about the project topics
   </td>
  </tr>
  <tr>
   <td><em>Requirement gathering</em>
   </td>
   <td>30/1/2020
   </td>
   <td>Normal
   </td>
   <td>28/01/2020
   </td>
   <td>Done
   </td>
   <td>Preshan
   </td>
   <td>Completed successfully
   </td>
  </tr>
  <tr>
   <td><em>Business feasibility analysis</em>
   </td>
   <td>4/2/2020
   </td>
   <td>Normal
   </td>
   <td>3/2/2020
   </td>
   <td>Done
   </td>
   <td>Preshan/Amila/Thissa
   </td>
   <td>Completed successfully
   </td>
  </tr>
  <tr>
   <td><em>Technical feasibility analysis</em>
   </td>
   <td>10/2/2020
   </td>
   <td>Normal
   </td>
   <td>10/2/2020
   </td>
   <td>Done
   </td>
   <td>Lankitha/Niruhan/Amila
   </td>
   <td>Completed successfully
   </td>
  </tr>
  <tr>
   <td><em>Software design phase 1</em>
   </td>
   <td>15/02/2020
   </td>
   <td>High
   </td>
   <td>15/02/2020
   </td>
   <td>Done
   </td>
   <td>Lankitha/Preshan/Amila
   </td>
   <td>Completed successfully
   </td>
  </tr>
  <tr>
   <td><em>Software design phase 2</em>
   </td>
   <td>18/02/2020
   </td>
   <td>High
   </td>
   <td>18/02/2020
   </td>
   <td>Done
   </td>
   <td>Preshan/Niruhan/Lankitha
   </td>
   <td>Completed successfully
   </td>
  </tr>
  <tr>
   <td><em>User interface design</em>
   </td>
   <td>14/02/2020
   </td>
   <td>Normal
   </td>
   <td>27/03/2020
   </td>
   <td>Pending
   </td>
   <td>Lankitha
   </td>
   <td>Pending due to the workload of the programmer
   </td>
  </tr>
  <tr>
   <td><em>Quality Assurance Of the Design</em>
   </td>
   <td>20/02/2020
   </td>
   <td>Normal
   </td>
   <td>27/03/2020
   </td>
   <td>Pending
   </td>
   <td>Prakashini
   </td>
   <td>Partially completed
   </td>
  </tr>
  <tr>
   <td><em>Back-end Programming</em>
   </td>
   <td>8/3/2020
   </td>
   <td>High
   </td>
   <td>10/3/2020
   </td>
   <td>Done
   </td>
   <td>Niruhan
   </td>
   <td>Most of the development process done
   </td>
  </tr>
  <tr>
   <td><em>Front-end programming</em>
   </td>
   <td>15/03/2020
   </td>
   <td>High
   </td>
   <td>27/03/2020
   </td>
   <td>Pending
   </td>
   <td>Lankitha
   </td>
   <td>Pending due to the workload of the programmer
   </td>
  </tr>
  <tr>
   <td><em>Integration of the Modules</em>
   </td>
   <td>17/03/2020
   </td>
   <td>High
   </td>
   <td>27/03/2020
   </td>
   <td>Pending
   </td>
   <td>Lankitha/Amila/Niruhan
   </td>
   <td>Pending due to defendant work
   </td>
  </tr>
  <tr>
   <td><em>Testing</em>
   </td>
   <td>18/03/2020
   </td>
   <td>Normal
   </td>
   <td>27/03/2020
   </td>
   <td>Pending
   </td>
   <td>Prakashini/Preshan/Thissa
   </td>
   <td>Pending due to defendant work
   </td>
  </tr>
  <tr>
   <td><em>Quality Assurance Of the software</em>
   </td>
   <td>20/03/2020
   </td>
   <td>Normal
   </td>
   <td>27/03/2020
   </td>
   <td>Pending
   </td>
   <td>Prakashini
   </td>
   <td>Pending due to defendant work
   </td>
  </tr>
  <tr>
   <td><em>Finalize the development process </em>
   </td>
   <td>20/03/2020
   </td>
   <td>Normal
   </td>
   <td>27/03/2020
   </td>
   <td>Pending
   </td>
   <td>Lankitha/Niruhan/Preshan
   </td>
   <td>Pending due to defendant work
   </td>
  </tr>
</table>

### Risk management

Risk management is an important part of the successful completion of the project. Software risk management requires a greater depth of knowledge than other risk management processes.

#### Identified Risks

<table>
  <tr>
   <td><strong><em>ID</em></strong>
   </td>
   <td><strong><em>Identified Risk</em></strong>
   </td>
   <td><strong><em>Risk management method</em></strong>
   </td>
  </tr>
  <tr>
   <td><strong><em>R<sub>1</sub></em></strong>
   </td>
   <td><em>Not being able to complete the project on time</em>
   </td>
   <td>Assign half of the team members for development related tasks. Frequently ask programmers to present their work.
   </td>
  </tr>
  <tr>
   <td><strong><em>R<sub>2</sub></em></strong>
   </td>
   <td><em>Less user satisfaction</em>
   </td>
   <td>Instructions were given to the developers and business analysis to tally the gathered requirements and development output. 
   </td>
  </tr>
  <tr>
   <td><strong><em>R<sub>3</sub></em></strong>
   </td>
   <td><em>Cost overrun</em>
   </td>
   <td>Encourage members to develop most of the modules within the team. 
   </td>
  </tr>
  <tr>
   <td><strong><em>R<sub>4</sub></em></strong>
   </td>
   <td><em>Complete failure of the project.</em>
   </td>
   <td>Due to coronavirus infections, there is a possibility that the project fails. Advice has given to the members to maintain their health.
   </td>
  </tr>
  <tr>
   <td><strong><em>R<sub>5</sub></em></strong>
   </td>
   <td><em>Software quality problems</em>
   </td>
   <td>Rigorous quality assurance testing and validation
   </td>
  </tr>
  <tr>
   <td><strong><em>R<sub>6</sub></em></strong>
   </td>
   <td><em>knowledge gaps of the members</em>
   </td>
   <td>Self-learning  the identified gaps online, and knowledge sharing among group members
   </td>
  </tr>
  <tr>
   <td><strong><em>R<sub>7</sub></em></strong>
   </td>
   <td><em>Less Commitment of the team members.</em>
   </td>
   <td>Always motivate team member to finish the work as soon as possible
   </td>
  </tr>
</table>

#### System Analysis

System analysis is used to identify requirements and convert them into a software reality. First required information should be collected. By analysing gathered requirements, the framework of the software can be designed.

### Fact gathering techniques

_We used the following techniques to gather the required information._

1. **_Interviews_** - Top-down approach used frequently
2. **_Observation_** - school work process observed 
3. **_Document Analysis_** - analysis student reports, school letters and documents   published on the notice board
    
#### Analysis of gathered facts

According to the gathered facts, most of the schools expect unique applications rather than a common application. They need to overcome the weakness of the Whatsapp app. Their budget is also limited. Schools expect to reduce the workload of the teachers up to some extent. They mainly expect attendance, absence tracking, homework distribution, attendance to extracurricular activities, payment reminders and individual directed communication using the mobile application. Better security of the application and over-the-phone production support also among the expectations of the school management.

### Software Requirement Specification

#### Introduction:
The purpose of this document is to improve communication systems in school.									

**_Document convention_: **Database, distributed database and the entity relationships

#### Feasibility Study
##### Economic feasibility
1. SHILPA reduced a lot of manual work in school.
2. Using SHILPA app school's work efficiency will be improved.
3. Student’s sensitive information (eg. medical updates) can be updated safely and no unauthorized access.

**_Therefore Shilps app is economically feasible._**

##### Technical feasibility
1. MongoDB is used as a database which is easy to install and setup and easy to scale. 
2. The app is developed under the ReactJS environment where it provides real and significant mobile applications and it supports both Android and iOS mobile devices. It will save developers time because developers do not need to develop two applications for Android and iOS.

**_Therefore Shilpa app can be developed in a reasonable time._**

##### Operational feasibility

The Shilpa app develops to enhance communication and relationship between schools and families. Since the app can run on both Android and iOS mobile devices, anyone can log in to the app at any time anywhere. School computer laptops or tablets can be used for backend purposes. Since the server is hosted on the cloud, no need to keep the server administrator to look after the server and take backups. 

**_Therefore  Shilpa app is operationally easy to handle._**

##### Intended audience & suggestions

The system is restricted within the school premises with admin, students, parents and teachers.  This was implemented under the requirements gathered from;

<table>
  <tr>
   <td><strong><em>Interview with</em></strong>
   </td>
   <td><strong><em>Position</em></strong>
   </td>
   <td><strong><em>School</em></strong>
   </td>
  </tr>
  <tr>
   <td>Rev.Fr. Indunil Sampath
   </td>
   <td>Rector (Primary Principle)
   </td>
   <td>St. Sebastian’s College, Mortuwa.
   </td>
  </tr>
  <tr>
   <td>Mrs Aruni Fernando
   </td>
   <td>Class teacher
   </td>
   <td>St. Sebastian’s College, Mortuwa.
   </td>
  </tr>
  <tr>
   <td>Mrs Shalika Perera
   </td>
   <td>Parent
   </td>
   <td>St. Sebastian’s College, Mortuwa.
   </td>
  </tr>
  <tr>
   <td>Mas Nimira Cooray
   </td>
   <td>Student
   </td>
   <td>St. Sebastian’s College, Mortuwa.
   </td>
  </tr>
  <tr>
   <td>Mrs Sharmila Fernando
   </td>
   <td>Sectional head
   </td>
   <td>Holy Family Convent, Bambalapitiya.
   </td>
  </tr>
  <tr>
   <td>Mrs Rozan
   </td>
   <td>English teacher
   </td>
   <td>Holy Family Convent, Bambalapitiya.
   </td>
  </tr>
</table>

##### Project Scope
1. Access to students, parents, teachers, and admins to use the new application
2. Direct messaging between teachers and parents
3. Storing student details in the database
4. Attendance tracking
5. Fee status tracking and reminders
6. Parent-teacher meeting scheduling
7. Homework distribution

##### Out of Scope
1. Online fee payment through gateway
2. Timetable for subjects, extracurricular activities
3. Advanced level stream recommendation
4. School transport GPS tracking
5. School calendar view

##### Other Equivalent Systems

We refer to a few other systems to identify the process. We aim to identify the process to build our system with the higher compatible ability to the market. here are a few systems with their functions.

###### ParentSquare

![alt_text](docs/images/image6.png "image_tooltip")

**_Features:_**

<table>
  <tr>
   <td>
<ol>

<li>Sending individual messages
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Sending group messages
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Newsletters
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Sending emergency alerts/notification
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Students attendance management
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>School directory
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Payments update
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>School calendar
</li>
</ol>
   </td>
  </tr>
</table>




        10. **_  TASS.web_**

![alt_text](docs/images/image7.png "image_tooltip")


**_Features:_**


<table>
  <tr>
   <td>
<ol>

<li>Student profile / Attendance / Assignment
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Update medical information of the student
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Behavioural management
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>The Internet payment gateway for pay fees
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Test time tables
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Test results
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Assessment results
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>View teachers comments 
</li>
</ol>
   </td>
  </tr>
</table>




2. **_Product description_**
    14. **_Product Perspective_**

There are three major users of the system;


<table>
  <tr>
   <td><strong><em>Student</em></strong>
<p>
Basic Student Information
<p>
Class Details
<p>
Attendance
<p>
Marks
<p>
Extracurricular Activities
   </td>
   <td><strong><em>Parent</em></strong>
<p>
Basic Parent Information
<p>
Occupation Details
   </td>
   <td><strong><em>Teacher</em></strong>
<p>
Basic teacher Information
<p>
Education qualifications
<p>
Teaching subjects
<p>
Extracurricular
   </td>
  </tr>
</table>

![alt_text](docs/images/image8.png "image_tooltip")


Apart from the users mentioned above, there are administrative users. Who have all the rights to maintain the system.



    15. **_User Class and Characteristics_**

![alt_text](docs/images/image9.png "image_tooltip")




        11. **_Functions & Features are shown below_**

**_Functions:_**



1. Hostel administration (future development)
2. Learning administration
3. Education dashboard
4. Class, marks and registration update
5. Disciplinary management etc.(future development)

**_Features_**:



1. Centralized app for schools
2. Maintain system users
3. Sending messages, popup notifications to parents
4. Finalizing the exam marks, average, ranks
5. Informing the parent's meetings, calendar reminders
6. Downloads

![alt_text](docs/images/image10.png "image_tooltip")




    16. **_Tools & Environment _**

<table>
  <tr>
   <td>

<img src="docs/images/image11.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>

<img src="docs/images/image12.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>

<img src="docs/images/image13.jpg" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>

<img src="docs/images/image14.jpg" width="" alt="alt_text" title="image_tooltip">

   </td>
  </tr>
  <tr>
   <td>

<img src="docs/images/image15.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>

<img src="docs/images/image16.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>

<img src="docs/images/image17.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>
   </td>
  </tr>
</table>


The operating environment for this school application is used are;



1. Hosting Server – **_CentOS 7.8_**
2. Firewall – **_IPTables_**
3. Frontend Platform – **_ReactJS_**
4. Backend Platform – **_NodeJs_** + **_Express_**
5. Database – **_MongoDB_**
6. Push Notifications - **_Firebase_**
    17. **_Database distribution_**

![drawing](https://docs.google.com/drawings/d/12345/export/png)                                                                                                      
    18. **_Client / Server System_**
1. Distributed with client/server side.
2. All data resides on the server-side
3. The application executed on the client-side.
    19. **_ Hardware_**

_The system can be used with the following hardware_



1. Tablet
2. Desktop
3. Mobile phone
    20. **_Software Quality Attributes_**
1. **_Availability_**: including all detailed information(competition venue, time transport facility).
2. **_Correctness_**: passing an accurate information
3. **_Maintainability_**: admin will manage the database and the app
4. **_Usability_**: satisfy the school team and parents.
3. **_System Design_**
    21. **_ 3-Tier Architecture_**

Three-tier architecture is used to compose the layers of logical computing,  as per to our application we used as a specific type of server-side and client-side.  This supported many benefits for the development environment and modularizing the user's interface, data storage of a school. As well, it was very useful to update a specific new feature to an application independently of other parts with flexible improvement in the overall development process. This is used because it can help the application to redevelop and modernize without affecting other functional business data access. It contains a presentation, layer and data tier and well supportive architecture to speed up the development of an application and to check it’s performances and to modularize.

It was used for end application from the database and selected according to school needs, specific parts of the application without affecting other features. These were developed as layers it showed in below image.

![alt_text](docs/images/image18.png "image_tooltip")

    22. **_Agile Methodology_**

This methodology is used to develop school application and it is used to determine  the enhancement needed on the development methods and terms with five those are as  follows;

**_Requirement Analysis_: **The** **stage where the needed requirements are gathered in some schools and describe the problems and motivation for building the school application. 										

**_Planning_: **Targeting the end-users and deciding the time duration and frequent versions.  Hence feedback is received regularly. Debugging the errors, and fixing the problems on time.									

**_Designing_**: An approach using XP and coding style with simple designs to log and view by delivering the domain knowledge to users. Tasks are allocated according to the respective developers and keeping the task in the form of a board of “to do” and “in progress”.  **					**

**_Testing_:** Mapping for the process and testing is created in every iteration and it has been started and an artefact is constructed. After the iteration levels, the whole system is tested and results demonstrated immediately. XP uses TDD techniques to ensure all implemented features are tested.						 

**_Release_: **In this phase, we review the results,  then assess the current performance of the application. Identifying whether the system is completed without any errors and failures, Checked whether it is supported to the end-users when release is planned for retirement.	

**_Maintenance_: **Once the feedback is received from schools at each stage, the results are discussed with the team and the features are further improved and the factors are decided according to their perspective.  

This model is used to get high-quality applications and it is a more adaptable alternative with a unique modification. Due to the above features and advantages, we decided to use an Agile methodology to develop our application.



4. **_System development_**
    23. **_Development of the Prototype_**

Two different prototypes were made. The first was made for the interim presentation. Based on the feedback from the lecturer we decided to develop a new prototype from scratch. In the prototype both the frontend and backend was developed within the same project and 3-tire architecture was not fully used. The frontend was developed using ReactJS and the backend using Node.js + Express. The frontend was basic and not responsive. It behaved more like a static web page rather than a responsive React application. Based on suggested data model changes and feature changes we moved onto the next version which is described in the next section.



    24. **_Used Technologies/Algorithm_**

As discussed earlier, a 3-tire architecture was applied in development. Model and controller resided in the backend and the view was made in the front end. The backend was built in Node.js with Express server. Socket.io was used for developing messaging systems. 

The model was designed as Mongoose schemas which can be stored in MongoDB. The backend and frontend communicate using REST API with HTTP requests. The frontend was developed in ReactJS and use Axios to connect with the backend. The UI was developed with Material-UI & Bootstrap. 

![alt_text](docs/images/image19.png "image_tooltip")


Once a user is logged in a key is sent to the frontend, this will be used for all the transactions. And along with the username password, the system is sending the service key using for the push notifications to the server to map the users for the notifications. This is used with the Firebase for the notifications. 

![alt_text](docs/images/image20.png "image_tooltip")


Sample of a sent token is shown below;

![alt_text](docs/images/image21.png "image_tooltip")


Users of the system are derived as Administrators, Teachers, Parents, Students. Each of them has different credentials of the system. Administrators have all the authentication. 

![alt_text](docs/images/image22.png "image_tooltip")


Administrators can maintain the core details of the organization. The option for the privileges is limited.

![alt_text](docs/images/image23.png "image_tooltip")


	Once a notification needs to be sent to a specific group, an administrator or an authorized teacher and push the notifications to the firebase server. And the users will get them instantly. A sample notification is shown below;

![alt_text](docs/images/image24.png "image_tooltip")


System users can also use the internal messaging service to send and receive messages. When a user logged in and chat using socket.io a port is reserving for s particular message thread. System users can be assigned to theses threads by the administrator.

![alt_text](docs/images/image25.png "image_tooltip")

GitHub was used for version controlling and collaborating among team members.

5. **_System QA Testing _**

 **Report**

Testing is combined as manual testing and automated testing for the front end. According to our school application, I used manual testing for the front end by creating the test cases in excel sheets which allows us to cover all functional & nonfunctional scenarios in our system. Back end was tested using MongoDB, Node.js and Postman while testing the back-end the first time it was successful and again when testing other parts overall back-end testing got stuck I restarted and tried to get results but errors continuously occurred therefore that unable to give the results because of time constraints. For front end presentation I used the excel sheet to update the process of application whether the application passes or fails with actual and expected results, test cases are created along with the development. As per our team development, we followed the agile methodology in which it can repeat the process in the development stage and from time to time new features are implemented. To test the function, I used some process & procedures which the specific function got pass without any failure. While testing front end errors and bugs are identified and reported to our developer then all bugs errors are corrected by developers. Once bugs are fixed again, execute the failing test case to verify whether the specific function is passed.

![alt_text](docs/images/image26.png "image_tooltip")

**QA Testing methods, process, procedures**

As a QA the testing more importantly concerned to give a good quality of product to the specific school, therefore that to cover all functional requirements without any failure in the application I followed some testing process and procedures those are as below,

**1.** 	**QA Testing Methods Analyzed**

![alt_text](docs/images/image27.png "image_tooltip")

**2.** 	**Test Design -** Manual Testing with excel test cases

**3.** 	**Testing Methodology - agile testing strategy**

 The below shows the procedures and process how application tested as per to agile testing strategy

![alt_text](docs/images/image28.png "image_tooltip")

**4.**     **Retest Error test strategy **

Tracking the error in UI if errors are tracked and identified in application reporting to developer to fix the bugs and give back to retest the specific functions to check get pass.

![alt_text](docs/images/image29.png "image_tooltip")
