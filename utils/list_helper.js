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
  const array = blogs.map(blog => blog.likes)
  const max = Math.max(...array)
  const index = array.indexOf(max)
  const response = blogs[index]
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