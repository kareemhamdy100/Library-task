# Library Management System

Objective: Design and implement a simple library management system to manage books and
borrowers.

## how to setup and run the project:
first you need to install  node.js , docker , docker-compose
clone the project from git ,

run the following commands 

        npm install
then:

            npm run start 

 then on other terminal after docker for postgres database up and running To create Database:
 
         node scripts/createDataBase

then on docker terminal:
                    
        npm run start:prod

**if you need to run project outside docker** 

please change database host to be localhost from config/config.js 
        
 ----       
**it's better to use swagger for document api but due to time limit I couldn't implement it**
-----
## Using Node.js , Express, Sequlize , and Postgres could implement the following : 
### BookModel : 
    id (PK),
    title, 
    author,
    isbn (unique),
    availableQuantity,
    shelfLocation,
    fullTextSearch (tsvector to support full text search)
  
 ### BorrowerModel (UserModel):
        id (PK),
        email (unique),
        name 

  ### BorrowBookModel :
      id (PK),
      userId (FK),
      bookId (FK),
      borrowedAt
      shouldReturnBookAt,
      returnedAt,
      status
---
each model has it's routes, controller and service :
- controller to handle Http stuff, 
- service to handle logical and database operations 

let's go with end points in each model :

### Bookmodel :
#### POST   /api/books/  
 ##### body:
           {
            "title": "Harry Botter",
            "author": "Kareem",
            "availableQuantity": 15,
            "isbn": "abc",
            "shelfLocation": "A1"
            }

            all fileds required

   ###### response : Book Object
              {
                "data": {
                    "id": 3,
                    "title": "Harry Botter",
                    "author": "Kareem",
                    "availableQuantity": 15,
                    "isbn": "abcd",
                    "shelfLocation": "A1",
                    "updatedAt": "2024-01-07T23:55:29.398Z",
                    "createdAt": "2024-01-07T23:55:29.398Z"
                }
            }
 ---           
#### GET   /api/books/:BookId
      response: return Book Object
---         
#### GET   /api/books/     (Search opeartion)
  ##### queryParams : 
          {
              isbn,author,title,fullTextSearch : string (should use one of them if use more than one it will using &&(and) operation)
              page,limit : Integer      
          }

##### response:
    {
      "data": [
          {
              "id": 2,
              "title": "Harry Botter",
              "author": "Kareem",
              "availableQuantity": 15,
              "isbn": "abc",
              "shelfLocation": "A1",
              "createdAt": "2024-01-07T21:05:35.227Z",
              "updatedAt": "2024-01-07T21:45:23.296Z"
          }
      ],
      "hasNextPage": false,
      "page": 1,
      "limit": 10,
      "count": 1  //<dataLength> 
    }
---
#### PUT  /api/books/:bookId
  ##### body: 
           {
            "title": "Harry Botter",
            "author": "Kareem",
            "availableQuantity": 15,
            "isbn": "abc",
            "shelfLocation": "A1"
            }
            all fileds not required only update the fileds that in body
   ###### response : return Book Object the one is updated
   ---
#### Delete /api/books/:bookId
###### Response : empty with http status (okay 200)
---
### BorrowerModel (UserModel):
  ####  POST api/borrowers/
  ##### body:
           {
            "name" : "kareem",
            "email" : "kareem@email.com"
            }
            all fileds are required

  ##### response  : (Borrower Object)
        {
        "data": {
                  "isAdmin": false,
                  "id": 2,
                  "name": "kareem",
                  "email": "kareem@email.com",
                  "updatedAt": "2024-01-08T00:18:29.778Z",
                  "createdAt": "2024-01-08T00:18:29.778Z"
              }
          }

 ---
 ####  GET api/borrowers/:borrowerId 
  ##### response  : (Borrower Object)
---
 ####  GET api/borrowers/ 
   ##### queryParams :  
           {
              name , email : string (should use one of them if use more than one it will using &&(and) operation)
              page,limit : Integer      
          }
  ##### response  : 
  List Of(Borrower Object)
  and other listing fileds like in book Listing

---
 ##### PUT and DELETE Same as Book Model
---
### BorrowBookModel

  ##### POST api/borrowBook/by/:borrowId/borrowBook/:bookId
  ##### body : {} not accept body
  ##### response : (BorrowBook Object)
          {
            "data": {
                "id": 7,
                "userId": 2,
                "bookId": 2,
                "borrowedAt": "2024-01-08T00:27:46.797Z",
                "shouldReturnBookAt": "2024-01-22T00:27:46.797Z",
                "status": "BORROWED",
                "updatedAt": "2024-01-08T00:27:46.798Z",
                "createdAt": "2024-01-08T00:27:46.798Z",
                "returnedAt": null
            }
      }

  ---          
  ##### POST api/borrowBook/by/:borrowId/backBook/:bookId
  ##### body : {} not accept body
  ##### response : (BorrowBook Object)
              {
            "data": {
                "id": 8,
                "userId": 2,
                "bookId": 2,
                "borrowedAt": "2024-01-08T00:33:02.327Z",
                "shouldReturnBookAt": "2024-01-22T00:33:02.327Z",
                "returnedAt": "2024-01-08T00:33:08.611Z",
                "status": "RETURNED",
                "createdAt": "2024-01-08T00:33:02.329Z",
                "updatedAt": "2024-01-08T00:33:08.611Z"
            }
        }
---
##### GET api/borrowBook/listing  (for all users)
    ##### queryParams : 
          {
          isOverdue: boolean.default(false),
          status: Enum('BORROWED', 'RETURNED', 'ALL').default('ALL'),          
          page,limit : Integer      
          }
  ###### response :
                  {
                      "data": [
                                  {
                                      "id": 7,
                                      "userId": 2,
                                      "bookId": 2,
                                      "borrowedAt": "2024-01-08T00:27:46.797Z",
                                      "shouldReturnBookAt": "2024-01-22T00:27:46.797Z",
                                      "returnedAt": "2024-01-08T00:31:20.669Z",
                                      "status": "RETURNED",
                                      "createdAt": "2024-01-08T00:27:46.798Z",
                                      "updatedAt": "2024-01-08T00:31:20.670Z",
                                      "book": {
                                          "id": 2,
                                          "title": "Harry Botter",
                                          "author": "Kareem",
                                          "availableQuantity": 15,
                                          "isbn": "abc",
                                          "shelfLocation": "A1",
                                          "createdAt": "2024-01-07T21:05:35.227Z",
                                          "updatedAt": "2024-01-08T00:33:08.659Z"
                                      }
                                  }
                              ],
                              "hasNextPage": false,
                              "page": 1,
                              "limit": 10,
                              "count": 1
                }
##### GET api/borrowBook/listing/by/:borrowerId  (for one user)
  ##### queryParams : 
          {
          status: Enum('BORROWED', 'RETURNED', 'ALL').default('ALL'),          
          page,limit : Integer      
          }
  ###### response : same response shape as above    

---






    
