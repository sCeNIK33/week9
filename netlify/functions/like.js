// API url to this lambda funtion: /.netlify/functions/like
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()


  // 🔥🔥🔥 Code-Along 
  // Implement the like function
  // Step 2:  Parse out the like data, i.e. the event.body – pull out
  //          the user id and the post id that is provided
  //          in the POST request, and assign to variables. Use
  //          console.log if necessary, to ensure the values are what
  //          you're expecting.
  let post = JSON.parse(event.body)
  console.log(post)
  let postId = post.postId
  let userId = post.userId

  console.log(`the post is ${postId}`)
  console.log(`the user is ${userId}`)

  // Step 3:  Check in the firestore collection to see if the user has
  //          already liked the post before adding a new like.
  let querySnapshot = await db.collection(`likes`)
                    .where(`postId`, `==`, postId)
                    .where(`userId`, `==`, userId)
  let numberOfLikes = querySnapshot.size
  console.log(`number of likes: ${numberOfLikes}`)
  // Step 4:  If there's no likes with the given post id and user id,
  //          add the like to Firestore using the .add() function.

  if(numberOfLikes ==0) {
    await db.collection(`likes`).add({
      postId: postId,
      userId: userId
    })

    return {
      statusCode: 200,
      body: JSON.stringify({success:true})
    }
  }else {
    return{
      statusCode: 403,
      body: JSON.stringify({success:false, error: `user already liked post`})
    }
    
  }
  
  // Step 5:  Modify the return so that the body is different based on
  //          whether a new like was added or not. Any distinction is ok
  //          so long as the frontend will be able to identify which occurred.
  //          (optional) Use a relevant status code.

  
}
//could add conditions to fetch likes reala time when button clicked or use other tools to fetch current like number
