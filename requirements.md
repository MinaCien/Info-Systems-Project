# Requirements

## User Needs

### User stories
    UC1: As a user, I want to search for the nearby debt agencies so that I can obtain appropriate help and advice.
    UC2: As a user, I want to filter the search for debt advice agencies by specialization so that I can find relevant help.
    UC3: As a user, I want to view the contact details and availabilty of these debt centers so that I can plan my visit.
    UC4: As a user, I want to bookmark my preferred agencies so that I can easily return top them whenever I need them.
    UC5: As a website operator, I want to update the data on the debt advice agencies so that it remains accurate and reliable.
    UC6: As a user, I want view my account options to make real time changes to my account.


### Actors
- Users: person seeking debt advice and other users of the application. 
- Website operators: members who manage the site and approve what goes on (mainly backend) - developers .

### Use Cases
| UC1 - *Wilhelmina*| Search for Debt Advice Agencies Nearby | 
| -------------------------------------- | ------------------- |
| **Description** | The users can search for the available agencies near their location. |
| **Actors** | Users |
| **Assumptions** | Pre-conditions - The users enable location services, or enter the city in manually. The database contains location-tagged debt advice agencies. Post-condtions - The system provides the view of the map of Bristol and a list of the agencies starting with the ones closest to the user's selection. </td></tr>
| **Steps** | 1. The user visits the website. |
| | 2. The user enters their postcode/town or enables location access. 
| | 3. The system gets and shows a list of nearby debt advice agencies.
| | 4. The user selects one of the centre for more details. |
| **Variations** | The user searches by postal code instead. Search using keywords such as "free consultation". |
| **Non-functional** | The results of the search should load within 3 seconds and The search should support multilingual queries. |
| **Issues** | There can be issues with ensuring the location is accurate when GPS is unavailable and handling incomplete data in the database |

</td></tr>

| UC2 - *Wilhelmina* | Filter Debt Advice Agencies | 
| -------------------------------------- | ------------------- |
| **Description** | Users can filter centers by type of services offered (e.g., credit card debt, mortgage advice, etc). |
| **Actors** | Users |
| **Assumptions** | The agencies are tagged with their specializations and users have a clear idea of the kind of help they need. </td></tr>
| **Steps** | 1. The user searches for debt advice agencies. 
| | 2. They apply the filters based on service type (e.g., housing legal aid) |
| | 3. The system updates the results to display the changes applied. |
| | 4. The user selects to view the details of an agency through the filtered search. |
| **Variations** | Combining multiple filters (e.g., specialization + location) and sort out results by proximity or user ratings. |
| **Non-functional** | The filters should be user friendly and intuitive and the system should support multiple concurrent filters. |
| **Issues** | Managing cases in which no results match the criteria of the selected filters. |

</td></tr>

| UC3 - *Kieran* | View Debt Advice Agencies' Details | 
| -------------------------------------- | ------------------- |
| **Description** | The users can view detailed information about a debt advice agency (e.g., working hours, contact details). |
| **Actors** | Users, website operators |
| **Assumptions** | Users have internet access, and the agencies provide accurate and up-to-date information. </td></tr>
| **Steps** | 1. The user select one of the agencies from the table of contents. |
| | 2. The system shows the agencies' details such as address, availabilty, website link, etc. |
| | 3. The user contacts or visits the agencies' site based on their preferred details. |
| **Variations** | Print or save the agencies' details for offline use and viewing additional data such as user feedback and ratings. |
| **Non-functional** | Ensuring data loads within 3 seconds and providing a responsive design for both laptop and mobile devices. |
| **Issues** | Ensuring that the details are verified and accurate. |

</td></tr>

| UC4 - *Wilhelmina* | Bookmark Preferred Debt Agencies | 
| -------------------------------------- | ------------------- |
| **Description** | Users can add their preferred agencies to their 'favourites' by bookmarking them for future references. |
| **Actors** | Users |
| **Assumptions** | Users are logged in so that they have an account and bookmarked data is securely stored. </td></tr>
| **Steps** | 1. The user looks for the debt advice agencies. |
| | 2. They select their preferred agency and click "Bookmark". |
| | 3. The system updates the user's saved list with their bookmarked agency. |
| | 4. The user accesses this saved list when they return to their profile. |
| **Variations** | The users can categorize bookmarks (e.g., by specialization, etc) and they can share bookmarked agencies with others. |
| **Non-functional** | The bookmarks must be in sync across devices within 5 seconds, and offline access to saved bookmarks. |
| **Issues** | Handling large lists of bookmarks for users. |

</td></tr>

| UC5 - *Wilhelmina* | Update the Agencies' Information | 
| -------------------------------------- | ------------------- |
| **Description** | The website operators can update the details of the agencies on the site.|
| **Actors** | Website operators |
| **Assumptions** | The updates are reviewed and the operators have secure accounts. </td></tr>
| **Steps** | 1. The operators log into their account securely. |
| | 2. They navigate their way to the website's management page. |
| | 3. They update the desired fields (e.g., contact details, website link, etc). |
| | 4. The website operators submit the changes and the system updates. |
| **Variations** | The changes are auto-approved for the website operators as they are logged in. |
| **Non-functional** | The changes should be reflected on the website withing 1 minute after the operator clicks submits. |
| **Issues** | Verifying the authenticity of the operators making changes. |

</td></tr>

| UC6 - *Kieran* | Visit 'My Account' | 
| -------------------------------------- | ------------------- |
| **Description** | Users can check their account activity through the menu option 'My Account' |
| **Actors** | Users |
| **Assumptions** | Every user has an account |
| **Steps** | 1. User logs in or signs up to the website |
| | 2. User clicks on 'My Account'  |
| | 3. User can view all of their account details such as name, number, bookmarked/saved items, notes, settings, etc. |
| **Variations** | Potential investors may send an email showing interest in the website |
| **Non-functional** | Accessibility, navigation |
| **Issues** |   |


![Debt Agencies Website use-cases](images\UseCase.png)



## Software Requirements Specification
### Functional requirements
    FR1. Search Functionality (UC1) - The system shall enable users to search for debt advice agencies based on the city, postal code, or keywords. Results should be sorted by proximity, relevance, or user ratings
    FR2. Filtering (UC2) - The system shall allow users to filter results by specialization, services provided, and working hours. The filter should work in conjunction with search queries
    FR3. Viewing Details (UC3) - The system shall display detailed information for each agency, including contact details, directions, and work hours.
    FR4. Bookmarking (UC4) - The system shall enable users to bookmark debt advice agencies and access saved bookmarks in their profiles.
    FR5. Management of Agencies' Details (UC5) - The system shall allow the website operators to securely log in to update the details of these agencies. They must review and approve the changes before they are uploaded.
    FR6. Viewing Account Details (UC6) - The system shall allow the users to securely sign in/log in, update their details and display their details such as bookmarks, notes, etc.



### Non-Functional Requirements
    NFR1. Scalability (All use-cases) - The system shall be able to accomodate more agencies and users if neccessary
    NFR2. Security (UC4, UC5, U6) - The system shall authenticate the actions of the website operators. The user's data (including bookmarks) should be encryted and protected from unauthorized access.
    NFR3. Accessibility (UC1, UC2, UC3, UC6) - The system shall support multilingual content for diverse users and should be accessible in both laptop and mobile style.
    NFR4. Usability (UC1, UC2, UC3, UC5) - The system shall provide instintive navigation for all features (ie. bookmarking) and the UI should be optimized for laptop and mobile use.

