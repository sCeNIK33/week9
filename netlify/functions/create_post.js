// API url to this lambda funtion: /.netlify/functions/create_post
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()

  // 🔥🔥🔥 Lab
  // Step 2:  Parse out the post data, i.e. the event.body – pull out
  //          the user ID, username, and image URL that is provided
  //          in the POST request, and assign to variables. Use
  //          console.log if necessary, to ensure the values are what
  //          you're expecting.
  console.log(event.body)
  
  let post = JSON.parse(event.body)
  console.log(post)
  let userId = post.userId
  let username = post.username
  let imageUrl = post.imageUrl

  console.log(`the image is ${postImageUrl}`)
  console.log(`the userId is ${userId}`)
  console.log(`the username is ${postUsername}`)

  // Step 3:  Construct an object of data which you will send to Firestore
  //          in step 4 – this object should include the user ID, username,
  //          image URL, and a "created" timestamp – use the built-in
  //          function for this:
  //          firebase.firestore.FieldValue.serverTimestamp()
  let newPost = {
    userId: userId,
    username: username,
    imageUrl: imageUrl,
    created: firebase.firestore.FieldValue.serverTimestamp()
  }
  // Step 4:  Add the post to Firestore using the .add() function.

  let docref = await db.collection(`posts`).add(newPost)
  
  // Step 5:  Assign the newly created post's auto-generated ID as an
  //          id attribute of the object you created in step 3 - to assign
  //          an attribute use: object.attribute = value
  //          Also add a likes attribute to the object with a value of 0
  //          (since a new post has 0 likes to start) - return the entire
  //          object as the body in the return value, using JSON.stringify()
  newPost.id = docref.id
  newPost.likes = 0
  


  return {
    statusCode: 200,
    body: JSON.stringify(newpost)
  }

}