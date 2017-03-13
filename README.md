# uitReactProjectApi

**Instructions**

1. Download the code and run npm install
2. Run 'node server.js'
3. The following routes are available to you:
  - GET /categories - get all reference categories
  - POST /categories - add a new category
  - GET /categories/<categoryID> - get the information for the specific category
  - PUT /categories/<categoryID> - update a category
  - DELETE /categories/<categoryID> - delete a category
  - GET /references/<categoryID> - get the references for the supplied category
  - POST /references/<categoryID> - add a reference to the category
  - GET /references/ref/<referenceID> - get the information for the specific reference
  - PUT /references/ref/<referenceID> - update a reference
  - DELETE /references/ref/<referenceID> - delete a reference
  - POST /references/addNote/<referenceID> - add a note to a reference

  **Pro Tips**

  - Get this API up and running before you begin coding your React project! You don't want to fight this battle on 2 fronts by having to debug both your API and your React Project.
  - Create a set of test data with Insomnia before beginning your project. It's always a good idea to have something to work with first!