const dummy = (blogs) => { 
  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  const array = blogs.map(blog => blog.likes)
  return array.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {

  const response = blogs.reduce((fav, blog) => (fav.likes > blog.likes ?  fav : blog))
  
  return {
    title: response.title,
    author: response.author,
    likes: response.likes
  }
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}